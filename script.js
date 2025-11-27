(() => {
  const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  const words = [];

  const ui = {
    attempts: document.getElementById('attempts-left'),
    word: document.getElementById('word'),
    keyboard: document.getElementById('keyboard'),
    btnNew: document.getElementById('btn-new'),
    parts: [
      document.getElementById('hm-head'),
      document.getElementById('hm-body'),
      document.getElementById('hm-arm-l'),
      document.getElementById('hm-arm-r'),
      document.getElementById('hm-leg-l'),
      document.getElementById('hm-leg-r'),
    ],
    bulbs: Array.from(document.querySelectorAll('#lights li')),
    modal: document.getElementById('modal'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
    btnRestart: document.getElementById('btn-restart'),
    setupModal: document.getElementById('setup-modal'),
    secretInput: document.getElementById('secret-input'),
    hideToggle: document.getElementById('hide-toggle'),
    btnStart: document.getElementById('btn-start'),
  };

  const state = {
    wordOriginal: '',
    wordNorm: '',
    revealed: new Set(),
    used: new Set(),
    mistakes: 0,
    maxMistakes: 6,
    over: false,
  };

  const audio = {
    ctx: null,
    init(){ try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(_){} },
    beep(freq=440, dur=120, type='square', vol=0.03){
      if (!this.ctx) return;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.value = vol;
      o.connect(g); g.connect(this.ctx.destination);
      o.start();
      setTimeout(() => { o.stop(); }, dur);
    },
    success(){ this.beep(620, 110, 'triangle', 0.05); },
    error(){ this.beep(220, 160, 'sawtooth', 0.05); },
    endWin(){ this.beep(740, 200, 'triangle', 0.06); setTimeout(()=>this.beep(880, 200,'triangle',0.06), 220); },
    sequence(seq){
      let t = 0;
      seq.forEach(s => { setTimeout(() => this.beep(s.f, s.d, s.type || 'triangle', s.v || 0.05), t); t += s.d + (s.gap || 40); });
    },
    endLose(){
      const motif = [
        { f: 196, d: 260, type:'sine', v:0.06 },
        { f: 233, d: 220, type:'sine', v:0.06 },
        { f: 261, d: 220, type:'sine', v:0.06 },
        { f: 220, d: 300, type:'sawtooth', v:0.05 },
        { f: 174, d: 340, type:'sine', v:0.06 },
      ];
      this.sequence(motif);
    },
  };

  function normalize(s){
    return s
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g,'');
  }

  function setSecret(text){
    const t = String(text || '').trim();
    if (!t) return false;
    state.wordOriginal = t.toUpperCase();
    state.wordNorm = normalize(t);
    return true;
  }

  function buildKeyboard(){
    ui.keyboard.innerHTML = '';
    letters.forEach(l => {
      const b = document.createElement('button');
      b.className = 'key';
      b.textContent = l;
      b.type = 'button';
      b.addEventListener('click', () => guess(l));
      ui.keyboard.appendChild(b);
    });
  }

  function renderWord(){
    ui.word.innerHTML = '';
    for (let i = 0; i < state.wordOriginal.length; i++){
      const ch = state.wordOriginal[i];
      const norm = state.wordNorm[i];
      const slot = document.createElement('div');
      if (/[^A-ZÑ]/.test(norm)){
        slot.className = 'slot space';
        slot.textContent = ch;
      } else {
        slot.className = 'slot';
        slot.textContent = state.revealed.has(i) ? ch : '';
      }
      ui.word.appendChild(slot);
    }
  }

  function updateAttempts(){
    ui.attempts.textContent = `${state.maxMistakes - state.mistakes}`;
  }

  function updateHangman(){
    ui.parts.forEach((el, idx) => {
      el.classList.toggle('hidden', state.mistakes <= idx ? true : false);
    });
  }

  function updateLights(){
    const offCount = Math.min(state.mistakes, ui.bulbs.length);
    ui.bulbs.forEach((b, idx) => b.classList.toggle('off', idx < offCount));
  }

  function endGame(win){
    state.over = true;
    const title = win ? '¡Ganaste!' : '¡Has perdido!';
    const body = win
      ? 'Venciste al Demogorgon. Hawkins está a salvo... por ahora.'
      : `Vecna te atrapó. La palabra era: ${state.wordOriginal}`;
    ui.modalTitle.textContent = title;
    ui.modalBody.textContent = body;
    ui.modal.classList.remove('hidden');
    if (win) audio.endWin(); else audio.endLose();
  }

  function guess(input){
    if (state.over) return;
    const letter = normalize(input).replace(/[^A-ZÑ]/g,'');
    if (!letter) return;
    if (state.used.has(letter)) return;
    state.used.add(letter);
    disableKey(letter);

    let hit = false;
    for (let i = 0; i < state.wordNorm.length; i++){
      const norm = state.wordNorm[i];
      if (norm === letter){
        state.revealed.add(i);
        hit = true;
      }
    }

    if (!hit){
      state.mistakes++;
      updateHangman();
      updateLights();
      updateAttempts();
      audio.error();
      if (state.mistakes >= state.maxMistakes) endGame(false);
    } else {
      renderWord();
      audio.success();
      if (isWin()) endGame(true);
    }
  }

  function isWin(){
    for (let i = 0; i < state.wordNorm.length; i++){
      const norm = state.wordNorm[i];
      if (/^[A-ZÑ]$/.test(norm) && !state.revealed.has(i)) return false;
    }
    return true;
  }

  function disableKey(letter){
    const btns = ui.keyboard.querySelectorAll('.key');
    btns.forEach(b => {
      if (b.textContent === letter) b.setAttribute('disabled','true');
    });
  }

  function reset(keysEnabled = true){
    state.revealed.clear();
    state.used.clear();
    state.mistakes = 0;
    state.over = false;
    ui.parts.forEach(p => p.classList.add('hidden'));
    ui.bulbs.forEach(b => b.classList.remove('off'));
    updateAttempts();
    if (keysEnabled){
      ui.keyboard.querySelectorAll('.key').forEach(b => b.removeAttribute('disabled'));
    }
  }

  function newGame(){
    reset();
    renderWord();
  }

  function closeModal(){
    ui.modal.classList.add('hidden');
  }

  function openSetup(){
    ui.secretInput.value = '';
    ui.hideToggle.checked = true;
    ui.secretInput.type = 'password';
    ui.setupModal.classList.remove('hidden');
    setTimeout(() => ui.secretInput.focus(), 30);
    ui.keyboard.querySelectorAll('.key').forEach(b => b.setAttribute('disabled','true'));
  }

  function closeSetup(){
    ui.setupModal.classList.add('hidden');
  }

  ui.hideToggle.addEventListener('change', () => {
    ui.secretInput.type = ui.hideToggle.checked ? 'password' : 'text';
  });

  function startFromInput(){
    const ok = setSecret(ui.secretInput.value);
    ui.secretInput.classList.toggle('invalid', !ok);
    if (ok){
      closeSetup();
      newGame();
    }
  }

  ui.btnStart.addEventListener('click', startFromInput);
  ui.secretInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.stopPropagation(); startFromInput(); }
  });
  ui.setupModal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.stopPropagation(); startFromInput(); }
  });

  ui.btnNew.addEventListener('click', () => { closeModal(); openSetup(); });
  ui.btnRestart.addEventListener('click', () => { closeModal(); openSetup(); });

  buildKeyboard();
  openSetup();
  audio.init();

  function anyModalOpen(){
    return !ui.setupModal.classList.contains('hidden') || !ui.modal.classList.contains('hidden');
  }

  window.addEventListener('keydown', (e) => {
    if (anyModalOpen()) return;
    const key = e.key.toUpperCase();
    if (key.length === 1){
      const norm = normalize(key);
      if (/^[A-ZÑ]$/.test(norm)){
        guess(norm);
      }
    }
  });

  // removed duplicate global keydown listener to prevent input while modal is open
})();
