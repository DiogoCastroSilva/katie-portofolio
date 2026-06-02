# @katie-portofolio/posts

This library contains all the posts in a MD format.

## Add new post

Create a new file inside the `md` folder. It need to contain the following metadata:

```
---
title: 'Hello World'
date: '2025-11-01'
tags: ['intro', 'welcome']
excerpt: 'My first post!'
image: hello-world.jpg
---
```

| Field     | Description |
| --------- | ----------- |
| `title`   | Card and post heading |
| `date`    | Used to sort posts (newest first) |
| `tags`    | Optional labels |
| `excerpt` | Short summary on the home page |
| `image`   | Cover image **filename** in this same `md` folder (e.g. `hello-world.jpg`). If omitted, the loader tries `{slug}.jpg`, `.png`, etc., then falls back to `post-placeholder.svg`. |

Place the image file next to the markdown file, for example:

```
src/md/
  hello-world.md
  hello-world.jpg
```

After adding or changing an image, sync it into the Next app:

```bash
npx nx run main:sync-post-assets
```

`main:dev` and `main:build` run this automatically. If you start Next without Nx, run the sync command once or the image URLs will 404.

After the metadata it will be the post content.

## Running unit tests

Run `nx test @katie-portofolio/posts` to execute the unit tests via [Vitest](https://vitest.dev/).
