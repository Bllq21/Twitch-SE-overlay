# Overlay de contador para Twitch (StreamElements)

[English](README.md) · **Español**

Widget personalizado de [StreamElements](https://streamelements.com/) para Twitch,
creado originalmente para un stream de Stardew Valley. Cuando un espectador activa
el comando del contador configurado, el overlay muestra una imagen aleatoria, un
mensaje breve, un sonido y el total actual.

## Características

- Escucha eventos `bot:counter` de StreamElements.
- Muestra una imagen aleatoria entre nueve slots configurables.
- Mensaje, fuente, color de texto y volumen del sonido configurables.
- Se oculta automáticamente a los 5 segundos.
- Lee el valor actual del contador al cargar el widget.

## Estructura del proyecto

| Archivo | Pestaña del editor de StreamElements |
| --- | --- |
| `index.html` | HTML |
| `styles.css` | CSS |
| `main.js` | JS |
| `fields.js` | Fields |
| `data.js` | Data |

## Configuración

1. En StreamElements, abrí **Overlays → My Overlays** y creá un overlay.
2. Agregá un **Custom Widget** y abrí su editor.
3. Pegá cada archivo en la pestaña correspondiente.
4. En la configuración del widget, definí:
   - **Counter Name** — el contador de StreamElements a escuchar (por ejemplo `Koroks`).
   - **Alert message** — el texto que se muestra al activarse el contador.
   - **Alert sound** y **Alert sound volume**.
   - La animación, el banner y los slots de imágenes.
5. Creá el contador y el comando de chat en StreamElements
   (el ejemplo usa `Koroks` y `!korokfound`).
6. Guardá el overlay y probá el comando en el chat.

El `data.js` de ejemplo trae las URLs de imágenes y audio vacías a propósito.
Agregá tus propios assets desde la configuración del widget o reemplazá los
strings vacíos.

## Cómo funciona

`main.js` registra dos listeners:

- `onWidgetLoad` lee el valor guardado del contador y aplica el mensaje, el
  volumen y los estilos configurados.
- `onEventReceived` filtra eventos `bot:counter` cuyo contador coincide con el
  nombre configurado, actualiza el valor local y llama a `showOverlay()`.

El widget usa el helper `SE_API.counters.get()` de StreamElements y los
placeholders `{{img}}`, que StreamElements reemplaza en tiempo de ejecución.

## Licencia

MIT — ver [LICENSE](LICENSE).
