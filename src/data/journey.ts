import { experiences, type ExperienceProject } from './experience';
import { education } from './education';

export interface JourneyEntry {
    id: string;
    type: 'education' | 'experience';
    title: string;
    subtitle: string;
    location: string;
    lat: number;
    lng: number;
    startYear: number;
    endYear: number;
    period: string;
    color: string;
    narrative: string;
    achievements: string[];
    tech?: string[];
    projects?: ExperienceProject[];
}

export const journey: JourneyEntry[] = [
    {
        id: 'sri-chaitanya',
        type: 'education' as const,
        title: 'Sri Chaitanya',
        subtitle: 'Board of Intermediate Education — MPC',
        location: 'Khammam, India',
        lat: 17.2473,
        lng: 80.1514,
        startYear: 2010.33,
        endYear: 2012.42,
        period: 'Apr 2010 – Jun 2012',
        color: '#888888',
        narrative: 'My foundational years where I built a strong base in Mathematics, Physics, and Chemistry. This analytical grounding paved the way for my engineering journey.',
        achievements: [education.find(e => e.id === 'sri-chaitanya')?.detail || ''],
    },
    {
        id: 'cbit',
        type: 'education' as const,
        title: 'Chaitanya Bharathi Institute of Technology',
        subtitle: 'B.E. — Electronics & Communications Engineering',
        location: 'Hyderabad, India',
        lat: 17.3916,
        lng: 78.3197, // CBIT coordinates approx
        startYear: 2012.42,
        endYear: 2016.42,
        period: 'Jun 2012 – May 2016',
        color: '#444444',
        narrative: 'At CBIT, I dove deep into electronics and communications. It culminated in my final year project, a voice-controlled quadcopter, which won the Best Outgoing Project award and ignited my passion for building integrated hardware-software systems.',
        achievements: [education.find(e => e.id === 'cbit')?.detail || ''],
    },
    ...experiences.map(exp => ({
        id: exp.id,
        type: 'experience' as const,
        title: exp.company,
        subtitle: exp.role,
        location: exp.city + ', ' + exp.country,
        lat: exp.lat,
        lng: exp.lng,
        startYear: exp.startYear,
        endYear: exp.endYear,
        period: `${exp.start} - ${exp.end}`,
        color: exp.accent,
        narrative: exp.narrative || exp.blurb,
        achievements: exp.highlights,
        tech: exp.tech,
        projects: exp.projects,
    }))
].sort((a, b) => a.startYear - b.startYear);
