# Pablo Rodríguez Ovalle — V12 (multipage website)

## Pages

- `index.html`: Home, photographic cover and quick links
- `about.html`: About me
- `research.html`: Research
- `projects.html`: Projects
- `publications.html`: Publications (automatically synchronized)
- `teaching.html`: Teaching
- `experience.html`: Academic Experience
- `outreach.html`: Outreach
- `contact.html`: Contact with the Candín photograph

All page links use relative paths and work with GitHub Pages. The V11 logo, favicon, JSON-LD SEO metadata, CSS and assets are retained. The XML sitemap includes all nine pages. User-facing geography wording uses **Ancares**.

## Deploy

Upload the uncompressed contents of this ZIP to the **root** of the `PabloROvalle.github.io` GitHub repository, including `index.html`, the eight new `.html` files, `styles.css`, `script.js`, and `sitemap.xml`. Keep folder structure intact. GitHub Pages serves `index.html` as the home page.

**IMPORTANT:** Never delete an existing `publications.json` in the repository. The GitHub Actions workflow `.github/workflows/sync-publications.yml` and `scripts/sync_publications.py` remain as in V11 and create/update the JSON. If the ZIP upload workflow does not preserve hidden `.github`, keep the existing GitHub Actions folder as-is.

After publication, Search Console may take time to discover the eight new pages; submit the updated `sitemap.xml` and optionally request indexing for each page.


V13 update: uses the new Ancares sunset image as the top image on Home and all section banners, except Outreach which keeps the previous mountain-sky image.


## V14: Dark theme by default
- Dark theme is active on first visit across all nine pages.
- Light/Dark toggle is in the site header; it remembers the choice using browser localStorage.
- To reset the theme on a device, select Dark in the toggle or clear this site's browser storage.
- HTML, CSS and JS modified; existing assets, SEO and publication sync retained.
