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
---
```

This metadata is matching what we want to render in the UI. The date will be also used to render the files by order of when it was published.

After the metadata it will be the post content.

## Running unit tests

Run `nx test @katie-portofolio/posts` to execute the unit tests via [Vitest](https://vitest.dev/).
