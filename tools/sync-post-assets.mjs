import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'libs/posts/src/md');
const destDir = path.join(root, 'apps/main/public/posts');

const IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.svg',
]);

function isPostImage(filename) {
  return IMAGE_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

fs.mkdirSync(destDir, { recursive: true });

const copied = new Set();

for (const file of fs.readdirSync(srcDir)) {
  if (!isPostImage(file)) {
    continue;
  }
  fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
  copied.add(file);
}

for (const file of fs.readdirSync(destDir)) {
  if (file === '.gitkeep' || !isPostImage(file)) {
    continue;
  }
  if (!copied.has(file)) {
    fs.unlinkSync(path.join(destDir, file));
  }
}

const names = [...copied].sort().join(', ') || '(none)';
console.log(`Synced post images to ${path.relative(root, destDir)}: ${names}`);
