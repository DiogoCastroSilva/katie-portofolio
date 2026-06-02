# Katie Portfolio

This monorepo contains Katie's portfolio web application.

The project uses NX to manage the workspace and Next.js (App Router) for the frontend. MDX support is enabled so posts can be written in `.md` / `.mdx` files.

Key locations

- `apps/main` — the Next.js application (app router)
- `libs/posts` — a small shared library that reads markdown posts from `libs/posts/src/md`

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
# or
npm run dev # if you add a script that forwards to nx
```

3. Open http://localhost:3000

### Tests & CI

- Jest is configured at the workspace root. The jest config allows the test run to pass when there are no tests (`passWithNoTests`).
- To run tests:

```bash
npx nx test
```

### Linting & formatting

```bash
npx nx lint
npx nx format:write
```

## Troubleshooting

- If posts are not visible in production, make sure you ran the prepare/copy step so `apps/main/public/md` (or `.next/server/md`) contains the files.
- If imports like `@katie-portofolio/posts` fail during build, ensure your `tsconfig` path mappings point to `../../libs/posts/src/index.ts` (this project uses TS path mapping for local package resolution in dev).
- Profile photo: replace `apps/main/src/assets/profile.svg` with a JPEG/PNG import, or add `apps/main/public/profile.jpeg` and point `AboutSection` at `/profile.jpeg`.

## License

- MIT
