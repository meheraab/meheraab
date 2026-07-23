# Meherab Hossain — Academic Portfolio

A fast, responsive, single-page portfolio for a political science researcher.
Built with plain HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies.

**Theme:** "Cartographic" — midnight-indigo ground with an animated meridian grid and an amber route-light accent, chosen to echo the subject matter (borders, routes, and power drawn on maps).

---

## Quick start

### 1. Create the repository

For a site at `https://<username>.github.io`:

```bash
# name the repo exactly: <your-username>.github.io
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

For a project site at `https://<username>.github.io/portfolio`, name the repo `portfolio` instead.

### 2. Turn on GitHub Pages

Repository → **Settings** → **Pages** → under *Build and deployment*,
set **Source** to `Deploy from a branch`, **Branch** to `main` and folder to `/ (root)` → **Save**.

Your site is live in about a minute.

### 3. Add your photo

Replace `assets/img/profile.jpg` with your own portrait.

- **Recommended:** portrait orientation, around 660 × 825 px (4:5 ratio)
- Keep it under ~300 KB so the page stays fast
- Keep the filename `profile.jpg`, or update the `src` in `index.html` (search for `profilePhoto`)

If the file is missing, the frame shows a labelled placeholder instead of breaking.

### 4. Add your CV

Drop your PDF at `assets/Meherab_Hossain_CV.pdf`. The "Download CV" button in the hero already points there.

```bash
mkdir -p assets
cp /path/to/your-cv.pdf assets/Meherab_Hossain_CV.pdf
```

---

## File structure

```
.
├── index.html              # All page content
├── README.md
├── robots.txt
├── .nojekyll               # Tells GitHub Pages to serve files as-is
└── assets/
    ├── Meherab_Hossain_CV.pdf   ← add this
    ├── css/style.css       # All styling (tokens at the top)
    ├── js/main.js          # Theme, nav, filters, counters, bars, reveal
    └── img/
        ├── profile.jpg     ← replace with your photo
        └── favicon.svg
```

---

## Customising

### Colours

Everything is a CSS custom property at the top of `assets/css/style.css`:

```css
:root{
  --bg:#0b1220;      /* page background      */
  --fg:#e8edf6;      /* main text            */
  --amber:#e8a33d;   /* primary accent       */
  --teal:#4fd1c5;    /* secondary accent     */
}
```

Light-mode overrides live in the `:root[data-theme="light"]` block just below.

### Adding a publication

Copy any `<article class="pub">` block in `index.html` and edit it. The `data-type`
attribute controls which filter tab it appears under:

`journal` · `chapter` · `review` · `conference` · `oped`

```html
<article class="pub rv" data-type="journal">
  <div class="yr">2026</div>
  <div>
    <h3>Your article title</h3>
    <p class="authors"><b>Hossain, M.</b> · <i>Journal Name</i></p>
    <div class="badges">
      <span class="badge q1">Scopus Q1</span>
      <span class="badge">Journal article</span>
    </div>
  </div>
  <div class="go"><a href="https://doi.org/..." target="_blank" rel="noopener">DOI →</a></div>
</article>
```

Badge variants: `q1` (amber), `q2` (teal), `rev` (dashed, for "under review"), or no class for neutral.

### Adding a timeline entry

```html
<div class="tl-item">
  <p class="when">Month Year — Month Year</p>
  <h3>Role title</h3>
  <p class="org">Organisation · Location</p>
  <ul><li>What you did</li></ul>
</div>
```

### Changing the skill bars

Set `data-level` to a number from 0–100. The bar animates to that width when scrolled into view.

```html
<div class="skill">
  <div class="skill-top"><span class="nm">Skill name</span><span class="pc">85%</span></div>
  <div class="track"><div class="fill" data-level="85"></div></div>
</div>
```

Add `class="fill teal"` for the teal gradient instead of amber.

### Changing the rotating hero text

Edit the `data-phrases` attribute on `#typed` in `index.html` — it's a JSON array of strings.

### Statistics counters

```html
<span data-count="10" data-suffix="+">0</span>
```

---

## Features

- Dark and light themes with the choice saved to `localStorage`
- Animated map background: meridian arcs, flowing route dashes, pulsing nodes
- Typewriter effect on the hero research focus
- Scroll progress bar and active-section highlighting in the nav
- Count-up statistics and animated skill bars, triggered on scroll
- Filterable publication list with a live result count
- Reveal-on-scroll animations via `IntersectionObserver`
- Fully responsive with a slide-down mobile menu
- Accessible: skip link, visible focus rings, ARIA labels, semantic landmarks
- Respects `prefers-reduced-motion` — all animation disables for users who ask
- Print stylesheet
- SEO: meta description, Open Graph tags, JSON-LD `Person` schema

No frameworks, no npm, no build. Total page weight is well under 100 KB excluding your photo.

---

## Browser support

Modern Chrome, Firefox, Safari, and Edge. The layout degrades gracefully in older browsers —
animations are skipped but all content stays readable.

---

## Licence

Code is free to reuse and adapt. The written content and publication list belong to Meherab Hossain.
