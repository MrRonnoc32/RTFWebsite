# A Bridge Within — Rachael Tutwiler Fortune

Marketing website for the book **A Bridge Within: Building Connection. Creating Opportunity.**
A static, multi-page site built with plain HTML and CSS — no build step required.

## Pages

| File | Page |
|------|------|
| `index.html` | Homepage |
| `book.html` | The Book |
| `speaking.html` | Speaking |
| `meet-rachael.html` | Meet Rachael |
| `endorsements.html` | Endorsements |
| `contact.html` | Contact |
| `community.html` | Join the Community |

Shared across every page: `styles.css` (design system) and `script.js` (mobile nav + scroll reveal + demo form handling).

## Design system

- **Colors:** Deep Teal `#0e3a40`, Gold `#c2892f`, Ivory `#f8f1e4`, White, near-black ink.
- **Type:** Playfair Display (serif headings) + Inter (sans body), loaded from Google Fonts.
- Defined as CSS custom properties at the top of `styles.css`.

## Assets

Real photography lives in `assets/img/`:
- `book-3d.jpg` — 3D book cover + spine
- `book-cover-front.jpg` — flat front cover
- `rachael-portrait.jpg` — seated professional portrait
- `rachael-standing.jpg` — full-length standing portrait

The original page mockups from the design doc are kept in `design-reference/` for visual comparison. They are **not** part of the live site.

## Local preview

Any static server works. For example:

```bash
python -m http.server 5510
# then open http://localhost:5510
```

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Deploy from a branch.**
3. Branch `main`, folder `/ (root)`. Save.
4. Site goes live at `https://USERNAME.github.io/REPO/`.

A `.nojekyll` file is included so Pages serves the files as-is.
For a custom domain (e.g. yourbridgewithin.com), add a `CNAME` file containing the domain and set DNS at your registrar.

## To-do / wire-up

The forms (newsletter signup, speaking inquiry, contact) are front-end only and currently show a thank-you message on submit. Connect them to a backend or a service like Formspree / Mailchimp / ConvertKit, and update the LinkedIn URL in each footer (`https://www.linkedin.com/`).
