// Resume data — source of truth: "Sumanth Jillepally.json"

export interface Contact {
  name: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  linkedin: string;
  tagline: string;
}

export interface Experience {
  company: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
}

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  company: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'technical' | 'additional';
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Award {
  title: string;
  description: string;
  date: string;
  issuer: string;
}

export const contact: Contact = {
  name: 'Sumanth Jillepally',
  phone: '+919010234192',
  phoneDisplay: '+91 90102 34192',
  email: 'sumanthjillepally@gmail.com',
  linkedin: 'https://linkedin.com/in/sumanthjillepally',
  tagline:
    'Results-oriented Software Development Engineer with 10+ years of experience in designing robust applications, cloud-native architectures, and distributed computing solutions. Proven ability to build intelligent, AI-driven systems that enhance performance, reliability, and scalability. Expertise in troubleshooting complex technical challenges, collaborating with cross-functional teams, and delivering innovative solutions aligned with business objectives. Strong advocate for continuous learning, with a focus on Agentic AI and data-driven architectures to drive technological innovation and sustainable growth.',
};

export const experiences: Experience[] = [
  {
    company: 'Electronic Arts',
    location: 'Hyderabad, India',
    position: 'Software Engineer III',
    startDate: 'October 2024',
    endDate: '',
    current: true,
    description:
      'At EA, I contributed to building scalable, high-performance event driven systems supporting cross-game integrations and the moderation and discovery lifecycle of user assets. I played a key role in advancing AI adoption across the organization by leading strategic initiatives that improved data quality, automation, and operational efficiency, while strengthening engineering standards through mentorship and cross-team collaborations.',
    responsibilities: [
      'Developed scalable, low-latency, event-driven systems for asset moderation, transformation, vectorized and semantic discovery using inference.',
      'Led AI-driven synthetic data generation initiative using Agentic AI solutions leveraging A2A and MCP protocols.',
      'Led AI-driven multi-agent test system development for automated testing of an event driven system.',
      'Led and developed a graph engine to project protobufs as JSON specs to optimise retrieval.',
      'Developed Dev Toolbox to simplify development setup and mentored junior engineers through code reviews and knowledge sharing sessions.',
    ],
  },
  {
    company: 'Amazon',
    location: 'Bangalore, India',
    position: 'Software Development Engineer',
    startDate: 'May 2021',
    endDate: 'October 2024',
    current: false,
    description:
      'At Amazon, I worked as a full stack developer and developed applications on AWS for internal teams in the Amazon Advertising domain. My prime goal was to innovate and develop applications that contribute to improving user experiences, solving customer problems and creating revenue.',
    responsibilities: [
      'Built low latency APIs operating on 10M records of data and contributed to 800K USD in savings.',
      'Developed a reusable custom workflow management tool end to end from scratch, and developed reusable code libraries to expedite future development efforts, reducing time-to-market for new features.',
      'Apart from mentoring junior developers, reduced technical debt by refactoring legacy code to improve maintainability and reduce error rates.',
      'Created proofs of concept for innovative new solutions using Amazon Q and RAG based applications to develop intelligent systems which are part of the Moderation Eco System, and also create Monthly Business Reports and analysis.',
    ],
  },
  {
    company: 'Teradata',
    location: 'Hyderabad, India',
    position: 'DevOps Engineer',
    startDate: 'February 2019',
    endDate: 'May 2021',
    current: false,
    description:
      'As part of the COE team, I worked as a DevOps engineer and application developer to build applications and solutions which served various use cases like improving developer experience and removing delivery bottlenecks. My prime goal was to innovate and improve operational excellence, developer experience, and set standards for CI/CD workflows.',
    responsibilities: [
      'Developed an intelligent Build Acceptance Testing pipeline that builds and deploys all Teradata components in a VMware environment to identify cross-component issues and generates a Build of Materials (BOM) file with the latest compatible component versions. This pipeline improved time-to-market and enabled the identification of cross-component issues.',
      'To standardize test development across QA teams, created common Python test modules with features like SSH and R shell interaction. Used Ansible for infrastructure automation, developed custom Python modules for Ansible, and created reusable Groovy libraries for Jenkins pipelines.',
    ],
  },
  {
    company: 'Infosys',
    location: 'Hyderabad, India',
    position: 'Automation Engineer',
    startDate: 'June 2016',
    endDate: 'March 2019',
    current: false,
    description:
      'As part of the Automation & DevOps team, I worked as an automation engineer and contributed to the development of automation frameworks and CI/CD workflows. My prime goal was to develop and automate CI/CD workflows in software lifecycle management and enhance software delivery.',
    responsibilities: [
      'Integrated REST API testing into a client’s existing test framework, expanded automation scope, and served as the Single Point of Contact for Continuous Integration. Developed reusable functions to automate over 500+ test cases for a stock brokerage application.',
      'Developed a proof-of-concept machine learning-based chatbot utilizing sequence-to-sequence learning to serve as a customer care representative.',
    ],
  },
];

