export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    imageUrl?: string;
    githubUrl?: string;
    liveUrl?: string;
    company?: string;
    icon?: string;
    impact?: string;
}

export const projects: Project[] = [
    {
        id: 'flowwand',
        title: 'FlowWand Application',
        description: 'A powerful canvas-based application with interactive node handles and dynamic routing. Built with React and Zustand.',
        tags: ['React', 'TypeScript', 'Zustand', 'Canvas'],
        liveUrl: 'https://flow-wand.iamsquark.com/',
        githubUrl: '#',
        icon: 'Layers',
        impact: 'Enabled dynamic workflow creation',
    },
    {
        id: 'finance-dashboard',
        title: 'Finance Dashboard',
        description: 'Comprehensive dashboard for portfolio tracking, cross-currency transfers, and advanced data visualization.',
        tags: ['React', 'Redux', 'Financial Data', 'APIs'],
        liveUrl: '#',
        icon: 'LineChart',
        impact: 'Improved financial tracking efficiency',
    },
    {
        id: 'ai-assistant',
        title: 'AI Assistant Integration',
        description: 'Backend integration of an AI agent that utilizes existing APIs to query data and provide intelligent insights.',
        tags: ['Node.js', 'AI', 'Backend', 'API Integration'],
        githubUrl: '#',
        icon: 'Bot',
        impact: 'Automated intelligent insights',
    },
    {
        id: 'theme-counter',
        title: 'Theme & State Counter App',
        description: 'A robust utility app featuring wave animations, dynamic theme selection, and resilient state management.',
        tags: ['React', 'Framer Motion', 'UI/UX'],
        githubUrl: '#',
        icon: 'Palette',
        impact: 'Delivered robust UI utilities',
    }
];
