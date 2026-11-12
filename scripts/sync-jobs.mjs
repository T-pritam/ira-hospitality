// Pulls the live job list from the IRA backend into src/data/jobs.json before a build.
// Never fails the build: if the API is slow or down, the last saved snapshot is used.
import { writeFile } from 'node:fs/promises';
const API = process.env.PUBLIC_API_BASE || 'https://ira-zkxr.onrender.com/api';
try {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 45000);
  const res = await fetch(`${API}/jobs`, { signal: ctrl.signal });
  clearTimeout(t);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const jobs = await res.json();
  if (!Array.isArray(jobs)) throw new Error('Unexpected response');
  await writeFile(new URL('../src/data/jobs.json', import.meta.url), JSON.stringify(jobs, null, 2));
  console.log(`[sync-jobs] saved ${jobs.length} jobs`);
} catch (e) {
  console.warn(`[sync-jobs] using saved snapshot (${e.message})`);
}