export const projects: Project[] = [
  {
    title: 'Agentic Test System',
    subtitle: 'A multi-agent driven automated testing system for an event driven system',
    description:
      'A multi-agent-driven automated Flink job testing system. It consists of a dedicated Planning Agent responsible for preparing the test plan, scenarios and data based on the system’s knowledge and other available tools; a Manager Agent for submitting events and orchestrating the necessary validations by dispatching validation agents and aggregating the results; and Validation Agents to verify the outcomes based on the strategy defined in Run Plan artifacts and map the results back to the corresponding scenarios. Each agent operates independently and statelessly, capable of working autonomously while coordinating during the execution phase.',
    responsibilities: [
      'Spearheaded every aspect of the product lifecycle, from concept proposal to delivery. Conducted thorough research, designed, validated, developed, and delivered the entire product independently.',
      'Designed and developed multiple MCP servers, including servers for event ingestion via a GRPC service, interaction with logs, traces, run registries, Kafka consumers, OpenSearch, and various other systems that facilitate the validation of the system being tested.',
      'To mitigate LLM hallucinations and ensure consistent output, implemented stringent schema-based checks within the system. These checks embed validations natively, thereby enhancing the system’s reliability and accuracy.',
    ],
    technologies: ['Agent SDK', 'Python', 'React', 'GRPC', 'MCP'],
    company: 'Electronic Arts',
  },
  {
    title: 'Datagen AI',
    subtitle: 'An AI-driven, scalable data generation system utilizing Protobuf',
    description:
      'A data generation system that generates data based on protobufs and their relationships within a system. The data generation is agentic AI-driven, utilizing relevant MCP tools associated with system-specific agents. The entire system is logically segregated and designed based on multi-agent communication via the A2A protocol, promoting Bring Your Own Agent.',
    responsibilities: [
      'Researched, architected and spearheaded the whole system. Developed a graph engine for projecting protobuf as JSON specs.',
      'Connected with cross teams, evaluated use cases and promoted community level collaboration.',
    ],
    technologies: ['Python', 'Protobuf', 'MCP', 'A2A', 'AI'],
    company: 'Electronic Arts',
  },
  {
    title: 'Morpheus',
    subtitle: 'A comprehensive end-to-end content-agnostic discovery, ingestion and enrichment lifecycle for user content',
    description:
      'Morpheus is an end-to-end event-driven system (using Kafka and Apache Flink) that empowers game integrators, also known as game development teams, to preconfigure a schema-driven system capable of performing data transformation, enrichment, and semantic and vectorized discovery. This enables the enhancement of user experience.',
    responsibilities: [
      'Developed Flink jobs to deduplicate events from a Kafka stream as part of the Morpheus pipeline. Additionally, developed features at the ingress server to ensure the enforcement of content limitations during the ingestion of events.',
      'Developed Flink jobs to process event streams and generate vector embeddings for user content using inference models. Subsequently, these embeddings were integrated into a multi-OpenSearch cluster.',
      'Collaborated with external teams to streamline requirements and transform them into features, and developed a BaseJob abstraction to make sure all Flink jobs in the system have the same standards enforced.',
    ],
    technologies: ['Scala', 'Java', 'AWS', 'Apache Flink', 'Pekko', 'Kubernetes'],
    company: 'Electronic Arts',
  },
  {
    title: 'Dev Tool Box',
    subtitle: 'A one stop solution for all dev setup related to Morpheus development',
    description:
      'Developed and designed a command-line interface (CLI) tool that enables users to configure various tools necessary for the development of the Morpheus application. The tools encompass stacks such as Grafana, Prometheus, Kafka, OpenSearch, and OpenTelemetry. Each tool is carefully encapsulated and segregated at both network and persistent storage levels using Docker and Docker Compose.',
    responsibilities: ['Designed, owned, and developed everything single-handedly.'],
    technologies: ['Docker', 'Python'],
    company: 'Electronic Arts',
  },
  {
    title: 'Shared Libraries',
    subtitle: 'Common libraries in Java, Python and JavaScript providing easy integration of the most common features needed by team applications',
    description:
      'Created comprehensive shared libraries across multiple programming languages to standardize common functionalities and improve development efficiency across the organization.',
    responsibilities: [
      'Identified and developed packages to encapsulate the most common functionalities in a generic manner, enhancing code coverage and reusability. Notable examples: a Python package that loads a dataframe into Aurora MySQL used as an AWS Lambda layer; JavaScript AWS S3 utilities (aws-sdk v2) used in front end applications for presigned URLs, multipart download and upload; and a custom cloudAuth (OAuth 2.0-based) interceptor in Java for service-to-service calls.',
      'Developed custom Python modules for Secrets Manager, SQS, and SES to integrate AWS capabilities into Python applications. One project involved processing events from SQS and fanning them out — the Python module created for this was critical to that functionality.',
      'In TypeScript, developed reusable AWS CDK constructs that facilitated the addition of endpoint services, DNS creation, and subdomain delegations.',
    ],
    technologies: ['Java', 'Python', 'JavaScript', 'AWS', 'Lambda', 'CDK'],
    company: 'Amazon',
  },
  {
    title: 'Ignite',
    subtitle: 'A configurable workflow-based execution system to track user idea submissions',
    description:
      'Ignite is an application used to log ideas submitted by users. Each idea goes through validation, discussions, refinements, approvals and many other processes. Ignite provides all these features and more in the form of a configurable workflow. It also integrates with AWS and Amazon internal systems for proper tracing, tracking and notification to improve accountability, ownership and visibility.',
    responsibilities: [
      'Designed and built pages that allow users and admins to create, see, and download ideas, templates, and reports. Used React and TanStack to develop custom hooks, and Figma for UI mockups — encouraging the team to adopt Figma to boost standards.',
      'Designed and developed a backend microservice in Java using the REST API framework (ARest), with DocumentDB (NoSQL) as the persistent layer. Decoupled asynchronous functionality such as notifications, emails, and schedules into a separate Lambda layer, with SQS as the event source.',
      'Deployed the application to AWS ECS using the Cloud Development Kit (CDK), and created endpoint connections, DNS delegation in Route53 and other necessary infrastructure using reusable modules previously created by me.',
    ],
    technologies: ['React', 'Java', 'DocumentDB', 'AWS', 'ECS', 'Lambda'],
    company: 'Amazon',
  },
  {
    title: 'Inquest',
    subtitle: 'A Slack bot for moderator query resolution',
    description:
      'Developed a Slack bot to assist moderators in logging their queries and facilitating their resolution. The query data is used to generate insights that can be employed to optimize the process, identify knowledge gaps, and enhance the overall experience of moderators.',
    responsibilities: [
      'Developed a Slack application utilizing Slack’s Bolt framework to notify users within a designated channel by posting a custom query resolution form, using websockets to communicate with Slack’s prod grid. Channel configuration is customizable based on various data parameters, with bot commands to retrieve pending requests and extract reports.',
      'Integrated the chatbot into existing web applications, allowing users to initiate queries directly from the web app interface, authenticated via Amazon’s proprietary authentication system.',
      'Integrated AWS QuickSight to generate reports providing insights into the reasons for raising queries, and process or knowledge gaps. This data is subsequently fed into other systems for process automation and optimization.',
    ],
    technologies: ['Python', 'MySQL', 'JavaScript'],
    company: 'Amazon',
  },
  {
    title: 'Vantage BAT',
    subtitle: 'An end-to-end build acceptance testing pipeline for the analytics product Teradata Vantage on VMware',
    description:
      'Deploys a complete end-to-end Vantage cluster based on pre-GCA builds to identify cross-component issues.',
    responsibilities: [
      'Designed and implemented a proof of concept demonstrating the capability of identifying cross-component issues during the initial phase, and created Ansible playbooks to deploy the Vantage components along with virtual machines on VMware.',
      'Containerized the application and exposed its API to execute Ansible playbooks; subsequently used the APIs to manage the workflow and deploy components from a Jenkins job.',
      'Optimized the pipeline and reduced its execution time by 40 minutes by parallelizing several stages of the pipeline.',
    ],
    technologies: ['Jenkins', 'Ansible', 'Python'],
    company: 'Teradata',
  },
  {
    title: 'Common Test Modules',
    subtitle: 'Python modules for test development',
    description:
      'Reusable modules that can be utilized across the organization. This approach facilitates code maintenance, reduces dependencies on other modules, and enhances security. Consolidated logs and behavior debugging capabilities are also improved, adding enhanced capabilities to the test development framework.',
    responsibilities: [
      'Took requirements from various teams and implemented the features requested, ensuring the utilities and packages used were up to date and covered security patches.',
      'Utilized modules such as Paramiko and PypeR to seamlessly integrate capabilities like SSH and R shell interactions directly into the test framework. The module also supports Teradata drivers, facilitating test execution and report generation for tests executed on Teradata DB clusters.',
    ],
    technologies: ['Python'],
    company: 'Teradata',
  },
];

