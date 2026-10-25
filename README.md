# fredriketsare.se

Det här är koden till min hemsida: [fredriketsare.se](https://fredriketsare.se)

Sidan är byggd med [Astro](https://astro.build/).
Om du är ny till Astro är docs här: [https://docs.astro.build](https://docs.astro.build)

## Skapa en egen kopia

Vill du köra samma setup själv:

1. Klona repot
2. Installera dependencies
3. Starta lokalt
4. Byt innehåll, länkar och bilder till ditt eget

```bash
git clone https://github.com/fetsare/fredriketsare.se.git
cd fredriketsare.se
npm install
npm run dev
```

Bygg för produktion:

```bash
npm run build
```

## Drönarvideo på startsidan

Startsidan visar en video högst upp om det finns filer i `src/assets/videos/`.
Koda om råfilmen med ffmpeg:

```bash
scripts/encode-video.sh ~/Movies/min-dronarfilm.mov
```

Det skapar `drone.mp4`, `drone.webm` och `drone.jpg` (poster). Håll varje fil under ~20 MB
(Cloudflare tillåter max 25 MB per fil). Finns inga filer visas ingen video.

## Hosting-alternativ

Du kan hosta sidan på flera ställen, t.ex:

- [Cloudflare Pages](https://pages.cloudflare.com/)
- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [Render](https://render.com/)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

Det här är bara en enkel bas. Klona, tweak:a och gör den till din.
