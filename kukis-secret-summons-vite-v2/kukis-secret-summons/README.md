# Kuki's Secret Summons

A static React + TypeScript + Vite birthday gift. No backend, database or API key. Sound is generated with the Web Audio API (no audio files), and starts only when the visitor taps "Sound".

## Run locally
```
cd kukis-secret-summons
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
npm run preview    # test the production build
```
`npm install` creates `package-lock.json` (commit it).

## Deploy to Netlify
- Git: push to GitHub, "Add new site" > "Import an existing project". `netlify.toml` already sets build `npm run build`, publish `dist`.
- Or: run `npm run build`, then drag the `dist` folder onto https://app.netlify.com/drop

## Customize
- Letters, memories, library jokes, hidden joke, final message: `src/content.ts`
- Memory photos: put files in `public/photos/`, then add `img:"/photos/name.jpg"` to a memory in `src/content.ts`
- Scene markup and map positions: `src/markup.html`, `src/magic.ts`; colours/layout: `src/index.css`
- Sound volume: `.05` in `src/magic.ts` (`setTargetAtTime`)
- Fonts load from Google Fonts with Georgia fallback.

## Your photos, song and video (folder-based)
Put files in these three folders at the project root (names are case-sensitive on Netlify: `Photos`, `Music`, `Videos`):

| File | Where it appears |
|---|---|
| `Photos/photo1.png` (or .jpg/.jpeg/.webp) | "A Shadow Worth Keeping" + the friendship promise |
| `Photos/photo2.png` | The Spider-Man Pact section |
| `Photos/photo3.png` | The secret (inkwell) section only |
| `Music/favorite-song.mp3` | Music player (.mp3, .m4a, .wav, .ogg, .aac; if the name differs, the first file in the folder is used) |
| `Videos/spiderman-handshake.mp4` | Video player (.mp4 H.264/AAC plays everywhere; .webm on most browsers; .mov mainly Safari) |

Run `npm run dev` (restart it if a file you just added doesn't show). Files are found at build time with Vite's `import.meta.glob`, so they also work after `npm run build` and on Netlify. A missing file shows a gentle placeholder instead of breaking. Nothing autoplays. Keep the video under about 50 MB.

Song/video titles and the shadow, promise and secret captions are in `src/content.ts` (the `N` object).

## The secret
In the Restricted Section, tap the old inkwell beside the bookshelf twice. The Little Keeper hints at it. Photo 3 is not loaded or shown before that. This is a playful surprise, not security: the file is still inside the built site (`dist/assets`), so anyone inspecting the files could find it.
