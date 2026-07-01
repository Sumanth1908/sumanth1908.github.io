export interface ExperienceProject {
    title: string;
    description: string;
    tech: string[];
}

export interface Experience {
    id: string;
    company: string;
    role: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
    start: string;
    end: string;
    startYear: number;
    /** Fractional end year (e.g. 2024.75 for Oct 2024). Present roles use the current year. */
    endYear: number;
    blurb: string;
    highlights: string[];
    tech: string[];
    accent: string;
    narrative?: string;
    chapter?: number;
    projects?: ExperienceProject[];
}

// Chronological order — drives the globe trail and timeline scrubber.
export const experiences: Experience[] = [
    {
        id: 'infosys',
        company: 'Infosys',
        role: 'Automation Engineer',
        city: 'Hyderabad',
        country: 'India',
        lat: 17.385,
        lng: 78.4867,
        start: 'Jun 2016',
        end: 'Mar 2019',
        startYear: 2016.42,
        endYear: 2019.17,
        blurb:
            'As part of the Automation & DevOps team, I built automation frameworks and CI/CD workflows, owning Continuous Integration and enhancing software delivery across the lifecycle.',
        highlights: [
            'Integrated REST API testing into a client’s existing framework and served as the Single Point of Contact for Continuous Integration.',
            'Developed reusable functions automating 500+ test cases for a stock brokerage application.',
            'Built a proof-of-concept ML chatbot using sequence-to-sequence learning to act as a customer care representative.',
        ],
        tech: ['CI/CD', 'REST', 'Automation', 'Python', 'ML'],
        accent: '#03dac6',
        chapter: 1,
        narrative: "Starting my career at Infosys, I was thrown into the world of DevOps and automation. I built frameworks that automated over 500 test cases and served as the focal point for Continuous Integration. It was here that I built a proof-of-concept ML chatbot, realizing the power of AI in solving real-world problems.",
    },
    // Infosys had no standalone named projects on record — just the responsibilities above.
    {
        id: 'teradata',
        company: 'Teradata',
        role: 'DevOps Engineer',
        city: 'Hyderabad',
        country: 'India',
        lat: 17.385,
        lng: 78.4867,
        start: 'Feb 2019',
        end: 'May 2021',
        startYear: 2019.08,
        endYear: 2021.42,
        blurb:
            'As part of the COE team, I worked as a DevOps engineer and application developer to improve developer experience, ease delivery bottlenecks, and set standards for CI/CD workflows and operational excellence.',
        highlights: [
            'Built an intelligent Build Acceptance Testing pipeline deploying all Teradata components in VMware to surface cross-component issues and generate a Build of Materials (BOM).',
            'Created common Python test modules with SSH and R-shell interaction to standardize test development across QA teams.',
            'Used Ansible for infrastructure automation, wrote custom Ansible modules, and built reusable Groovy libraries for Jenkins pipelines.',
        ],
        tech: ['Jenkins', 'Ansible', 'Python', 'VMware', 'Groovy'],
        accent: '#bb86fc',
        chapter: 2,
        narrative: "At Teradata, my focus shifted to scale and operational excellence. I developed an intelligent Build Acceptance Testing pipeline that deployed all components in VMware, generating automated BOMs. I standardized test development across QA teams and deepened my expertise in infrastructure automation with Ansible.",
        projects: [
            {
                title: 'Vantage BAT',
                description: 'End-to-end build-acceptance pipeline that deploys a full Vantage cluster on VMware via Ansible to catch cross-component issues early — later parallelized to cut runtime by 40 minutes.',
                tech: ['Jenkins', 'Ansible', 'Python'],
            },
            {
                title: 'Common Test Development Modules',
                description: 'Reusable Python test modules (SSH, R-shell, Teradata drivers) adopted across QA teams to standardize test development.',
                tech: ['Python'],
            },
        ],
    },
    {
        id: 'amazon',
        company: 'Amazon',
        role: 'Software Development Engineer',
        city: 'Bangalore',
        country: 'India',
        lat: 12.9716,
        lng: 77.5946,
        start: 'May 2021',
        end: 'Oct 2024',
        startYear: 2021.42,
        endYear: 2024.75,
        blurb:
            'A full-stack developer building applications on AWS for internal teams in the Amazon Advertising domain — innovating to improve user experiences, solve customer problems, and create revenue.',
        highlights: [
            'Built low-latency APIs operating on 10M-record datasets, contributing to $800K in savings.',
            'Developed a reusable workflow management tool end-to-end and reusable libraries to reduce time-to-market for new features.',
            'Created POCs using Amazon Q and RAG-based applications for the Moderation ecosystem and automated monthly business reports and analysis.',
            'Mentored junior developers and reduced technical debt by refactoring legacy code.',
        ],
        tech: ['React', 'Java', 'AWS', 'Lambda', 'RAG', 'Amazon Q'],
        accent: '#ff9900',
        chapter: 3,
        narrative: "Joining Amazon opened up a massive scale for me. I built low-latency APIs processing 10 million records and created a workflow management tool from scratch. This chapter was heavily focused on cloud architecture and exploring bleeding-edge tech like Amazon Q and RAG for the Moderation ecosystem, saving the company $800K.",
        projects: [
            {
                title: 'Shared Libraries — Java, Python, JS',
                description: 'Cross-language shared libraries standardizing common functionality org-wide — a Python/Aurora MySQL loader used in Lambda, JS S3 helpers for presigned URLs and multipart transfer, and a custom OAuth2 interceptor in Java.',
                tech: ['Java', 'Python', 'JavaScript', 'AWS', 'CDK'],
            },
            {
                title: 'Ignite',
                description: 'Configurable workflow engine tracking idea submissions end-to-end — validation, discussion, refinement, approval — built on React/Tanstack with a Java/DocumentDB backend deployed on ECS.',
                tech: ['React', 'Java', 'DocumentDB', 'AWS ECS'],
            },
            {
                title: 'Inquest',
                description: "Slack bot (Bolt framework) that logs moderators' queries and mines them for insights to close knowledge gaps, integrated into internal web apps with QuickSight reporting.",
                tech: ['Python', 'MySQL', 'JavaScript'],
            },
        ],
    },
    {
        id: 'ea',
        company: 'Electronic Arts',
        role: 'Software Engineer III',
        city: 'Hyderabad',
        country: 'India',
        lat: 17.385,
        lng: 78.4867,
        start: 'Oct 2024',
        end: 'Present',
        startYear: 2024.75,
        endYear: 2026.5,
        blurb:
            'Building scalable, high-performance event-driven systems supporting cross-game integrations and the moderation & discovery lifecycle of user assets — while leading strategic AI-adoption initiatives across the org.',
        highlights: [
            'Developed scalable, low-latency event-driven systems for asset moderation, transformation, and vectorized & semantic discovery using inference.',
            'Led an AI-driven synthetic data generation initiative using Agentic AI with A2A and MCP protocols.',
            'Led development of an AI-driven multi-agent test system for automated testing of an event-driven system.',
            'Built a graph engine to project protobufs as JSON specs to optimize retrieval, and a Dev Toolbox to simplify development setup.',
        ],
        tech: ['Scala', 'Flink', 'Kafka', 'Agentic AI', 'MCP', 'A2A', 'Kubernetes'],
        accent: '#ff0266',
        chapter: 4,
        narrative: "Now at EA, I'm architecting the systems that handle massive gamer data. I build scalable, low-latency event-driven systems using Flink and Kafka. More importantly, I'm spearheading AI adoption—building multi-agent systems and leveraging Agentic AI to fundamentally change how we generate data and test our systems.",
        projects: [
            {
                title: 'Agentic Test System',
                description: 'Multi-agent-driven automated testing system for Flink jobs — a Planning Agent designs test plans, a Manager Agent orchestrates validations, and stateless Validation Agents verify outcomes against schema-based checks that curb LLM hallucination.',
                tech: ['Agent SDK', 'Python', 'GRPC', 'MCP'],
            },
            {
                title: 'Datagen AI',
                description: 'AI-driven, schema-aware data generation system that projects protobuf relationships into a graph engine and drives multi-agent generation over the A2A protocol.',
                tech: ['Python', 'Protobuf', 'MCP', 'A2A'],
            },
            {
                title: 'Morpheus (Event-Driven Systems)',
                description: 'End-to-end Kafka/Flink pipeline giving game teams a schema-driven way to transform, enrich, and semantically discover user content — including vector embeddings served through a multi-cluster OpenSearch setup.',
                tech: ['Scala', 'Java', 'Apache Flink', 'Kubernetes'],
            },
            {
                title: 'Dev Toolbox',
                description: 'CLI that spins up every tool needed for Morpheus development — Grafana, Prometheus, Kafka, OpenSearch, OpenTelemetry — each isolated via Docker Compose.',
                tech: ['Docker', 'Python'],
            },
        ],
    },
];
