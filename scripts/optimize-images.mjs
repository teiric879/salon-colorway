import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('public/images');
const MAX = 1800; // max long edge
const Q = 80;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walk(full);
      continue;
    }
    const ext = path.extname(e.name).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
    if (e.name === 'logo.png') continue; // keep logo as-is

    const before = (await stat(full)).size;
    const img = sharp(full, { failOn: 'none' });
    const meta = await img.metadata();
    const longEdge = Math.max(meta.width || 0, meta.height || 0);

    const tmp = full + '.tmp';
    let pipeline = img.rotate();
    if (longEdge > MAX) pipeline = pipeline.resize({ width: meta.width >= meta.height ? MAX : null, height: meta.height > meta.width ? MAX : null, withoutEnlargement: true });

    if (ext === '.png') {
      pipeline = pipeline.png({ quality: Q, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: Q, mozjpeg: true });
    }
    await pipeline.toFile(tmp);
    const after = (await stat(tmp)).size;
    if (after < before) {
      await unlink(full);
      await rename(tmp, full);
      console.log(`${e.name}: ${(before / 1e6).toFixed(2)}MB -> ${(after / 1e6).toFixed(2)}MB (${meta.width}x${meta.height})`);
    } else {
      await unlink(tmp);
      console.log(`${e.name}: kept original (${(before / 1e6).toFixed(2)}MB)`);
    }
  }
}

await walk(root);
console.log('done');
