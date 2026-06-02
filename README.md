# Katie Portfolio

This monorepo contains Katie's portfolio web application.

The project uses NX to manage the workspace and Next.js (App Router) for the frontend. MDX support is enabled so content can be written in `.md` / `.mdx` files.

## Key locations

- `apps/main` — the Next.js application (app router)
- `libs/content` — shared markdown loader (frontmatter, images, sorting)
- `libs/projects` — portfolio projects (`libs/projects/src/md`)
- `libs/publications` — publications content (`libs/publications/src/md`, TBD)
- `libs/navigation` — site navigation

## Technologies

- [NX](https://nx.dev/): workspace tooling
- [Next.js](https://nextjs.org/): React framework
- MDX: markdown + JSX support integrated with Next via `@next/mdx`

## Quickstart (dev)

1. Install dependencies:

```bash
npm install
```

2. Run the Next app in dev mode (using Nx):

```bash
npx nx run main:dev
```

3. Open http://localhost:3000

### Content cover images

Put images next to each markdown file in `libs/projects/src/md` or `libs/publications/src/md`. After adding or changing an image, sync assets into the Next app:

```bash
npx nx run main:sync-content-assets
```

`main:dev` and `main:build` run this automatically.

### Tests & CI

```bash
npx nx test
```

### Linting & formatting

```bash
npx nx lint
npx nx format:write
```

## Troubleshooting

- Cover images are synced from `libs/*/src/md` to `apps/main/public/{projects,publications}`. Run `npx nx run main:sync-content-assets` if images 404.
- If imports like `@katie-portofolio/projects` fail during build, ensure `tsconfig` path mappings point at the library `src/index.ts` files.
- Profile photo: replace `apps/main/src/assets/profile.jpeg` or update `AboutSection`.

## License

- MIT
