import type { AwardEntry, EducationEntry, Experience, ProjectEntry, SkillEntry } from '../data/resume';

export type BandId = 'home' | 'career' | 'projects' | 'skills' | 'more';

export interface Band {
  id: BandId;
  dialLabel: string;
  name: string;
  tagline: string;
  freqMin: number;
  freqMax: number;
  unit: string;
  decimals: number;
}

export type StationContent =
  | { kind: 'home' }
  | { kind: 'experience'; data: Experience }
  | { kind: 'project'; data: ProjectEntry }
  | { kind: 'skill'; data: SkillEntry }
  | { kind: 'education'; data: EducationEntry }
  | { kind: 'award'; data: AwardEntry }
  | { kind: 'contact' };

export interface Station {
  id: string;
  band: BandId;
  freq: number;
  callSign: string;
  label: string;
  content: StationContent;
}
