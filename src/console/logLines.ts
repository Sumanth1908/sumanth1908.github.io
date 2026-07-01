import { experiences } from '../data/resume';

const MONTHS: Record<string, string> = {
  January: '01',
  February: '02',
  March: '03',
  April: '04',
  May: '05',
  June: '06',
  July: '07',
  August: '08',
  September: '09',
  October: '10',
  November: '11',
  December: '12',
};

const toDateTag = (monthYear: string): string => {
  const [month, year] = monthYear.split(' ');
  return `${year}-${MONTHS[month] ?? '01'}`;
};

export interface LogLine {
  id: string;
  date: string;
  level: 'INFO' | 'DEPLOY';
  tag: string;
  message: string;
}

const chronological = [...experiences].reverse();

export const logLines: LogLine[] = chronological.flatMap((exp) =>
  exp.responsibilities.map((r, i) => ({
    id: `${exp.id}-${i}`,
    date: toDateTag(exp.startDate),
    level: 'INFO' as const,
    tag: exp.company.toUpperCase().replace(/\s+/g, '-'),
    message: r,
  })),
);
