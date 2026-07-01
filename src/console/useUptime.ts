import { useEffect, useState } from 'react';

const CAREER_START = new Date('2016-06-01T00:00:00Z').getTime();

const MS_YEAR = 365.25 * 24 * 60 * 60 * 1000;
const MS_DAY = 24 * 60 * 60 * 1000;
const MS_HOUR = 60 * 60 * 1000;
const MS_MIN = 60 * 1000;

export function formatUptime(ms: number): string {
  let rem = ms;
  const years = Math.floor(rem / MS_YEAR);
  rem -= years * MS_YEAR;
  const days = Math.floor(rem / MS_DAY);
  rem -= days * MS_DAY;
  const hours = Math.floor(rem / MS_HOUR);
  rem -= hours * MS_HOUR;
  const mins = Math.floor(rem / MS_MIN);
  rem -= mins * MS_MIN;
  const secs = Math.floor(rem / 1000);
  return `${years}y ${days}d ${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function useUptime() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsed = now - CAREER_START;
  return { elapsed, formatted: formatUptime(elapsed) };
}
