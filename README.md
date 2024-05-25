
# VoiceFlashcards

VoiceFlashcards es una aplicación web que permite cargar una hoja de cálculo con frases, mostrar estas frases una a una en una tarjeta y permitir a los usuarios repetir las frases utilizando reconocimiento de voz. La aplicación proporciona retroalimentación visual y sonora sobre la precisión del usuario, además de mostrar estadísticas y un cronómetro.

## Funcionalidades

- **Carga de Hojas de Cálculo**: Carga una hoja de cálculo (.xlsx, .xls, .csv) y muestra las frases de la segunda columna en tarjetas.
- **Reconocimiento de Voz**: Usa la API de reconocimiento de voz de Google Chrome para permitir a los usuarios repetir las frases.
- **Retroalimentación Visual y Sonora**: Proporciona retroalimentación visual (bordes de colores) y sonora (sonidos) para indicar frases correctas e incorrectas.
- **Barra de Progreso**: Muestra el progreso del usuario a través de las frases.
- **Cronómetro**: Inicia un cronómetro cuando se activa el micrófono y lo detiene al completar todas las frases.
- **Estadísticas**: Muestra el número de frases correctas y errores cometidos.

## Requisitos

- Google Chrome (para el reconocimiento de voz)
- Hoja de cálculo con frases en la segunda columna

## Uso

1. **Carga de Hojas de Cálculo**: Haz clic en el botón "Cargar Hoja de Cálculo" y selecciona tu archivo .xlsx, .xls, o .csv.
2. **Activar Reconocimiento de Voz**: Haz clic en el botón de micrófono 🎤 para activar el reconocimiento de voz.
3. **Repetir Frases**: Repite las frases que aparecen en las tarjetas. La aplicación proporcionará retroalimentación visual y sonora.
4. **Ver Progreso y Estadísticas**: Observa la barra de progreso, el cronómetro y las estadísticas para seguir tu desempeño.

## Instalación

1. **Clona el repositorio**:
   ```sh
   git clone https://github.com/tu-usuario/VoiceFlashcards.git
   ```
2. **Navega al directorio del proyecto**:
   ```sh
   cd VoiceFlashcards
   ```
3. **Abre el archivo `index.html` en Google Chrome**.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva-funcionalidad`).
3. Realiza tus cambios y haz commit de los mismos (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube los cambios a tu rama (`git push origin feature-nueva-funcionalidad`).
5. Crea un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para obtener más detalles.
```

Asegúrate de ajustar el enlace de clonación de GitHub y cualquier otra información específica según sea necesario.