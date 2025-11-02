#!/usr/bin/env node
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

async function exists(p) {
  try {
    await fsp.access(p);
    return true;
  } catch {
    return false;
  }
}

async function copyRecursive(src, dest) {
  // prefer fs.cp when available
  if (fsp.cp) {
    await fsp.cp(src, dest, { recursive: true });
    return;
  }
  // fallback
  const stat = await fsp.stat(src);
  if (stat.isDirectory()) {
    await fsp.mkdir(dest, { recursive: true });
    const entries = await fsp.readdir(src);
    for (const e of entries) {
      await copyRecursive(path.join(src, e), path.join(dest, e));
    }
  } else {
    await fsp.mkdir(path.dirname(dest), { recursive: true });
    await fsp.copyFile(src, dest);
  }
}

async function generate() {
  const projectRoot = path.resolve(__dirname, '..');
  const nextDir = path.join(projectRoot, 'apps', 'main', '.next');
  const outDir = path.join(projectRoot, 'apps', 'main', 'out');

  console.log('nextDir:', nextDir);
  console.log('outDir:', outDir);

  if (!(await exists(nextDir))) {
    console.error('.next not found, run build first');
    process.exit(1);
  }

  // ensure out dir
  await fsp.rm(outDir, { recursive: true, force: true });
  await fsp.mkdir(outDir, { recursive: true });

  // Copy static assets -> out/_next/static
  const staticSrc = path.join(nextDir, 'static');
  const staticDest = path.join(outDir, '_next', 'static');
  if (await exists(staticSrc)) {
    console.log('Copying static assets to', staticDest);
    await copyRecursive(staticSrc, staticDest);
  } else {
    console.log('No', staticSrc, 'found');
  }

  // Copy server pages (.next/server/pages/*.html)
  const serverPages = path.join(nextDir, 'server', 'pages');
  const trailingSlash = true; // matches next.config.js in this repo
  if (await exists(serverPages)) {
    const walk = async (dir) => {
      const entries = await fsp.readdir(dir, { withFileTypes: true });
      for (const ent of entries) {
        const full = path.join(dir, ent.name);
        if (ent.isDirectory()) {
          await walk(full);
        } else if (ent.isFile() && ent.name.endsWith('.html')) {
          const rel = path.relative(serverPages, full).replace(/\\/g, '/');
          const route = rel.replace(/\.html$/, '');
          let dest;
          if (route === 'index') {
            dest = path.join(outDir, 'index.html');
          } else if (trailingSlash) {
            dest = path.join(outDir, route, 'index.html');
          } else {
            dest = path.join(outDir, route + '.html');
          }
          await fsp.mkdir(path.dirname(dest), { recursive: true });
          await fsp.copyFile(full, dest);
          console.log('Copied page', full, '->', dest);
        }
      }
    };
    await walk(serverPages);
  } else {
    console.log('No server/pages dir at', serverPages);
  }

  // Copy server app HTML (for app router prerendered fragments)
  const serverApp = path.join(nextDir, 'server', 'app');
  if (await exists(serverApp)) {
    const walkApp = async (dir) => {
      const entries = await fsp.readdir(dir, { withFileTypes: true });
      for (const ent of entries) {
        const full = path.join(dir, ent.name);
        if (ent.isDirectory()) {
          await walkApp(full);
        } else if (ent.isFile() && ent.name.endsWith('.html')) {
          const rel = path.relative(serverApp, full).replace(/\\/g, '/');
          const route = rel.replace(/\.html$/, '');
          // server app files are usually under app/<route>/_not-found.html etc
          let dest;
          if (route === 'index' || route === '') {
            dest = path.join(outDir, 'index.html');
          } else if (trailingSlash) {
            dest = path.join(outDir, route, 'index.html');
          } else {
            dest = path.join(outDir, route + '.html');
          }
          await fsp.mkdir(path.dirname(dest), { recursive: true });
          await fsp.copyFile(full, dest);
          console.log('Copied app page', full, '->', dest);
        }
      }
    };
    await walkApp(serverApp);
  }

  console.log('Generated', outDir);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
