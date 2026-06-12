# Twitch StreamElements Counter Overlay

**English** · [Español](README.es.md)

A custom [StreamElements](https://streamelements.com/) overlay widget for Twitch,
originally built for a Stardew Valley stream. When a viewer triggers the
configured counter command, the overlay shows a random image, a short alert
message, a sound, and the current counter total.

## Features

- Listens for StreamElements `bot:counter` events.
- Shows a random image from nine configurable slots.
- Configurable alert message, font, text color, and sound volume.
- Auto-hides after 5 seconds.
- Reads the current counter value when the widget loads.

## Project structure

| File | StreamElements editor tab |
| --- | --- |
| `index.html` | HTML |
| `styles.css` | CSS |
| `main.js` | JS |
| `fields.js` | Fields |
| `data.js` | Data |

## Setup

1. In StreamElements, open **Overlays → My Overlays** and create a new overlay.
2. Add a **Custom Widget** and open its editor.
3. Paste each file into the matching editor tab.
4. In the widget settings, set:
   - **Counter Name** — the StreamElements counter to listen to (for example `Koroks`).
   - **Alert message** — the text shown when the counter fires.
   - **Alert sound** and **Alert sound volume**.
   - The animation, banner, and image slots.
5. Create the matching bot counter and chat command in StreamElements
   (the sample data uses `Koroks` and `!korokfound`).
6. Save the overlay and test the command in chat.

The sample `data.js` intentionally ships with empty image and audio URLs.
Add your own assets through the widget settings or replace the empty strings.

## How it works

`main.js` registers two listeners:

- `onWidgetLoad` reads the saved counter value and applies the configured
  message, volume, and text styles.
- `onEventReceived` filters for `bot:counter` events whose counter matches the
  configured name, updates the local value, and calls `showOverlay()`.

The widget uses the StreamElements `SE_API.counters.get()` helper and the
`{{img}}`-style field placeholders, which StreamElements replaces at runtime.

## Troubleshooting

- **The widget stays hidden:** confirm the counter name matches the
  StreamElements counter exactly, including case.
- **Images do not appear:** set image URLs in the widget fields; the sample
  `data.js` ships with empty URLs.
- **There is no sound:** browsers block audio until the overlay is interacted
  with. Enable audio in the overlay editor and refresh the browser source.

## License

MIT — see [LICENSE](LICENSE).
