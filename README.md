# Ronnie Mondal — Personal Website

Source code for my personal academic and professional website, hosted free on **GitHub Pages**:
**https://ronnie247.github.io/**

Last Updated: October 4, 2026

It is a fully static site (plain HTML, CSS and JavaScript). There is no server, database, build step or framework, so everything can be edited directly in the GitHub web editor.

---

## Features

- Home page with About section, photo, and contact grid
- **CV** menu: Experience, Education, Certifications, Awards
- **Artwork** menu: Poetry, Sketches
- Publications section (paper, supporting info and code links)
- News page ("Ronnie in the News") with automatic link previews
- Poetry page that builds itself from `.txt` / `.md` files in a folder
- Sketches gallery with full-screen viewer and "Load more"
- Dark mode toggle (remembers the choice, follows the system setting the first time)
- Automatic translation (Hindi, Punjabi, Urdu, French, Korean) with a warning banner; name is transliterated; poems, sketches stay in the original
- Responsive layout for phones, tablets and desktops
- Search-engine metadata (`robots.txt`, `sitemap.xml`, structured data)

---

## Repository structure

```
.
├── index.html              Home page (About, Publications, Contact)
├── experience.html         Work experience
├── education.html          Education
├── certifications.html     Certifications (link previews)
├── awards.html             Awards
├── news.html               "Ronnie in the News" (link previews)
├── poetry.html             Poetry (reads the poetry/ folder)
├── sketches.html           Sketch gallery
├── subpage.css             Base styles for all sub-pages
├── theme.css               Dark mode, dropdown menus, contact grid, sub-page header name
├── site.js                 Dark-mode toggle, dropdowns, translation on sub-pages
├── robots.txt              Search-engine crawl rules
├── sitemap.xml             List of pages for search engines
├── images/                 Profile photo and other site images
├── files/                  CV PDF
├── publications/           Paper PDFs, supporting-information PDFs
├── poetry/                 Poems as .txt / .md files (+ auto-generated index.json)
├── sketches/               Sketch images
└── .github/workflows/
    └── poetry-index.yml    GitHub Action that keeps poetry/index.json up to date
```

Keep the HTML, CSS and JS files in the **root** of the repository. Page-to-page links are relative.

---

## How to update each part

Every edit is made by opening the file on GitHub, clicking the pencil icon (Edit), and committing the change. The live site updates in 1–3 minutes. Use a private window or hard refresh (Ctrl/Cmd + Shift + R) to see changes, since browsers cache files.

### About section (`index.html`)
Edit the text inside `<section id="about">`. The photo is `images/ronnie-mondal.jpeg` (change the `src` if the file name changes). The CV button points to `files/CV_RonnieMondal.pdf`.

### Contact links (`index.html`)
The contact grid has nine blocks in three rows. Change the `href` of each link. All links open in a new tab.

### Experience and Education (`experience.html`, `education.html`)
Each entry is a card. Copy an existing card and edit it:

```html
<div class="card">
  <h3>Title</h3>
  <p class="meta">Organization · Location · Years</p>
  <p>Optional description, or use a <ul> with <li> bullets.</p>
</div>
```

### Awards (`awards.html`)
Same card format as above. Newest first.

### Certifications (`certifications.html`)
Edit the `CERTS` list near the top of the script. **Newest first** (add new ones at the top):

```js
{ title: "Certificate name",
  url: "https://link-to-the-certificate",
  meta: "Issuer · Mon YYYY" },
```

A preview image and description are fetched automatically. If a site blocks previews, add `image:"..."` or `description:"..."` to the entry to set your own.

### News (`news.html`)
Edit the `NEWS` list. **Add new articles at the bottom**; the page shows the newest (last) on top:

```js
{ title: "Headline", url: "https://link-to-the-article" },
```

Same optional `image` / `description` overrides as certifications.

### Publications (`index.html`)
Copy a publication card in the Publications section. Put the PDFs in `publications/` and update the three buttons (paper, supporting info, code).

### Poetry (`poetry.html` + `poetry/` folder)
Add a `.md` or `.txt` file to the `poetry/` folder. That is all.

