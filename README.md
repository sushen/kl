# Kuberas Lotus — Trading Technology Ecosystem Map

A fully static GitHub Pages site that presents the **Kuberas Lotus** project ecosystem as an interactive, node-based architecture map.

## Live Page Link (GitHub Pages)

If this repository is named `kl` and owned by user/org `<owner>`, the page URL is:

- `https://<owner>.github.io/kl/`

For this repository path (`/workspace/kl`), if your GitHub username is `sushen`, the link would be:

- `https://sushen.github.io/kl/`

> If you later rename the repository, replace `kl` in the URL with the new repo name.

---

## What the site includes

- **Landing page hero**
- **Interactive ecosystem map** centered on **Kuberas Lotus**
- **Node modal** with project details + repository link
- **Research pipeline** overview section
- Futuristic dark visual style with glow and line animations

## Tech stack

- HTML
- CSS
- Vanilla JavaScript
- No backend / no build step

## Project structure

```text
/
├── index.html
├── style.css
├── script.js
└── assets/
```

## Run locally

You can open `index.html` directly, or serve with a static server:

```bash
python3 -m http.server 4173
```

Then open:

- `http://127.0.0.1:4173/`

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or your default branch), folder `/ (root)`
4. Save and wait for deployment.
5. Visit the generated URL shown in GitHub Pages settings.
