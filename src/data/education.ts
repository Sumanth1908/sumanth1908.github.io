export interface Education {
    id: string;
    institution: string;
    location: string;
    degree: string;
    period: string;
    detail: string;
}

export const education: Education[] = [
    {
        id: 'cbit',
        institution: 'Chaitanya Bharathi Institute of Technology',
        location: 'Hyderabad, India',
        degree: 'B.E. — Electronics & Communications Engineering',
        period: 'Jun 2012 – May 2016',
        detail:
            'My final-year project, “Voice-Controlled Responsive Quadcopter,” won the prestigious “Best Outgoing Project of the Year” award.',
    },
    {
        id: 'sri-chaitanya',
        institution: 'Sri Chaitanya',
        location: 'Khammam, India',
        degree: 'Board of Intermediate Education — MPC',
        period: 'Apr 2010 – Jun 2012',
        detail: 'Achieved 97.4% in the Board of Intermediate Education, Andhra Pradesh.',
    },
];