export const skills: Skill[] = [
  { name: 'Python', level: 80, category: 'technical' },
  { name: 'Agentic AI Stack', level: 80, category: 'technical' },
  { name: 'Java', level: 80, category: 'technical' },
  { name: 'JS, TS, React', level: 60, category: 'technical' },
  { name: 'System Design', level: 85, category: 'technical' },
  { name: 'Docker', level: 80, category: 'technical' },
  { name: 'AWS', level: 80, category: 'technical' },
  { name: 'MCP & A2A Protocols', level: 70, category: 'additional' },
  { name: 'CI/CD & Infrastructure', level: 0, category: 'additional' },
  { name: 'Agile Framework (SAFe)', level: 70, category: 'additional' },
  { name: 'MySQL & NoSQL', level: 70, category: 'additional' },
  { name: 'Protobuf', level: 70, category: 'additional' },
];

export const education: Education[] = [
  {
    institution: 'Chaitanya Bharathi Institute of Technology',
    degree: 'Bachelor of Engineering — Electronics and Communications Engineering',
    location: 'Hyderabad, India',
    startDate: 'June 2012',
    endDate: 'May 2016',
    description:
      'Graduated with a Bachelor’s degree in Electronics and Communication Engineering in 2016. My project, “Voice-Controlled Responsive Quadcopter”, won the prestigious “Best Outgoing Project of the Year” award.',
  },
];

export const awards: Award[] = [
  {
    title: 'Extra Mile Award',
    description:
      'Developed a tool to notify moderators about flagged ASINs, allowing them to skip or proceed with additional checks. This enhancement increased seller trust and reduced the Inaccurate Rejection Ratio, boosting ad revenue conversion.',
    date: '2023',
    issuer: 'Amazon',
  },
  {
    title: 'Best Outgoing Project of the Year',
    description: 'Awarded for “Voice-Controlled Responsive Quadcopter” — a voice-commanded drone built as the final year engineering project.',
    date: '2016',
    issuer: 'Chaitanya Bharathi Institute of Technology',
  },
];