- The file name is the title (`Midnight_Rain.md` shows as "Midnight Rain"), unless the first line is `# My Title`.
- Line breaks are kept exactly as typed. In `.md` files, `*italic*` and `**bold**` work.
- Save files as **UTF-8**. Any language works, and right-to-left scripts (such as Urdu) align correctly.
- Poems are shown newest first, by the date each file was first added to the repository.
- Click a poem to expand it; click elsewhere to collapse it. Expanded poems have a **Translate** button that opens Google Translate.

Template:

```markdown
# Poem Title

lang: hi or en or ur or fr or kr

First line of the first stanza
Second line of the first stanza

First line of the second stanza
```

**How it works:** GitHub Pages cannot list folders, so the workflow `.github/workflows/poetry-index.yml` runs whenever something in `poetry/` changes. It writes `poetry/index.json` (file names with the date each was added, newest first) and commits it. `poetry.html` reads that list.

One-time setup:
1. Settings → Actions → General → Workflow permissions → **Read and write permissions** → Save.
2. Actions tab → "Update poetry index" → **Run workflow**.

### Sketches (`sketches.html`)
1. Upload images to the `sketches/` folder. Resize them first (about 1600 px on the long side, under 500 KB) so the page loads quickly.
2. Add the exact file names, including extension and capitalization, to the `sketches` list in the script. Order in the list is the display order.
3. `PAGE = 12` controls how many appear per "Load more" click.

---

## Dark mode

The 🌙 / ☀️ button in the header toggles dark mode and stores the choice in the browser (`localStorage`). Colors are CSS variables defined in `subpage.css` / the inline styles in `index.html`, with dark overrides in `theme.css`.

---

## Translation

Translation uses the free Google Translate widget, driven by a custom language dropdown (so the labels show the language names in their own script).

- Choosing a language sets Google's `googtrans` cookie and reloads the page; "English (Original)" clears it.
- The language carries over to the sub-pages via `site.js`.
- The name is not machine-translated. It is replaced with a transliteration from these lists:
  - `index.html` → `NAMES` (header logo) and `HERO_NAMES` (big heading)
  - `site.js` → `LOGO_NAMES` (header on sub-pages)
- Content marked `class="notranslate" translate="no"` is left alone (name, poems, sketches, news and certificate titles).
- A banner warns visitors that the page was translated automatically.

Translation only works on the live site (it needs the real domain and cookies), not when opening the files directly from a computer.

---

## Search engine setup

- `robots.txt` allows all crawlers and points to the sitemap.
- `sitemap.xml` lists every page. **When you add a new page, add it here too.**
- `index.html` contains a title, meta description, canonical link, Open Graph tags and `Person` structured data (JSON-LD).
- The site is registered in Google Search Console, with the sitemap submitted.

---

## Previewing locally

Open `index.html` in a browser to check layout. For features that fetch files (poetry, news previews) use a small local server from the repo folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Poetry needs `poetry/index.json`, which only exists after the GitHub Action has run, so test that part on the live site. Translation and link previews also need the live site.

---

## Security notes

- The site is static: no logins, forms, databases or server code, so the main risk is access to the GitHub account.
<!-- - Two-factor authentication is enabled on the GitHub account; keep recovery codes safe.-->
- No collaborators have write access. Do not commit passwords or API keys.
- Text from poems, news titles and certificates is escaped before display; external links use `rel="noopener"`.
- Third-party services loaded by the site: Google Fonts, Google Translate, and Microlink (link previews).
- Keep a local clone of the repository as a backup.

---

## Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Change doesn't show | Wait 1–3 minutes, then hard refresh or open a private window. Check the Actions tab for a green tick. |
| Sketch tile is blank | File name in the list doesn't match the repo exactly (spaces, capitalization, extension). |
| New poem doesn't appear | Check the Actions tab: "Update poetry index" should have run. Confirm workflow permissions are "Read and write". File must end in `.md` or `.txt`. |
| News/certificate card has no image | The site blocked the preview. Add `image:"..."` to the entry. |
| Language dropdown does nothing | Check the browser console (F12) for errors; make sure `site.js` and the translation script are intact. |
| A page looks unstyled | `subpage.css` or `theme.css` is missing from the repo root. |

---

## Credits

Built with plain HTML/CSS/JS, Google Fonts (Pinyon Script), Google Translate and Microlink. Initial layout drafted with the help of Claude (Anthropic).

© Ronnie Mondal. All rights reserved unless stated otherwise.
