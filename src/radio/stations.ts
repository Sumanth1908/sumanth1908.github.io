import { awards, education, experiences, projects, skills } from '../data/resume';
import type { Band, BandId, Station } from './types';

export const bands: Band[] = [
  {
    id: 'home',
    dialLabel: 'FM',
    name: 'Home',
    tagline: 'Now broadcasting',
    freqMin: 88.0,
    freqMax: 108.0,
    unit: 'MHz',
    decimals: 1,
  },
  {
    id: 'career',
    dialLabel: 'SW1',
    name: 'Career',
    tagline: 'Ten years, four postings',
    freqMin: 3.0,
    freqMax: 12.0,
    unit: 'MHz',
    decimals: 1,
  },
  {
    id: 'projects',
    dialLabel: 'SW2',
    name: 'Projects',
    tagline: 'Things I shipped',
    freqMin: 12.0,
    freqMax: 30.0,
    unit: 'MHz',
    decimals: 1,
  },
  {
    id: 'skills',
    dialLabel: 'SW3',
    name: 'Skills',
    tagline: 'Signal strength report',
    freqMin: 30.0,
    freqMax: 42.0,
    unit: 'MHz',
    decimals: 1,
  },
  {
    id: 'more',
    dialLabel: 'AM',
    name: 'Directory',
    tagline: 'Education, honors, and how to reach me',
    freqMin: 540,
    freqMax: 1600,
    unit: 'kHz',
    decimals: 0,
  },
];

export const bandById = (id: BandId): Band => {
  const band = bands.find((b) => b.id === id);
  if (!band) throw new Error(`Unknown band: ${id}`);
  return band;
};

export const snapThreshold = (band: Band): number => (band.freqMax - band.freqMin) * 0.03;

const distribute = (count: number, min: number, max: number): number[] => {
  if (count === 1) return [(min + max) / 2];
  const span = max - min;
  const margin = span * 0.08;
  const usableMin = min + margin;
  const usableMax = max - margin;
  const step = (usableMax - usableMin) / (count - 1);
  return Array.from({ length: count }, (_, i) => Math.round((usableMin + step * i) * 10) / 10);
};

const callSignFor = (company: string): string => {
  const map: Record<string, string> = {
    'Electronic Arts': 'KEA',
    Amazon: 'KAMZ',
    Teradata: 'KTRD',
    Infosys: 'KINF',
  };
  return map[company] ?? company.slice(0, 4).toUpperCase();
};

// Chronological, oldest first — tuning up the dial moves forward in time.
const careerChronological = [...experiences].reverse();
const careerFreqs = distribute(careerChronological.length, 3.0, 12.0);
const careerStations: Station[] = careerChronological.map((exp, i) => ({
  id: `career-${exp.id}`,
  band: 'career',
  freq: careerFreqs[i],
  callSign: callSignFor(exp.company),
  label: exp.company,
  content: { kind: 'experience', data: exp },
}));

const projectCompanyOrder = ['Teradata', 'Amazon', 'Electronic Arts'];
const projectsChronological = projectCompanyOrder.flatMap((company) =>
  projects.filter((p) => p.company === company),
);
const projectFreqs = distribute(projectsChronological.length, 12.0, 30.0);
const projectStations: Station[] = projectsChronological.map((proj, i) => ({
  id: `project-${proj.id}`,
  band: 'projects',
  freq: projectFreqs[i],
  callSign: `${callSignFor(proj.company)}-${i + 1}`,
  label: proj.title,
  content: { kind: 'project', data: proj },
}));

const skillFreqs = distribute(skills.length, 30.0, 42.0);
const skillStations: Station[] = skills.map((skill, i) => ({
  id: `skill-${skill.id}`,
  band: 'skills',
  freq: skillFreqs[i],
  callSign: skill.name.slice(0, 4).toUpperCase(),
  label: skill.name,
  content: { kind: 'skill', data: skill },
}));

const moreEntries = [
  ...education.map((edu) => ({ id: `edu-${edu.id}`, callSign: 'CBIT', label: edu.institution, content: { kind: 'education' as const, data: edu } })),
  ...awards.map((award) => ({ id: `award-${award.id}`, callSign: 'HNRS', label: award.title, content: { kind: 'award' as const, data: award } })),
  { id: 'contact', callSign: 'TX', label: 'Contact', content: { kind: 'contact' as const } },
];
const moreFreqs = distribute(moreEntries.length, 540, 1600);
const moreStations: Station[] = moreEntries.map((entry, i) => ({
  id: entry.id,
  band: 'more',
  freq: moreFreqs[i],
  callSign: entry.callSign,
  label: entry.label,
  content: entry.content,
}));

const homeStation: Station = {
  id: 'home',
  band: 'home',
  freq: 98.6,
  callSign: 'KSMJ',
  label: 'Sumanth Jillepally',
  content: { kind: 'home' },
};

export const stations: Station[] = [
  homeStation,
  ...careerStations,
  ...projectStations,
  ...skillStations,
  ...moreStations,
];

export const stationsForBand = (band: BandId): Station[] => stations.filter((s) => s.band === band);

export const closestStation = (band: BandId, freq: number): { station: Station | null; distance: number } => {
  const list = stationsForBand(band);
  let best: Station | null = null;
  let bestDist = Infinity;
  for (const s of list) {
    const d = Math.abs(s.freq - freq);
    if (d < bestDist) {
      bestDist = d;
      best = s;
    }
  }
  return { station: best, distance: bestDist };
};
