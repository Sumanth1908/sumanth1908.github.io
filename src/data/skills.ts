export interface SkillGroup {
    label: string;
    skills: string[];
}

export const skillGroups: SkillGroup[] = [
    {
        label: 'Core',
        skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'React', 'Scala'],
    },
    {
        label: 'AI & Agentic',
        skills: ['Agentic AI Stack', 'Agent SDK', 'MCP Protocol', 'A2A Protocol', 'RAG', 'Inference'],
    },
    {
        label: 'Systems & Cloud',
        skills: ['System Design', 'AWS', 'Docker', 'Kubernetes', 'Apache Flink', 'Kafka'],
    },
    {
        label: 'Platform & Data',
        skills: ['CI/CD & Infrastructure', 'Protobuf', 'MySQL', 'NoSQL', 'gRPC', 'Agile (SAFe)'],
    },
];
