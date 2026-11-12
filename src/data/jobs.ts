import raw from './jobs.json';

// Job listings come from the IRA backend (GET /api/jobs). `npm run build` refreshes
// jobs.json first (scripts/sync-jobs.mjs) and falls back to the saved snapshot.

type RawJob = {
  _id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isActive?: boolean;
  postedAt: string;
};

export type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  posted: Date;
  description: string[]; // lines; blank lines dropped
  requirements: string[];
};

const clean = (s: string) => s.replace(/^\s*[-•]\s*/, '').trim();

export const jobs: Job[] = (raw as RawJob[])
  .filter((j) => j.isActive !== false)
  .map((j) => ({
    id: j._id,
    title: j.title.trim(),
    location: j.location,
    type: j.type,
    posted: new Date(j.postedAt),
    description: j.description.split('\n').map(clean).filter(Boolean),
    requirements: j.requirements.map(clean).filter(Boolean),
  }))
  .sort((a, b) => b.posted.getTime() - a.posted.getTime());

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });

// Splits "Label: value" lines so the label can be styled.
export function splitLabel(line: string): [string | null, string] {
  const m = line.match(/^([A-Z][A-Za-z&/()' ]{1,40}):\s*(.*)$/);
  return m ? [m[1], m[2]] : [null, line];
}
