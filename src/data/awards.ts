export interface Award {
    id: string;
    title: string;
    issuer: string;
    year: string;
    detail: string;
}

export const awards: Award[] = [
    {
        id: 'extra-mile',
        title: 'Extra Mile Award',
        issuer: 'Amazon',
        year: '2023',
        detail:
            'Built a tool to notify moderators about flagged ASINs, allowing them to skip or proceed with additional checks — increasing seller trust, reducing the Inaccurate Rejection Ratio, and boosting Ad-revenue conversion.',
    },
    {
        id: 'best-project',
        title: 'Best Outgoing Project of the Year',
        issuer: 'CBIT',
        year: '2016',
        detail:
            'Awarded for the “Voice-Controlled Responsive Quadcopter” — my final-year engineering project.',
    },
];
