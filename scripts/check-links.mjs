// Verifies every internal href/src in the built site resolves to a file in dist/.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
const dist = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');
async function walk(d) { const out = []; for (const e of await readdir(d, { withFileTypes: true })) { const p = join(d, e.name); if (e.isDirectory()) out.push(...await walk(p)); else out.push(p); } return out; }
const files = await walk(dist);
const html = files.filter((f) => f.endsWith('.html'));
const exists = async (p) => { try { await stat(p); return true; } catch { return false; } };
const bad = new Set(); let count = 0;
for (const f of html) {
  const src = await readFile(f, 'utf8');
  for (const m of src.matchAll(/(?:href|src|srcset)="([^"]+)"/g)) {
    for (let u of m[1].split(',').map((s) => s.trim().split(' ')[0])) {
      if (!u.startsWith('/') || u.startsWith('//')) continue;
      u = decodeURIComponent(u.split('#')[0].split('?')[0]); count++;
      const p = join(dist, u);
      const ok = (await exists(p)) && ((await stat(p)).isFile() || await exists(join(p, 'index.html')));
      if (!ok) bad.add(`${u}  (in ${f.replace(dist, '')})`);
    }
  }
}
console.log(`${html.length} pages, ${count} internal links checked, ${bad.size} broken`);
[...bad].slice(0, 30).forEach((b) => console.log('  BROKEN', b));
