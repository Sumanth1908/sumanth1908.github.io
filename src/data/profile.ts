export interface Contact {
    email: string;
    linkedin: string;
}

export interface Profile {
    name: string;
    title: string;
    tagline: string;
    summary: string;
    yearsOfExperience: string;
    contact: Contact;
}

export const profile: Profile = {
    name: 'Sumanth Jillepally',
    title: 'Software Development Engineer',
    tagline: 'Architecting intelligent, cloud-native & agentic AI systems',
    summary:
        'Results-oriented Software Development Engineer with 10+ years of experience designing robust applications, cloud-native architectures, and distributed computing solutions. Proven ability to build intelligent, AI-driven systems that enhance performance, reliability, and scalability — with a focus on Agentic AI and data-driven architectures that drive technological innovation and sustainable growth.',
    yearsOfExperience: '10+',
    contact: {
        email: 'sumanthjillepally@gmail.com',
        linkedin: 'https://linkedin.com/in/sumanthjillepally',
    },
};
