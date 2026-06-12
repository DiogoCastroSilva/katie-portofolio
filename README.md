# Portfolio monorepo

Nx workspace with a **Next.js** portfolio site. Content (projects and publications) lives in markdown files; the app is exported as static HTML for **GitHub Pages**.

**Live example:** [katie-portofolio](https://diogocastrosilva.github.io/katie-portofolio/) (adjust after you fork and deploy your own copy).

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 22.x (see `.nvmrc`) |
| npm | 10+ |

```bash
nvm use   # if you use nvm
node -v   # should match .nvmrc
```

---

## Quick start (local)

```bash
git clone https://github.com/<you>/<your-repo>.git
cd <your-repo>
npm install
npx nx run main:dev
```

Open [http://localhost:3000](http://localhost:3000).

**Production build locally:**

```bash
npx nx build main
# Static export is written to ./public (repo root)
```

---

## Repository layout

```
apps/main/                 Next.js app (pages, UI, site config)
libs/content/              Shared markdown loader + URL helpers
libs/projects/             Project markdown + images
libs/publications/         Publication markdown + images (TBD content)
libs/navigation/           Header / nav links
libs/utils/                Shared utilities (dates, etc.)
tools/sync-content-assets.mjs   Copies cover images into the Next public folder
.github/workflows/ci.yml   CI + GitHub Pages deploy
```

### Where to edit what

| What | Where |
|------|--------|
| Name, email, social links | `apps/main/src/configs/site-config.ts` |
| Profile photo | `apps/main/src/assets/profile.jpeg` |
| Nav labels / routes | `libs/navigation/src/lib/feature/config.ts` |
| Projects | `libs/projects/src/md/*.md` + images in the same folder |
| Publications | `libs/publications/src/md/*.md` + images in the same folder |
| About text | `apps/main/src/app/ui/AboutSection.tsx` |

### Project / publication markdown

Create a `.md` file in the matching `libs/*/src/md/` folder:

```yaml
---
title: 'Project title'
date: '2026-02-12'
tags: ['research']
excerpt: 'One-line summary for cards.'
image: cover.jpg
---

Body content here.
```

Put `cover.jpg` in the **same folder** as the `.md` file. If there is no image, a placeholder SVG is used.

After adding or changing images:

```bash
npx nx run main:sync-content-assets
```

`main:dev` and `main:build` run this automatically.

More detail: `libs/projects/README.md`, `libs/publications/README.md`.

---

## Environment variables

No secrets are required for local dev or the default GitHub Pages pipeline.

Copy `.env.example` to `apps/main/.env.local` when you need overrides.

| Variable | Required | Set by | Purpose |
|----------|----------|--------|---------|
| `NEXT_PUBLIC_BASE_PATH` | No | You (local) or CI (deploy) | Path prefix for GitHub **project** sites, e.g. `/my-repo`. Empty for `username.github.io` repos and local dev. |
| `NEXT_PUBLIC_DEPLOYMENT_URL` | No | CI on deploy | Canonical site URL, e.g. `https://user.github.io/my-repo`. |
| `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` | No | You | Cloudflare Web Analytics token. |
| `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_DISABLED` | No | You | Set to `true` to turn off analytics. |
| `NX_NO_CLOUD` | No | CI workflow | Disables Nx Cloud in Actions (`true` in workflow). |

**GitHub Actions secrets:** none required. Deploy uses the built-in `GITHUB_TOKEN`.

**Repository variables:** none required.

---

## GitHub Pages deployment

### First-time setup (after cloning or forking)

1. **Push** this repo to GitHub (default branch `main`).

2. **Enable GitHub Pages**
   - Repo → **Settings** → **Pages**
   - **Build and deployment** → **Source**: **Deploy from a branch**
   - **Branch**: `gh-pages` / **/(root)**
   - Save

   The deploy workflow pushes the built site to the `gh-pages` branch (`peaceiris/actions-gh-pages`).

3. **Actions permissions** (usually already correct on public repos)
   - Settings → **Actions** → **General**
   - **Workflow permissions**: **Read and write permissions**

4. **Push to `main`** (or merge a PR). The workflow runs:
   - **CI job:** `lint`, `test`, `typecheck`, `build`
   - **Deploy job** (only on push to `main`): builds the site and publishes to `gh-pages`

5. **Open your site**
   - Project repo: `https://<github-user>.github.io/<repo-name>/`
   - User site repo (`<user>.github.io`): `https://<github-user>.github.io/`

CI computes `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_DEPLOYMENT_URL` from the repository name so forks do not need to edit hardcoded paths.

### Test GitHub Pages paths locally

```bash
NEXT_PUBLIC_BASE_PATH=/your-repo-name npx nx build main
# Serve ./public with any static server if needed
```

### CI workflow overview

File: `.github/workflows/ci.yml`

| Job | When | What |
|-----|------|------|
| `ci` | Every push and PR | `npm ci` → `nx run-many -t lint test typecheck build` |
| `deploy` | Push to `main` only | Build + publish `public/` to `gh-pages` |

Workflow-level env: `NX_NO_CLOUD=true`.

---

## Common commands

```bash
npx nx run main:dev              # Dev server
npx nx build main                # Static export → ./public
npx nx run main:sync-content-assets
npx nx run-many -t lint          # Lint all projects
npx nx test                      # Tests
npx nx format:write              # Prettier
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Cover image 404 | Run `npx nx run main:sync-content-assets` |
| Broken links on GitHub Pages | Ensure Pages uses `gh-pages` branch; CI must set `NEXT_PUBLIC_BASE_PATH` (automatic on push to `main`) |
| `@katie-portofolio/*` import errors | Run `npm install`; check `tsconfig.base.json` paths |
| Deploy job skipped | Deploy only runs on **push to `main`**, not on PRs |
| Node version errors | Use Node 22 (`nvm use`) |

---

## License

MIT — see [LICENSE](LICENSE). Site content may use separate terms; see `site-config.ts` and `TEMPLATE_USAGE.md`.
