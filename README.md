# wellesleyfca.com — home page redesign

React 19 + Vite + TypeScript + Tailwind CSS v4. Fonts are self-hosted (Baskervville + Nunito Sans), icons from lucide-react.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

## Updating content (no design changes needed)

| What changes | Edit |
| --- | --- |
| Clinician roster & who's accepting new patients | `src/data/providers.ts` (flip `acceptingNewPatients`; photo goes in `public/images/providers/<slug>.jpg`). Team counts update automatically. |
| Monthly newsletter (Constant Contact) | `src/data/newsletters.ts`: add the new issue at the top with its `conta.cc` link; the home page shows the newest 3 |
| Phone, address, hours, menu & dropdowns, specialized services, testimonials | `src/data/site.ts` (add a new specialty to `specialties` and it gets its own card) |

The "Open now / Opens tomorrow" badge is computed from `officeHours` in `site.ts` using Needham (Eastern) time.

Links to pages that haven't been rebuilt yet point at the live wellesleyfca.com (`legacy()` in `site.ts`).

## Deploying (GitHub Pages)

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages.

One-time setup: in the repo on GitHub, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

The site is served at `https://<user>.github.io/wellesleyfca.com/`. The workflow passes that sub-path to Vite as `BASE_PATH`, and `src/lib/asset.ts` prefixes image paths with it. If you later add a custom domain (e.g. wellesleyfca.com) in the Pages settings, the base path becomes `/` automatically; no code changes needed.
