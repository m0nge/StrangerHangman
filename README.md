# 🎮 Strange Hangman

Un juego de ahorcado temático inspirado en **Stranger Things**, desarrollado con JavaScript vanilla, HTML5 y CSS3. Sumérgete en el Upside Down mientras adivinas palabras del universo de la serie.

## 🌟 Características

- 🎨 **Estética Retro-Ochentas**: Diseño inspirado en la nostalgia visual de Stranger Things
- 🎯 **Palabras Temáticas**: Vocabulario extraído directamente del universo de la serie
- 💀 **Sistema de Vidas**: Limita tus intentos fallidos antes de perder
- ✨ **Animaciones Fluidas**: Efectos visuales suaves y transiciones dinámicas
- 📱 **Diseño Responsive**: Juega desde cualquier dispositivo
- 🔤 **Teclado Virtual**: Interfaz intuitiva para seleccionar letras
- 🎵 **Ambiente Inmersivo**: Colores y tipografías que evocan la serie

## 🚀 Demo en Vivo

[**Jugar Ahora**](https://m0nge.github.io/StrangerHangman/)

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica del juego
- **CSS3**: Estilos personalizados con animaciones y efectos visuales
- **JavaScript (Vanilla)**: Lógica del juego sin frameworks externos
- **Font Awesome**: Iconografía adicional
- **Google Fonts**: Tipografías temáticas

## 📦 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/m0nge/StrangerHangman.git

# Navegar al directorio
cd StrangerHangman

# Abrir el archivo index.html en tu navegador
# O usar Live Server en VSCode
```

## 🎮 Cómo Jugar

1. **Inicia el juego**: La palabra oculta aparece como guiones bajos
2. **Selecciona letras**: Haz clic en las letras del teclado virtual
3. **Adivina la palabra**: Las letras correctas se revelan en su posición
4. **Evita errores**: Cada letra incorrecta reduce tus vidas
5. **Gana o pierde**: Completa la palabra antes de quedarte sin vidas

### Reglas del Juego

- ❤️ Tienes un número limitado de vidas (intentos fallidos)
- ✅ Las letras correctas se muestran en la palabra
- ❌ Las letras incorrectas reducen tus vidas
- 🏆 Ganas al completar toda la palabra
- 💀 Pierdes si tus vidas llegan a cero

## 📁 Estructura del Proyecto

```
StrangerHangman/
│
├── index.html          # Estructura principal del juego
├── css/
│   └── styles.css      # Estilos y animaciones
├── js/
│   └── game.js         # Lógica del juego
├── assets/
│   ├── images/         # Imágenes y gráficos
│   └── fonts/          # Tipografías personalizadas
└── README.md           # Este archivo
```

## 🎨 Palabras Temáticas

El juego incluye palabras relacionadas con:
- Personajes de la serie
- Ubicaciones del Upside Down
- Criaturas y monstruos
- Objetos icónicos
- Conceptos de la trama

## 🔧 Personalización

Puedes personalizar el juego modificando:

```javascript
// Agregar tus propias palabras en game.js
const palabras = [
    'ELEVEN',
    'DEMOGORGON',
    'HAWKINS',
    // Agrega más palabras aquí
];

// Ajustar el número de vidas
const vidasIniciales = 6;
```

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si quieres mejorar el juego:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📝 Roadmap

- [ ] Agregar efectos de sonido temáticos
- [ ] Implementar múltiples niveles de dificultad
- [ ] Sistema de puntajes y tabla de líderes
- [ ] Modo multijugador
- [ ] Más categorías de palabras
- [ ] Animaciones de victoria/derrota mejoradas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👩‍💻 Autora

**Daniela Monge**

- GitHub: [@m0nge](https://github.com/m0nge)
- LinkedIn: [Daniela Monge](https://www.linkedin.com/in/daniela-monge)
- Portfolio: [Ver más proyectos](https://m0nge.github.io)

## 🙏 Agradecimientos

- Inspirado en la serie **Stranger Things** de Netflix
- Comunidad de desarrolladores JavaScript
- Todos los que probaron y dieron feedback

---

⭐ Si te gustó el proyecto, no olvides darle una estrella en GitHub!

**¿Listo para enfrentar al Demogorgon? ¡Juega ahora!** 🎮👾
