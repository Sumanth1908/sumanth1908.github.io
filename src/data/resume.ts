export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  tagline: string;
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  company: string;
}

export interface SkillEntry {
  id: string;
  name: string;
  level: number;
  category: 'technical' | 'additional';
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface AwardEntry {
  id: string;
  title: string;
  description: string;
  date: string;
  issuer: string;
}

export const contactInfo: ContactInfo = {
  name: 'Sumanth Jillepally',
  phone: '919010234192',
  email: 'sumanthjillepally@gmail.com',
  linkedin: 'https://linkedin.com/in/sumanthjillepally',
  tagline:
    'Results-oriented Software Development Engineer with 10+ years of experience in designing robust applications, cloud-native architectures, and distributed computing solutions. Proven ability to build intelligent, AI-driven systems that enhance performance, reliability, and scalability.',
};

export const experiences: Experience[] = [
  {
    id: 'ea',
    company: 'Electronic Arts',
    location: 'Hyderabad, India',
    position: 'Software Engineer III',
    startDate: 'October 2024',
    endDate: '',
    current: true,
    description:
      'At EA, I contributed to building scalable, high-performance event driven systems supporting cross-game integrations and moderation, discovery lifecycle of user assets. I played a key role in advancing AI adoption across the organization by leading strategic initiatives that improved data quality, automation, and operational efficiency, while strengthening engineering standards through mentorship and cross team collaborations.',
    responsibilities: [
      'Developed scalable, low-latency, event-driven systems for asset moderation, transformation, vectorized and semantic discovery using inference.',
      'Led AI-driven synthetic data generation initiative using Agentic AI solutions leveraging A2A and MCP protocols.',
      'Led AI-driven multi-agent test system development for automated testing of an event driven system.',
      'Led and developed graph engine to project protobufs as JSON specs to optimise the retrieval.',
      'Developed Dev Toolbox to simplify development setup and mentored junior engineers through code reviews and knowledge sharing sessions.',
    ],
  },
  {
    id: 'amazon',
    company: 'Amazon',
    location: 'Bangalore, India',
    position: 'Software Development Engineer',
    startDate: 'May 2021',
    endDate: 'October 2024',
    current: false,
    description:
      'At Amazon, I worked as a full stack developer and developed applications on AWS for internal teams in the Amazon Advertising Domain. My prime goal was to innovate and develop applications that contribute to improving user experiences, solving customer problems and creating revenue.',
    responsibilities: [
      'Built low latency APIs operating on 10M records of data and contributed to $800K in savings.',
      'Developed a reusable custom workflow management tool end to end from scratch, and reusable code libraries to expedite future development and reduce time-to-market for new features.',
      'Mentored junior developers and reduced technical debt by refactoring legacy code to improve maintainability and reduce error rates.',
      'Created proofs of concept for innovative solutions using Amazon Q and RAG based applications to power intelligent systems that are part of the Moderation Eco System, and to generate Monthly Business Reports and analysis.',
    ],
  },
  {
    id: 'teradata',
    company: 'Teradata',
    location: 'Hyderabad, India',
    position: 'DevOps Engineer',
    startDate: 'February 2019',
    endDate: 'May 2021',
    current: false,
    description:
      'As part of the COE team, I worked as a DevOps engineer and application developer to build solutions that improved developer experience and delivery bottlenecks. My prime goal was to improve operational excellence, developer experience and set standards for CI/CD workflows.',
    responsibilities: [
      'Developed an intelligent Build Acceptance Testing pipeline that builds and deploys all Teradata components in a VMware environment to identify cross-component issues and generates a Build of Materials (BOM) file with the latest compatible component versions.',
      'Created common Python test modules with features like SSH and R shell interaction to standardize test development across QA teams; used Ansible for infrastructure automation and developed reusable Groovy libraries for Jenkins pipelines.',
    ],
  },
  {
    id: 'infosys',
    company: 'Infosys',
    location: 'Hyderabad, India',
    position: 'Automation Engineer',
    startDate: 'June 2016',
    endDate: 'March 2019',
    current: false,
    description:
      'As part of the Automation & DevOps team, I worked as an automation engineer and contributed to the development of automation frameworks and CI/CD workflows to enhance software delivery.',
    responsibilities: [
      'Integrated REST API testing into a client’s existing test framework, expanded automation scope, and served as the Single Point of Contact for Continuous Integration; developed reusable functions to automate 500+ test cases for a stock brokerage application.',
      'Developed a proof-of-concept machine learning-based chatbot utilizing sequence-to-sequence learning to serve as a customer care representative.',
    ],
  },
];

export const projects: ProjectEntry[] = [
  {
    id: 'agentic-test-system',
    title: 'Agentic Test System',
    subtitle: 'A multi-agent driven automated testing system for an event driven system',
    description:
      'A multi-agent-driven automated Flink job testing system: a Planning Agent prepares the test plan, scenarios and data; a Manager Agent submits events and orchestrates validations by dispatching Validation Agents and aggregating results; Validation Agents verify outcomes and map results back to scenarios. Each agent operates independently and statelessly, capable of working autonomously while coordinating during execution.',
    responsibilities: [
      'Spearheaded every aspect of the product lifecycle, from concept proposal to delivery, independently.',
      'Designed and developed multiple MCP servers for event ingestion via gRPC, logs, traces, run registries, Kafka consumers, and OpenSearch.',
      'Implemented stringent schema-based checks to mitigate LLM hallucinations and ensure consistent, reliable output.',
    ],
    technologies: ['Agent SDK', 'Python', 'React', 'GRPC', 'MCP'],
    company: 'Electronic Arts',
  },
  {
    id: 'datagen-ai',
    title: 'Datagen AI',
    subtitle: 'An AI-driven, scalable data generation system utilizing Protobuf',
    description:
      'A data generation system that generates data based on protobufs and their relationships within a system. The generation is agentic AI-driven, utilizing relevant MCP tools associated with system-specific agents, logically segregated and designed around multi-agent communication via the A2A protocol and a Bring-Your-Own-Agent model.',
    responsibilities: [
      'Researched, architected and spearheaded the whole system; developed a graph engine for projecting protobuf as JSON specs.',
      'Connected with cross teams and evaluated use cases, promoting community level collaboration.',
    ],
    technologies: ['Python', 'Protobuf', 'MCP', 'A2A', 'AI'],
    company: 'Electronic Arts',
  },
  {
    id: 'morpheus',
    title: 'Morpheus (Event Driven Systems)',
    subtitle: 'A content-agnostic discovery, ingestion and enrichment lifecycle for user content',
    description:
      'An end-to-end event-driven system (Kafka and Apache Flink) that empowers game integrators to preconfigure a schema-driven system capable of data transformation, enrichment, and semantic and vectorized discovery to enhance the user experience.',
    responsibilities: [
      'Developed Flink jobs to deduplicate events from a Kafka stream and enforce content limitations at the ingress server.',
      'Developed Flink jobs to process event streams and generate vector embeddings for user content using inference models, integrated into a multi-OpenSearch cluster.',
      'Collaborated with external teams to streamline requirements into features and developed a BaseJob abstraction so all Flink jobs share the same standards.',
    ],
    technologies: ['Scala', 'Java', 'AWS', 'Apache Flink', 'Pekko', 'Kubernetes'],
    company: 'Electronic Arts',
  },
  {
    id: 'dev-tool-box',
    title: 'Dev Tool Box',
    subtitle: 'A one-stop solution for all dev setup related to Morpheus development',
    description:
      'A CLI tool that configures the tools necessary for Morpheus application development — Grafana, Prometheus, Kafka, OpenSearch, and OpenTelemetry — each encapsulated and segregated at the network and persistent storage levels using Docker and Docker Compose.',
    responsibilities: ['Designed, owned, and developed the entire tool single-handedly.'],
    technologies: ['Docker', 'Python'],
    company: 'Electronic Arts',
  },
  {
    id: 'shared-libraries',
    title: 'Shared Libraries — Java, Python, JavaScript',
    subtitle: 'Common packages providing an easy way to integrate the most-needed application features',
    description:
      'Comprehensive shared libraries across multiple languages to standardize common functionality and improve development efficiency across the organization.',
    responsibilities: [
      'Built a Python package to load a dataframe into Aurora MySQL used as an AWS Lambda layer; JavaScript S3 utilities for presigned URLs and multipart upload/download; a custom Java cloudAuth (OAuth 2.0) interceptor for service-to-service calls.',
      'Developed custom Python modules for Secrets Manager, SQS, and SES, including SQS fan-out event processing.',
      'Built reusable TypeScript AWS CDK constructs for endpoint services, DNS creation, and subdomain delegation.',
    ],
    technologies: ['Java', 'Python', 'JavaScript', 'AWS', 'Lambda', 'CDK'],
    company: 'Amazon',
  },
  {
    id: 'ignite',
    title: 'Ignite',
    subtitle: 'A configurable workflow-based execution system to track user idea submissions',
    description:
      'An application to log ideas submitted by users, taking each through validation, discussion, refinement, and approval as a configurable workflow, integrated with AWS and internal Amazon systems for trace, tracking, and notification.',
    responsibilities: [
      'Designed and built pages for users and admins to create, view, and download ideas, templates, and reports using React and Tanstack, with Figma for UI mockups.',
      'Designed and developed the backend microservice in Java (ARest) with DocumentDB as the persistence layer, decoupling async work (notifications, emails, schedules) into a Lambda layer triggered via SQS.',
      'Deployed to AWS ECS using CDK, including endpoint connections and Route53 DNS delegation with reusable infrastructure modules.',
    ],
    technologies: ['React', 'Java', 'DocumentDB', 'AWS', 'ECS', 'Lambda'],
    company: 'Amazon',
  },
  {
    id: 'inquest',
    title: 'Inquest',
    subtitle: 'A Slack bot for moderator query resolution',
    description:
      'A Slack bot that helps moderators log queries and get them resolved, using the query data to generate insights that optimize the process, identify knowledge gaps, and improve the moderator experience.',
    responsibilities: [
      'Built a Slack app on the BOLT framework using websockets to post a custom query resolution form, with configurable channels and bot commands for pending requests and reports.',
      'Integrated the bot into existing web applications with Amazon’s proprietary authentication for API access.',
      'Integrated AWS QuickSight for reports on why queries were raised, feeding process automation and optimization.',
    ],
    technologies: ['Python', 'MySql', 'Javascript'],
    company: 'Amazon',
  },
  {
    id: 'vantage-bat',
    title: 'Vantage BAT',
    subtitle: 'An end-to-end build acceptance testing pipeline for Teradata Vantage on VMware',
    description:
      'Deploys a complete end-to-end Vantage cluster from pre-GCA builds to identify cross-component issues early.',
    responsibilities: [
      'Designed and implemented a POC to identify cross-component issues; created Ansible playbooks to deploy Vantage components and VMs on VMware.',
      'Containerized the application, exposed its API to run Ansible playbooks, and managed the workflow from a Jenkins job.',
      'Optimized the pipeline and reduced execution time by 40 minutes by parallelizing several stages.',
    ],
    technologies: ['Jenkins', 'Ansible', 'Python'],
    company: 'Teradata',
  },
  {
    id: 'common-test-modules',
    title: 'Common Test Development Modules',
    subtitle: 'Python modules for test development',
    description:
      'Reusable modules used across the organization to ease code maintenance, reduce dependencies, improve security, and add consolidated logging and debugging capabilities to the test framework.',
    responsibilities: [
      'Gathered requirements from various teams and implemented requested features, keeping utilities and packages up to date with security patches.',
      'Used Paramiko and PypeR to integrate SSH and R Shell interaction directly into the test framework, with support for Teradata drivers to run tests and generate reports on Teradata DB clusters.',
    ],
    technologies: ['Python'],
    company: 'Teradata',
  },
];

export const skills: SkillEntry[] = [
  { id: 'python', name: 'Python', level: 80, category: 'technical' },
  { id: 'agentic-ai', name: 'Agentic AI Stack', level: 80, category: 'technical' },
  { id: 'java', name: 'Java', level: 80, category: 'technical' },
  { id: 'js-ts-react', name: 'JS, TS, React', level: 60, category: 'technical' },
  { id: 'system-design', name: 'System Design', level: 85, category: 'technical' },
  { id: 'docker', name: 'Docker', level: 80, category: 'technical' },
  { id: 'aws', name: 'AWS', level: 80, category: 'technical' },
  { id: 'mcp-a2a', name: 'MCP & A2A Protocols', level: 70, category: 'additional' },
  { id: 'cicd', name: 'CI/CD & Infrastructure', level: 0, category: 'additional' },
  { id: 'agile', name: 'Agile Framework (SAFe)', level: 70, category: 'additional' },
  { id: 'databases', name: 'MySQL & NoSQL', level: 70, category: 'additional' },
  { id: 'protobuf', name: 'Protobuf', level: 70, category: 'additional' },
];

export const education: EducationEntry[] = [
  {
    id: 'cbit',
    institution: 'Chaitanya Bharathi Institute of Technology',
    degree: 'Bachelor of Engineering — Electronics and Communications Engineering',
    location: 'Hyderabad, India',
    startDate: 'June 2012',
    endDate: 'May 2016',
    description:
      'Graduated with a Bachelor’s degree in Electronics and Communication Engineering in 2016. Project, "Voice-Controlled Responsive Quadcopter," won the "Best Outgoing Project of the Year" award.',
  },
];

export const awards: AwardEntry[] = [
  {
    id: 'extra-mile',
    title: 'Extra Mile Award',
    description:
      'Developed a tool to notify moderators about flagged ASINs, allowing them to skip or proceed with additional checks. This enhancement increased seller trust, reduced the Inaccurate Rejection Ratio, and boosted Ad Revenue conversion.',
    date: '2023',
    issuer: 'Amazon',
  },
];
