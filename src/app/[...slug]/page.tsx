import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Code, Zap, Shield, BookOpen, FileText, Layers, Calendar, Activity, CircleHelp, ListChecks, ArrowRightCircle, Target, BarChart3, Clock, Inbox, Star, Cloud, Gem, Rocket, Server, Lock, Lightbulb, Gauge } from "lucide-react";
import { ResearchSandbox } from "@/components/home/ResearchSandbox";
import { ArchitectureDiagram } from "@/components/home/ArchitectureDiagram";
import { ImageLightbox } from "@/components/home/ImageLightbox";

type Section = {
  title: string;
  content: string;
  code?: string;
  variant?: "star";
  group?: string;
};

type PageContent = {
  title: string;
  intro: string;
  body: string;
  images?: string[];
  sections?: Section[];
};

const contentMap: Record<string, PageContent> = {
  research: {
    title: "Research & Engineering",
    intro: "Proving enterprise grade AI through transparent architecture, rigorous verification, and measurable outcomes.",
    body: "We don't just build AI, we build systems you can trust. Every architecture we design is deterministic, verifiable, and purpose built for enterprise scale. Explore our engineering ethos through live sandboxes, architectural deep dives, and safety research.",
    sections: [
      {
        title: "Agent in Action Live Sandbox",
        content: "See our 8 agent research pipeline execute in real time. Enter any topic and watch specialized agents collaborate from keyword discovery through literature review, strategy formulation, methodology design, and final paper compilation. Every step is logged, deterministic, and verifiable.",
      },
      {
        title: "Architecture Deep Dive",
        content: "Our multi agent systems are built on LangGraph orchestration with strict verification layers. Data flows from ingestion (n8n webhooks, API integrations) through a multi agent routing layer to specialized processors, with every output validated against source material before proceeding. ChromaDB vector memory grounds all LLM responses in proprietary data, eliminating hallucination at the architectural level.",
      },
      {
        title: "Hallucination Defense Lab",
        content: "Enterprise clients fear hallucination and data leakage. Our defense in depth approach: (1) Vector anchored RAG, every LLM call is grounded in retrieved documents from ChromaDB, never relying on parametric knowledge alone. (2) Multi step verification, each agent's output is validated by the next agent in the pipeline, creating a chain of accountability. (3) Confidence thresholds, outputs below 70% confidence trigger human review fallback. (4) Audit trails, every inference is logged with source citations for full traceability.",
      },
      {
        title: "ROI of Intelligence Whitepapers",
        content: "We publish technical research connecting advanced AI architectures to tangible business outcomes.",
        code: "Multi Agent Research Automation: 8 agent pipeline generating IEEE format papers in under 90 seconds, replaces 40+ hours of manual literature review.\nAutomated Multi Temporal Data Mapping: RAG pipelines for financial time series analysis with anomaly detection.\nZero Latency Routing Architecture: Sub second intent classification for high frequency trading infrastructure.\nEnterprise RAG at Scale: Vector database sharding strategies for 10M+ document knowledge bases.",
      },
    ],
  },
  about: {
    title: "About",
    intro: "We are an AI, automation, and intelligent software services agency.",
    body: "Ace Intelligence Systems helps modern startups and enterprise organizations scale efficiently by eliminating manual operational bottlenecks. We build bespoke AI architectures and scalable cloud infrastructure, custom software solutions, not off the shelf SaaS.",
    sections: [
      {
        title: "Our Mission",
        content: "Eliminate manual operational bottlenecks by building bespoke AI architectures and scalable cloud infrastructure for modern startups and enterprises.",
      },
      {
        title: "What We Build",
        content: "Intelligent workflow automations (smart email triage, document parsing, lead routing), custom generative AI and conversational agents (enterprise RAG, multi agent workflows, support bots), and enterprise cloud infrastructure and analytics (custom dashboards, predictive AI, scalable backend APIs).",
      },
      {
        title: "Our Business Model",
        content: "We offer custom software solutions, not off the shelf SaaS products. Every deployment is purpose built for your operations.",
      },
      {
        title: "Our Team",
        content: "The founding team consists of three Artificial Intelligence & Machine Learning (AIML) students from CHARUSAT University, graduating in 2027. Ansh Gajera (CEO) drives strategic vision and business transformation. Om Choksi (CTO & Chief Architect) leads technical architecture and multi agent LLM workflows. Yash Khare (Founder) leads market positioning and RAG architecture development.",
      },
    ],
  },
  security: {
    title: "Security & AI Safety",
    intro: "Enterprise grade security meets rigorous AI safety. We prevent hallucination, secure data, and build systems you can trust.",
    body: "From infrastructure hardening to LLM hallucination defense, our security posture covers every layer. We design systems that are deterministic, verifiable, and auditable, because enterprise AI demands more than just good results.",
    sections: [
      {
        title: "AI Safety Hallucination Prevention",
        content: "Our defense in depth approach eliminates fabricated outputs at the architectural level. (1) Vector Anchored RAG: Every LLM call is grounded in retrieved documents from ChromaDB, never relying on parametric knowledge alone. (2) Multi Step Verification: Each agent's output is validated by the next agent in the pipeline, creating a chain of accountability. (3) Confidence Thresholds: Outputs below 70% confidence trigger human review fallback. (4) Full Audit Trails: Every inference is logged with source citations for complete traceability.",
      },
      {
        title: "Infrastructure Security",
        content: "All systems deployed on AWS/Azure with encryption at rest (AES 256) and in transit (TLS 1.3). Network isolation, WAF protection, and DDoS mitigation are standard. In hybrid mode, your data never leaves your network, we process only what is necessary.",
      },
      {
        title: "Access Control & Governance",
        content: "Role based access control (RBAC) with least privilege principles. Multi factor authentication required for all administrative access. Every action is logged with immutable audit trails for compliance and governance.",
      },
      {
        title: "Data Privacy & Isolation",
        content: "Client data is strictly isolated per engagement. We never train on client data, never share across projects, and never use proprietary information for model improvement. Data retention policies ensure complete purging after engagement completion.",
      },
      {
        title: "Vulnerability Management",
        content: "Continuous dependency scanning, penetration testing, and security reviews. We follow responsible disclosure practices and maintain a security contact for researchers.",
        code: "Security contact: yashco.ltd@gmail.com",
      },
    ],
  },
  "use-cases": {
    title: "Use Cases",
    intro: "See how teams apply Ace Intelligence in production.",
    body: "Explore proven patterns across finance, legal, operations, and engineering teams who use our platform for trusted automation.",
  },
  docs: {
    title: "Ace Intelligence Platform: Building for Enterprise Autonomy",
    intro: "",
    body: "",
    sections: [
      {
        title: "Introduction & Vision",
        content: "",
        group: "Platform Overview",
      },
      {
        title: "The Ace Intelligence Platform",
        content: "We engineer enterprise autonomy through bespoke AI architectures and scalable cloud infrastructure. Every solution is purpose-built for your operations, not adapted from a generic product.",
        group: "Platform Overview",
      },
      {
        title: "Our Mission",
        content: "We eliminate manual operational bottlenecks by building tailored, purpose-built software solutions rather than off-the-shelf SaaS products. We deliver production-grade AI that transforms how your team works.",
        group: "Platform Overview",
      },
      {
        title: "Commitment to Ownership",
        content: "Every deployment is custom-built for your specific operations. We provide the architecture, the documentation, and the training to ensure you own and operate your solution effectively. You get full IP rights and complete visibility into every layer of the system.",
        group: "Platform Overview",
      },
      {
        title: "Core Pillars",
        content: "",
        group: "Core Pillars",
      },
      {
        title: "Why Choose Ace?",
        content: "",
        group: "Why Choose Ace",
      },
      {
        title: "Beyond SaaS",
        content: "Unlike generic, off-the-shelf products, our solutions are architected as an extension of your team. We don't force your workflows into a predefined template. Every integration, every agent, and every dashboard is built around your unique operational DNA.",
        group: "Why Choose Ace",
      },
      {
        title: "Production-Grade Delivery",
        content: "We follow a proven methodology from Strategic Discovery and Architecture Design to secure, zero-downtime Production Deployment. We deliver real business value rather than just technical demos, with SLAs, security protocols, and knowledge transfer built into every engagement.",
        group: "Why Choose Ace",
      },
      {
        title: "Technical Reference",
        content: "",
        group: "Developer Guides",
      },
      {
        title: "Quick Start",
        content: "Connect your first workflow and begin testing with ChatPDF and our automation engine. Integrate your data sources, configure your first agent, and see results in minutes.",
        group: "Developer Guides",
      },
      {
        title: "API Overview",
        content: "Leverage our REST API to trigger workflows, manage approvals, and integrate directly with your legacy systems. Full CRUD support with webhook callbacks for event-driven architectures.",
        group: "Developer Guides",
      },
      {
        title: "Authentication",
        content: "Secure your environment using JWT tokens or OAuth (Google/GitHub), including full Role-Based Access Control (RBAC). Granular permissions let you control access at the user, team, and resource level.",
        group: "Developer Guides",
      },
      {
        title: "Deployment",
        content: "Utilize our Hybrid Deployment model to keep data within your own network for maximum privacy and compliance. Deploy on-premises or in your VPC with full data isolation.",
        group: "Developer Guides",
      },
    ],
  },
  api: {
    title: "API Reference",
    intro: "Complete API reference for developers.",
    body: "Integrate Ace Intelligence into your applications with our RESTful automation endpoints.",
    sections: [
      {
        title: "Base URL",
        content: "All API requests go through our secure endpoint.",
        code: "https://api.aceintelligence.systems/v1",
      },
      {
        title: "Rate Limits",
        content: "Request limits based on your plan.",
        code: "Business Local: Custom\nBusiness Hybrid: 300 req/min\nEnterprise: Unlimited",
      },
    ],
  },
  pricing: {
    title: "Pricing",
    intro: "Transparent pricing for every stage.",
    body: "Choose the plan that fits your enterprise needs. All plans include our core promise: trustworthy automation.",
    sections: [
      {
        title: "Business Local",
        content: "Self hosted deployment with full control. Your data never leaves your infrastructure.",
        code: "Custom pricing",
      },
      {
        title: "Business Hybrid",
        content: "Our infrastructure with your data. Best for teams wanting managed services with privacy.",
        code: "Starting at $2,000/month",
      },
      {
        title: "Enterprise",
        content: "Full scale deployment with custom integrations, SLA guarantees, and dedicated support.",
        code: "Starting at $5,000/month",
      },
    ],
  },
  projects: {
    title: "Our Products",
    intro: "AI powered tools and platforms built by Ace Intelligence.",
    body: "From workflow automation to multi modal AI agents, we build production grade systems that solve real business problems.",
    sections: [
      {
        title: "Multi Modal RAG Agent",
        content: "An intelligent chatbot system built with n8n that handles text, audio, images, and documents via Telegram. Uses Milvus vector database, Cohere embeddings, and GPT 4o mini for context aware RAG responses.",
        code: "Live demo available in the projects section",
      },
      {
        title: "ChatPDF Core",
        content: "Workflow automation platform with multi modal intake (PDF, CSV, JSON, code, audio). Role based access control included.",
        code: "Private beta",
      },
      {
        title: "Workflow Orchestration Layer",
        content: "Coordinates tasks, approvals, retries, and escalations across systems.",
        code: "Active development",
      },
      {
        title: "Automation Agent",
        content: "Executes trusted actions, tracks state, and escalates when humans need to intervene.",
        code: "Active development",
      },
      {
        title: "Enterprise Dashboard",
        content: "Next.js dashboard for managing documents, users, analytics, and access control.",
        code: "In progress",
      },
    ],
  },
  status: {
    title: "System Status",
    intro: "Current service availability and incident updates.",
    body: "We share maintenance windows and incident notes here as they happen.",
    sections: [
      {
        title: "API Status",
        content: "Public API endpoints for beta customers.",
        code: "Monitoring",
      },
      {
        title: "Recent updates",
        content: "No public incidents reported in the last 7 days.",
        code: "Last updated weekly",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro: "We protect your proprietary client data with enterprise grade privacy practices.",
    body: "Your data privacy is our foundation. As an AI services agency handling sensitive enterprise information, we maintain strict data governance across every engagement.",
    sections: [
      {
        title: "Data Handling & Confidentiality",
        content: "All client data processed during engagements is treated as strictly confidential. We implement data isolation per client, ensuring proprietary information never cross contaminates across projects. In hybrid deployment mode, your data remains on your infrastructure, we only process what is necessary to execute the workflow.",
      },
      {
        title: "Data Collection & Usage",
        content: "We collect only the minimum data required to deliver our services: project specifications, workflow configurations, and operational metadata. We never train on client data, never share proprietary information, and never use your data for model improvement unless explicitly contracted.",
      },
      {
        title: "Data Security & Encryption",
        content: "All data is encrypted at rest (AES 256) and in transit (TLS 1.3). We enforce role based access control, audit logging, and approval gates for every data operation. Our infrastructure follows SOC 2 aligned practices with continuous monitoring.",
      },
      {
        title: "Data Retention & Deletion",
        content: "Client data is retained only for the duration of the engagement plus a 30 day wind down period. Upon project completion, all client data is securely purged from our systems. You may request immediate deletion at any time.",
      },
      {
        title: "User Rights & Contact",
        content: "You have full control over your data. Request export, deletion, or policy inquiries at any time.",
        code: "Email: yashco.ltd@gmail.com",
      },
    ],
  },
  terms: {
    title: "Terms of Engagement",
    intro: "Our terms define the framework for our agency client partnerships.",
    body: "Clear, transparent terms that protect both parties and set expectations for enterprise AI engagements.",
    sections: [
      {
        title: "Engagement Scope",
        content: "Each engagement is governed by a Statement of Work (SOW) that defines deliverables, timelines, milestones, and acceptance criteria. Custom software solutions are built to the specifications agreed in the SOW, not off the shelf products.",
      },
      {
        title: "Intellectual Property",
        content: "Upon full payment, all custom code, architectures, workflows, and deliverables developed specifically for your engagement are your intellectual property. We retain the right to use generalized methodologies and frameworks that do not contain your proprietary data.",
      },
      {
        title: "Confidentiality & Non Disclosure",
        content: "We sign NDAs for all engagements. Client business logic, proprietary data, system architecture, and trade secrets are strictly confidential and will not be disclosed to third parties.",
      },
      {
        title: "Acceptable Use",
        content: "Our services must not be used for illegal activities, bypassing security measures, or mass scraping. Clients maintain responsibility for how deployed systems are used in their operations.",
      },
      {
        title: "Account Responsibilities",
        content: "Clients are responsible for providing timely access to necessary systems and stakeholders. We are responsible for delivering agreed upon milestones within the stated timeline, with transparent communication on any changes.",
      },
    ],
  },
  support: {
    title: "Support",
    intro: "Get help with Ace Intelligence products.",
    body: "Our team can help with onboarding, architecture reviews, and troubleshooting.",
    sections: [
      {
        title: "Documentation",
        content: "Browse our docs for guides, API references, and integration tutorials.",
        code: "Visit /docs",
      },
      {
        title: "FAQ",
        content: "What file types are supported? PDF, CSV, JSON, code files, and audio.\nIs there a rate limit? It depends on your plan and workload profile.\nHow do you measure answer quality? We use citations, evaluation sets, and user feedback loops.",
      },
    ],
  },
  services: {
    title: "Our Services",
    intro: "Deep engineering architectures and rapid deployment capabilities for B2B scale.",
    body: "We build custom AI, automation, and infrastructure solutions, not off the shelf SaaS. Every engagement is purpose built for your operations.",
    sections: [
      {
        title: "Intelligent Workflow Automations",
        content: "Smart Email Triage & Routing: Systems built with n8n and LLM APIs to monitor inboxes, classify intent, and route data. Automated Document Parsing: Extracting structured data from PDFs, invoices, or resumes using vision models. Zero Touch Lead Routing: Connecting web forms to CRMs to instantly draft replies and drastically reduce response times.",
      },
      {
        title: "Custom Generative AI & Conversational Agents",
        content: "Enterprise RAG Architectures: Secure pipelines allowing companies to chat with proprietary databases and SOPs without hallucination. Multi Agent Workflows: Orchestrated agents that autonomously research, reason, and execute complex tasks. Tier 1 Support Bots: Advanced chatbots that resolve user queries and escalate smoothly to human agents.",
      },
      {
        title: "Enterprise Cloud Infrastructure & Analytics",
        content: "Custom Admin Panels & Dashboards: Centralized internal tools designed to replace fragmented SaaS subscriptions. Predictive AI: Anomaly detection models for real time flagging in finance, cybersecurity, or server logs. Scalable Backend APIs: High performance backends for processing massive data streams, such as algorithmic trading operations.",
      },
    ],
  },
  contact: {
    title: "Contact Us",
    intro: "Get in touch with the Ace Intelligence team.",
    body: "Reach out for demos, partnerships, or support. We respond within 1 to 2 business days.",
    sections: [
      {
        title: "Support",
        content: "For general inquiries, enterprise sales, and technical support.",
        code: "Email: yashco.ltd@gmail.com",
      },
      {
        title: "Support",
        content: "For general inquiries, enterprise sales, and technical support.",
        code: "Email: 401anshgajera@gmail.com",
      },
      {
        title: "Support",
        content: "For general inquiries, enterprise sales, and technical support.",
        code: "Email: omchoksi.pro@gmail.com",
      },
    ],
  },
  "quick-wins/smart-inbox": {
    title: "Smart Inbox Router",
    intro: "An n8n + LLM pipeline that monitors incoming emails, classifies intent, and routes data to the right system.",
    body: "Deployed in 48 hours, this micro automation saves operational teams 10 to 20 hours per week by eliminating manual email triage.",
    images: ["/landingpage.jpeg", "/chatscreen.jpeg"],
    sections: [
      {
        title: "About the Project",
        content: "The Smart Inbox Router is a lightweight n8n workflow integrated with LLM APIs that watches a team inbox, classifies each incoming message by intent (support request, sales inquiry, billing question), and routes it to the appropriate system or person. Built and deployed in under 48 hours using Groq for low latency inference.",
        variant: "star",
      },
      { title: "Situation", content: "Support and sales teams were spending 15 to 20 hours per week manually reading, classifying, and forwarding emails from a shared inbox. High priority messages were occasionally missed, and response times were inconsistent, sometimes exceeding 24 hours for time sensitive leads.", variant: "star" },
      { title: "Task", content: "Build an automated email triage system that could: (1) monitor the inbox continuously, (2) classify intent with high accuracy, (3) route messages to the right team or CRM, and (4) be deployable within 48 hours with zero downtime.", variant: "star" },
      { title: "Action", content: "We built a pipeline using n8n as the orchestration layer, connected to the team IMAP inbox. Each email is fetched, parsed, and sent to an LLM (via Groq) for intent classification. Based on the classification, the email is either: forwarded to the appropriate Slack channel, created as a ticket in the CRM, or flagged for manual review. Confidence scores below 70% trigger a human review fallback.", variant: "star" },
      { title: "Result", content: "Email handling time dropped from 15 to 20 hours per week to under 2 hours. Lead response time improved from 24+ hours to under 5 minutes. The system achieved 94% classification accuracy on the first pass. The entire pipeline cost less than $50 per month in API usage. The team reclaimed 80% of their previous triage time.", variant: "star" },
    ],
  },
  "quick-wins/invoice-parser": {
    title: "Vendor Invoice Parser",
    intro: "Vision models that extract structured data from PDF invoices and vendor documents, automatically populating your ERP.",
    body: "Eliminates manual data entry for finance teams by turning incoming PDF invoices into structured database records automatically.",
    images: ["/landingpage.jpeg", "/chatscreen.jpeg"],
    sections: [
      {
        title: "About the Project",
        content: "The Vendor Invoice Parser uses vision language models to extract structured data from PDF invoices, receipts, and vendor documents. Fields like invoice number, date, line items, totals, and vendor details are parsed and fed directly into the ERP or accounting system, no manual typing required.",
        variant: "star",
      },
      { title: "Situation", content: "The finance team at a mid market company was manually entering data from 200 to 300 PDF invoices per week into their ERP system. Data entry errors occurred in approximately 8% of invoices, leading to reconciliation issues and delayed payments. The process consumed roughly 25 hours of staff time weekly.", variant: "star" },
      { title: "Task", content: "Develop an automated invoice parsing solution that: (1) extracts 15+ fields from diverse invoice formats, (2) achieves 95%+ extraction accuracy, (3) integrates with the existing ERP API, and (4) handles edge cases like handwritten notes and rotated PDFs.", variant: "star" },
      { title: "Action", content: "We deployed a pipeline combining OCR preprocessing (for scanned PDFs) with a vision language model for field extraction. Invoices arriving in the inbox are automatically fetched, processed, and validated. Extracted data is reviewed against confidence thresholds, high confidence entries are posted directly to the ERP, while low confidence ones are flagged for quick human review via a simple dashboard.", variant: "star" },
      { title: "Result", content: "Invoice processing time dropped from 25 hours per week to under 3 hours. Extraction accuracy reached 96.5%, reducing error related reconciliation by 90%. The system processes invoices 24/7, and the finance team now focuses on exceptions rather than data entry. Payables cycle time improved by 60%.", variant: "star" },
    ],
  },
  "quick-wins/lead-router": {
    title: "Lead Router & Responder",
    intro: "Web forms connected directly to your CRM with AI generated draft replies, reducing response time from hours to seconds.",
    body: "An instant lead response system that captures web form submissions and triggers intelligent, context aware replies.",
    images: ["/landingpage.jpeg", "/chatscreen.jpeg"],
    sections: [
      {
        title: "About the Project",
        content: "The Lead Router & Responder connects web forms to your CRM and uses LLMs to generate personalized draft replies based on the prospect's message, source, and company context. The sales team reviews and sends with one click, no more copy pasting or starting from scratch.",
        variant: "star",
      },
      { title: "Situation", content: "The sales team was receiving 50+ leads per day through website forms, live chat, and landing pages. Each lead required a manual read, research (company website, LinkedIn), and personalized reply. Average first response time was 8 hours, and 35% of leads never received a follow up.", variant: "star" },
      { title: "Task", content: "Create a zero touch lead routing and response system that: (1) captures leads from multiple web forms, (2) enriches lead data with company context, (3) generates personalized draft replies, (4) routes high value leads to specific reps, and (5) reduces first response time to under 5 minutes.", variant: "star" },
      { title: "Action", content: "We built an n8n workflow connected to webhook endpoints from multiple form providers (HubSpot, Typeform, custom forms). Each submission triggers: company enrichment via public APIs, intent scoring via an LLM, personalized draft generation based on the prospect's message and company context, and CRM creation with the draft pre populated. High scoring leads are also pushed to a dedicated Slack channel for immediate attention.", variant: "star" },
      { title: "Result", content: "First response time dropped from 8 hours to under 2 minutes. Lead to meeting conversion improved by 40%. 100% of leads now receive a reply within 24 hours. The sales team saves approximately 15 hours per week on email drafting. Enterprise tier leads are flagged and routed within 30 seconds.", variant: "star" },
    ],
  },
  "projects/multi-modal-rag": {
    title: "Multi Modal RAG Agent",
    intro: "An intelligent chatbot system built using n8n workflow automation that handles multi modal inputs from Telegram, text, audio, images, and documents.",
    body: "This project leverages Retrieval Augmented Generation (RAG) techniques to enhance AI responses with relevant information retrieved from a knowledge base. It processes multi modal inputs by converting them into embeddings, storing them in a vector database (Milvus), and providing context aware responses using advanced language models. The system maintains conversation memory for coherent interactions and supports various document formats for knowledge ingestion.",
    images: ["/multimodal_rag.png", "/multimodal_rag_2.png"],
    sections: [
      {
        title: "Live Demo",
        content: "Watch the full demo on YouTube to see the Multi Modal RAG Agent in action, processing text, images, audio, and documents via Telegram.",
        code: "YouTube: 9IqJ4VvRxxE",
      },
      {
        title: "Key Features",
        content: "Multi Modal Input Handling: Supports text, audio, images, and documents from Telegram messages. Vector Database Integration: Uses Milvus for efficient similarity search and retrieval. Advanced Embeddings: Employs Cohere's multilingual embeddings for accurate semantic understanding. Conversational Memory: Maintains context across interactions for natural conversations. Document Processing: Automatically extracts and chunks content from PDFs and other files. Real time Responses: Provides instant replies via Telegram bot interface. Scalable Architecture: Built on n8n's workflow engine for easy customization. Webhook Support: Integrated with ngrok for external API access.",
      },
      {
        title: "Architecture",
        content: "Telegram Integration: Receives messages and media from users via Telegram Bot API. Data Processing Pipeline: Extracts text from various formats (PDF, audio transcription, image OCR). Embedding Generation: Converts processed content into vector embeddings using Cohere. Vector Storage: Stores embeddings in Milvus vector database for fast retrieval. Retrieval System: Performs similarity search to find relevant context for user queries. Language Model: Uses GPT 4o mini to generate responses based on retrieved information. Response Delivery: Sends formatted replies back through Telegram. The workflow is orchestrated through n8n, providing a visual interface for monitoring and modifying the agent's behavior.",
      },
      {
        title: "Use Cases",
        content: "Customer Support: Provide instant, knowledgeable responses based on company documentation. Educational Assistant: Answer questions using uploaded textbooks, research papers, or course materials. Research Helper: Retrieve and summarize information from scientific documents. Personal Knowledge Base: Build a searchable database of personal notes, articles, and media. Content Creation: Generate responses informed by reference materials and style guides. Multilingual Support: Handle queries in multiple languages with multilingual embeddings.",
      },
      {
        title: "Tech Stack",
        content: "n8n for workflow orchestration. Milvus for vector database. Cohere for multilingual embeddings. GPT 4o mini for language model. Telegram Bot API for messaging. Docker for deployment. ngrok for webhook tunneling.",
        code: "n8n | Milvus | Cohere | GPT 4o mini | Telegram | Docker | ngrok",
      },
      {
        title: "GitHub Repository",
        content: "Explore the full source code, docker compose setup, and n8n workflow JSON on GitHub.",
        code: "https://github.com/OMCHOKSI108/AI-AUTOMATION-WORKFLOWS/tree/main/MULTI_MODEL_RAG_AGENT",
      },
      {
        title: "Team",
        content: "Built by the Ace Intelligence founding team.",
        code: "Om Choksi (CTO) — https://github.com/OMCHOKSI108\nYash Khare (Founder) — https://github.com/firefistisdead\nAnsh Gajera (CEO) — https://github.com/anshgajera",
      },
    ],
  },
  "projects/multi-agent-research": {
    title: "Multi Agent Research System",
    intro: "An advanced autonomous multi agent research platform powered by n8n orchestration. 8 specialized AI agents collaborate to transform a research topic into a comprehensive academic paper.",
    body: "Version 8.0, Production Ready, Single Unified Workflow. This system represents a sophisticated deep engineering build that automates the lifecycle of complex research. It relies on LangGraph principles to orchestrate multi agent workflows, featuring specialized discovery agents, systematic literature review capabilities, and strict hallucination reducing verification layers. The modular pipeline integrates external APIs like arXiv and Semantic Scholar alongside ChromaDB for robust vector memory and RAG.",
    images: ["/multiagent_research_demo.png", "/multiagent_research_n8n_flow.png"],
    sections: [
      {
        title: "Live Demo",
        content: "The system runs as a unified n8n workflow. Submit a research topic via the frontend, and 8 agents autonomously execute the full research lifecycle.",
      },
      {
        title: "8 Specialized Agents",
        content: "Orchestrator: State initialization and management via Code Node. Keyword Generator: Academic search keyword generation using LLaMA 3.3 70B. Researcher: Literature search and discovery via HTTP/API. Strategist: Gap identification and research strategy using LLaMA 3.3 70B. Architect: Methodology design using LLaMA 3.3 70B. Implementer: Data and implementation planning using LLaMA 3.3 70B. Analyst: Experiment design using LLaMA 3.3 70B. Editor: Final paper compilation using LLaMA 3.3 70B.",
      },
      {
        title: "Agent Pipeline",
        content: "Phase 1, Initialization: Webhook trigger receives topic from frontend, initializes research state. Phase 2, Research Intelligence (Agents 1 to 3): Keyword generation, web search via DuckDuckGo, literature review with theme identification. Phase 3, Strategy and Methodology (Agents 4 to 5): Gap statement formulation, research questions, methodology design. Phase 4, Implementation and Experiments (Agents 6 to 7): Data requirements planning, experimental framework design. Phase 5, Quality and Compilation (Agents 7 to 8): Novelty and ethics validation, IEEE format paper generation. Phase 6, Response: JSON formatted output with complete paper and execution metadata.",
      },
      {
        title: "Premium Frontend",
        content: "Modern glassmorphism design with real time agent progress visualization. Markdown rendering with syntax highlighting, copy and download functionality, and fully responsive design.",
      },
      {
        title: "API Reference",
        content: "Endpoint: POST http://localhost:5678/webhook/start-research. Request body: { 'topic': 'Your Research Topic' }. Response includes the full generated paper content, execution time, agents executed, and phase completion status.",
        code: "POST /webhook/start-research\nRequest: { \"topic\": \"Your Topic\" }\nResponse: { \"success\": true, \"content\": \"# Paper...\", \"metadata\": { \"executionTimeSeconds\": 90, \"agentsExecuted\": 8 } }",
      },
      {
        title: "Business Value",
        content: "This project serves as our ultimate proof of technical capability. While rapid deployment automations act as the 'Trojan Horse' for initial trust, this system is the high ticket upsell. It proves to enterprise organizations that we can move beyond simple chatbots to deploy autonomous agents that research, reason, verify facts, and execute multi step tasks securely at scale. Falls under our Custom Generative AI & Conversational Agents category, a flagship example for Multi Agent Workflows and Enterprise RAG Architectures.",
      },
      {
        title: "GitHub Repository",
        content: "Explore the full n8n workflow JSON, frontend code, and deployment configuration.",
        code: "https://github.com/OMCHOKSI108/AI-AUTOMATION-WORKFLOWS",
      },
      {
        title: "Team",
        content: "Built by the Ace Intelligence founding team.",
        code: "Om Choksi (CTO) — https://github.com/OMCHOKSI108\nYash Khare (Founder) — https://github.com/firefistisdead\nAnsh Gajera (CEO) — https://github.com/anshgajera",
      },
    ],
  },
  "projects/chatpdf": {
    title: "ChatPDF",
    intro: "A full-stack document intelligence platform with RAG chat, async ingestion, multi-document support, and organization APIs.",
    body: "ChatPDF is a document intelligence platform that automates intake, routing, approvals, and follow-ups so teams can move faster with full visibility. Built with Next.js, FastAPI, Redis, PostgreSQL, Qdrant, and a voice pipeline (STT/TTS).",
    images: ["/landingpage.jpeg", "/chatscreen.jpeg"],
    sections: [
      {
        title: "Live Site",
        content: "ChatPDF is currently in private beta.",
        code: "https://chatpdf.vercel.app",
      },
      {
        title: "Key Features",
        content: "Automated intake, triage, and routing for requests. Workflow state tracking with durable audit logs. Reusable automation steps with approval gates. APIs for system-to-system workflow triggers. Operator inbox with human-in-the-loop reviews. Role-based access and approval policies. Operational dashboards for throughput and exceptions.",
      },
      {
        title: "Tech Stack",
        content: "Next.js for the frontend and admin console. FastAPI for the backend API. Redis for the job queue. PostgreSQL for persistence. Qdrant for vector search. STT/TTS pipeline for voice chat support.",
        code: "Next.js | FastAPI | Redis | PostgreSQL | Qdrant | STT/TTS",
      },
      {
        title: "Team",
        content: "Built by the Ace Intelligence founding team.",
        code: "Om Choksi (CTO) — https://github.com/OMCHOKSI108\nYash Khare (Founder) — https://github.com/firefistisdead\nAnsh Gajera (CEO) — https://github.com/anshgajera",
      },
    ],
  },
  "projects/pralay-ai": {
    title: "PralayAI — Defensive Cybersecurity AI Assistant",
    intro: "A full-stack defensive cybersecurity chatbot built with a fine-tuned open-source LLM (Qwen2.5 1.5B, QLoRA), FastAPI backend, PostgreSQL chat persistence, and a React Gemini-clone frontend.",
    body: "PralayAI is a cybersecurity-focused AI assistant designed to help students, developers, and security learners understand defensive cybersecurity workflows. The system uses a fine-tuned Qwen2.5 1.5B Instruct model trained with QLoRA on a curated cybersecurity instruction dataset. The model is deployed via dual inference paths — a local CUDA API for fast development and a public Hugging Face Space for demos — and served through a FastAPI backend with PostgreSQL persistence and a React frontend.",
    images: ["/pralay.png"],
    sections: [
      {
        title: "Quick Start",
        content: "Clone the repo, install dependencies, configure your environment, and launch all 3 services with a single startup script.",
        code: "git clone https://github.com/OMCHOKSI108/pralayAI\ncd pralayAI\npython -m venv .venv && source .venv/bin/activate\npip install -r requirements.txt\n./start.sh\n# Starts: Inference API (:5000) | Backend (:8000) | Frontend (:5173)",
      },
      {
        title: "Model Architecture",
        content: "PralayAI is built on Qwen2.5 1.5B Instruct, fine-tuned with QLoRA using the Unsloth framework on a cybersecurity conversational instruction dataset. The LoRA adapter is merged with the base model for deployment. The model repository and adapter are published on Hugging Face for reproducibility.",
        code: "Base Model: Qwen/Qwen2.5-1.5B-Instruct\nFine-tuning: Unsloth + QLoRA\nAdapter: OMCHOKSI108/Paralay1.1\nMerged Model: OMCHOKSI108/Paralay1.1-Merged\nDataset: OMCHOKSI108/cybersecdata\nInference API: omchoksi108-pralayai-inference-api.hf.space/generate",
      },
      {
        title: "System Architecture",
        content: "The system follows a four-component architecture: React Gemini-clone frontend sends user messages to the FastAPI backend, which persists conversations in PostgreSQL and routes inference requests to either the local CUDA inference API (port 5000, ~4.5s latency) or the Hugging Face Space CPU API (~54s latency). The model generates a defensive cybersecurity response, which is saved and returned through the backend to the frontend.",
        code: "React Frontend (:5173)\n       │\n       ▼\nFastAPI Backend (:8000) ──► PostgreSQL\n       │\n       ├── Local CUDA API (:5000) ──► Merged Model\n       │         (~4.5s on GPU)\n       └── HF Space API (cloud) ──► Merged Model\n                 (~54s on CPU)",
      },
      {
        title: "Safety & Evaluation",
        content: "PralayAI includes a strict defensive-only safety policy. The model is trained to refuse requests involving phishing, credential theft, malware creation, ransomware, reverse shells, and evasion techniques. An automated evaluation notebook runs 8 defensive queries and 5 adversarial safety prompts, scoring responses on keyword coverage, structure, depth, and refusal quality.",
        code: "Defensive Use Cases:\n  Incident Response | Log Analysis | Threat Detection\n  MITRE ATT&CK Mapping | Cloud Security | Malware Defense\n  Security Awareness | Hardening Guidance\n\nBlocked Topics:\n  Phishing | Credential Theft | Malware | Ransomware\n  Reverse Shells | Evasion | Exploitation",
      },
      {
        title: "API & Inference",
        content: "The backend exposes a single POST /api/chat endpoint that accepts a message, optional conversation_id, and generation parameters. It applies safety filtering, routes to the inference engine, and returns a structured response with the assistant message, latency, and source. The inference API is also directly callable for testing.",
        code: "POST /api/chat\n{\n  \"message\": \"Explain incident response in 5 steps.\",\n  \"conversation_id\": null,\n  \"max_new_tokens\": 300,\n  \"temperature\": 0.7\n}\n\nResponse: {\n  \"assistant_message\": \"...\",\n  \"conversation_id\": \"uuid\",\n  \"latency_seconds\": 4.5,\n  \"source\": \"local-cuda\"\n}",
      },
      {
        title: "Dataset & Training",
        content: "The model was fine-tuned on a curated cybersecurity conversational dataset covering incident response, log analysis, malware defense, cloud security, and MITRE ATT&CK explanations. Training used QLoRA for memory efficiency, with loss convergence tracked across fine-tuning steps. The model training summary and safety evaluation scores are documented in the repo.",
      },
      {
        title: "Tech Stack",
        content: "Python powers the fine-tuning pipeline with Unsloth and QLoRA. FastAPI serves the backend with SQLAlchemy + PostgreSQL for persistence. React with Vite provides the Gemini-clone frontend. Hugging Face handles model hosting and public inference. Local CUDA inference runs via a Flask wrapper.",
        code: "Python | FastAPI | React | Vite | PostgreSQL | Qwen2.5 | QLoRA | Unsloth | Hugging Face | Docker",
      },
      {
        title: "GitHub Repository",
        content: "Full source code including the fine-tuning notebook, model merge script, HF Space deployment configuration, FastAPI backend, React frontend, and comprehensive evaluation notebook.",
        code: "https://github.com/OMCHOKSI108/pralayAI",
      },
      {
        title: "Team",
        content: "Built by the Ace Intelligence founding team.",
        code: "Om Choksi (CTO) — https://github.com/OMCHOKSI108",
      },
    ],
  },
  "projects/trade-like-whale": {
    title: "Autonomous Algo Trading Bot",
    intro: "Production-ready automated trading platform combining ensemble strategies, LSTM prediction, and reinforcement learning — validated on 10,000 candles with $77K+ portfolio profit.",
    body: "TradeLikeWhale is an enterprise-grade trading system that orchestrates multiple signal sources — technical indicators, neural networks, and a reinforcement learning agent — into a unified trading engine. The platform features a React dashboard for real-time monitoring, a FastAPI backend for strategy management, PostgreSQL for trade persistence, and direct MetaTrader 5 integration for live execution.",
    images: ["/Tradinview_strategy.png"],
    sections: [
      {
        title: "Quick Start",
        content: "Clone the repo, install dependencies, configure your MT5 credentials, and launch the full stack with Docker Compose.",
        code: "git clone https://github.com/OMCHOKSI108/TradeLikeWhale\ncd TradeLikeWhale\npip install -r requirements.txt\ncp .env.example .env\n# Configure MT5_LOGIN, MT5_PASSWORD, MT5_SERVER in .env\npython run.py",
      },
      {
        title: "Architecture Flow",
        content: "The system is built as a four-layer pipeline: Data Ingestion (MT5 live feed, historical CSV, database cache) → Signal Generation (technical indicators, LSTM prediction, RL agent optimization, ensemble voting) → Risk Management (ATR sizing, drawdown limits, position validation) → Execution & Monitoring (MT5 order execution, trade logging, React dashboard, alert system). Each layer is decoupled and independently testable.",
        code: "DATA LAYER\n  MT5 Live Feed ─┐\n  Historical CSV ─┼──> Data Processor\n  Database Cache ─┘        │\n                           v\nSIGNAL LAYER\n  Technical Indicators (ADX, RSI, MACD, BB) ─┐\n  LSTM Neural Network (price prediction)  ───┼──> Ensemble Voting → Signal\n  RL Agent (adaptive optimization)        ───┘\n                           │\n                           v\nRISK LAYER\n  ATR Position Sizing ─┐\n  Daily Loss Limits  ──┼──> Risk Check → Approved/Rejected\n  Drawdown Monitor   ──┘\n                           │\n                           v\nEXECUTION LAYER\n  MT5 Order Execution → Trade Logger → PostgreSQL\n                           │\n                           v\n  React Dashboard ← FastAPI ← Trade History\n  Alert System    ← WebSocket ← Real-time P&L",
      },
      {
        title: "Multi-Strategy Engine",
        content: "Ensemble voting combines four technical indicators (ADX for trend strength, Stochastic for momentum, RSI for overbought/oversold, MACD for trend direction, Bollinger Bands for volatility) with ML predictions. Each signal is weighted and voted into a final trade decision. The RL agent continuously adapts weights based on market regime changes.",
      },
      {
        title: "ML & Reinforcement Learning",
        content: "LSTM neural networks are trained per symbol and timeframe to predict short-term price movements. A reinforcement learning agent (PPO-based) optimizes strategy parameters in real time, adjusting position sizing and signal thresholds as market conditions evolve. Models are retrained periodically using the latest market data to prevent drift.",
      },
      {
        title: "Risk & Position Management",
        content: "ATR-based dynamic stop-loss and take-profit levels adjust automatically to market volatility. Daily loss limits halt trading after a configurable threshold. Drawdown protection monitors equity curves in real time and triggers an emergency stop if drawdown exceeds the configured limit. Position sizing supports fixed %, volatility-adjusted, and fixed USD methods.",
        code: "Risk Parameters:\n  Daily loss limit: $500\n  Max drawdown: 10%\n  Position sizing: volatility_adjusted\n  Risk/reward ratio: 2.0\n  Max open positions: 5",
      },
      {
        title: "Validated Performance",
        content: "Walk-forward validation using 70% train / 30% test split on 10,000 historical candles per symbol. Best performers are USDJPY and BTCUSD on the 15-minute timeframe, showing consistent out-of-sample performance and positive Sharpe ratios across all tested instruments.",
        code: "Symbol    | Timeframe | Profit  | Win Rate | Sharpe\nUSDJPY    | 15min     | $6,118  | 55.4%    | 1.87\nBTCUSD    | 15min     | $3,261  | 61.2%    | 2.14\nEURUSD    | 4hr       | $769    | 56.9%    | 1.52\nGBPUSD    | 4hr       | $231    | 53.8%    | 1.28\n─────────────────────────────────────────────\nTotal: $77,256.74 across all strategies",
      },
      {
        title: "Frontend Dashboard",
        content: "Built with React and Next.js, the dashboard provides real-time monitoring of balance, equity, P&L, and margin levels. Users can configure and activate strategies, view trade history with performance analytics, modify TP/SL on open positions, and receive alerts for trades, risks, and system events. Plotly charts display equity curves and symbol breakdowns.",
      },
      {
        title: "API Layer",
        content: "FastAPI backend with JWT authentication exposes RESTful endpoints for strategy management, trade history, performance metrics, and system control. Full OpenAPI documentation is available at /docs. The API supports multi-user access with role-based permissions.",
        code: "POST /token          — Login\nGET  /api/status      — Bot status & stats\nPOST /api/control     — Start/stop bot\nGET  /api/positions   — Active positions\nGET  /api/strategies  — List strategies\nPOST /api/strategies  — Create strategy\nGET  /api/history/trades — Trade history",
      },
      {
        title: "Tech Stack",
        content: "Python powers the core trading engine with TensorFlow for LSTM models. FastAPI serves the REST API. React/Next.js renders the dashboard. MetaTrader 5 handles live execution. PostgreSQL persists all trade and strategy data. Docker Compose orchestrates the full stack deployment.",
        code: "Python | FastAPI | React | Next.js | MetaTrader 5 | TensorFlow | PostgreSQL | Docker | Redis | Streamlit",
      },
      {
        title: "GitHub Repository",
        content: "The full source code is available on GitHub. Note: The repository is currently private to protect proprietary trading strategies and client data. Contact us for access or a demo.",
        code: "https://github.com/OMCHOKSI108/TradeLikeWhale — Private (contact for access)",
      },
      {
        title: "Team",
        content: "Built by the Ace Intelligence founding team.",
        code: "Om Choksi (CTO) — https://github.com/OMCHOKSI108\nYash Khare (Founder) — https://github.com/firefistisdead\nAnsh Gajera (CEO) — https://github.com/anshgajera",
      },
    ],
  },
  whitepapers: {
    title: "ROI Whitepapers",
    intro: "Technical research connecting advanced AI architectures to tangible business outcomes.",
    body: "Our whitepapers bridge deep technical capability and strategic vision. They demonstrate that we understand the underlying math, data pipelines, and infrastructure, and how those systems save operational teams 20 hours a week or eliminate manual bottlenecks.",
    sections: [
      {
        title: "Multi Agent Research Automation",
        content: "8 agent pipeline generating IEEE format academic papers in under 90 seconds, replacing 40+ hours of manual literature review. Autonomous discovery, verification, and compilation with zero hallucination.",
        code: "View the live demo in the projects section",
      },
      {
        title: "Automated Multi Temporal Data Mapping",
        content: "RAG pipelines for financial time series analysis with real time anomaly detection. Processes streaming data through vectorized memory for instant pattern recognition in trading infrastructure.",
      },
      {
        title: "Zero Latency Routing in Trading Infrastructure",
        content: "Sub second intent classification architecture for high frequency trading systems. Built on n8n orchestration with LLM based routing, achieving 94% classification accuracy with under 50ms overhead.",
      },
      {
        title: "Enterprise RAG at Scale",
        content: "Vector database sharding strategies for 10M+ document knowledge bases. Comparative analysis of ChromaDB, Qdrant, and Milvus for enterprise retrieval augmented generation workloads.",
      },
      {
        title: "Hallucination Defense: A Practical Framework",
        content: "Production tested methodology for eliminating LLM hallucination in enterprise deployments. Covers vector anchoring, multi step verification chains, confidence thresholding, and audit trail implementation.",
      },
    ],
  },
  "projects/food-delivery-agent": {
    title: "AI Powered Food Delivery Agent",
    intro: "A two way conversational AI agent that handles customer inquiries, processes food orders, and logs data to Google Sheets, autonomously via Telegram and WhatsApp.",
    body: "This legacy demo showcases a complete two way conversational automation designed for local businesses, cloud kitchens, and mid sized restaurant chains. Customers text their orders naturally via WhatsApp or Telegram. An n8n workflow engine catches the messages via webhook, an LLM processes the natural language to determine intent (menu inquiry, order placement, delivery status), and Google Sheets acts as a lightweight backend, reading menu and pricing data and writing confirmed orders.",
    images: ["/FoodDeliverySystem_1.png", "/FoodDeliverySysten_2.png"],
    sections: [
      {
        title: "Live Demo",
        content: "Watch the AI Food Delivery Agent in action, taking orders via Telegram and logging data to Google Sheets in real time.",
        code: "YouTube: 5FqX0imKBbs",
      },
      {
        title: "How It Works",
        content: "1. Customer Interface: WhatsApp and Telegram channels where customers text their orders naturally. 2. Orchestrator (Middleware): n8n workflow engine catches incoming messages via webhooks. 3. The Brain (AI Agent): LLM API processes natural language to determine user intent, menu inquiry, order placement, or delivery status check. 4. Database (Backend): Google Sheets acts as a lightweight, visible internal database. The AI reads menu and pricing data and writes confirmed orders with customer details.",
      },
      {
        title: "Service Category",
        content: "Custom Generative AI & Conversational Agents, specifically Tier 1 Support Bots. Difficulty: Tier 2 (Core Automations). This is more advanced than a one way data push because it manages two way conversational state.",
      },
      {
        title: "The Pitch Strategy",
        content: "The Hook: Approach a business owner spending hours manually answering WhatsApp messages or phone calls for orders. The Pitch: Show them the demo demonstrating an AI instantly taking orders via Telegram and dropping formatted data into a Google Sheet for the kitchen staff. The Trust & Upsell: Once they see the immediate ROI, upsell into a Tier 3 Voice AI Receptionist for phone calls, or upgrade the Google Sheets backend into a Tier 4 Custom ERP Internal Tooling dashboard.",
      },
      {
        title: "Tech Stack",
        content: "n8n for workflow orchestration and webhook management. LLM API for natural language intent processing. Telegram Bot API and WhatsApp Business API for messaging. Google Sheets API for reading menu data and logging orders.",
        code: "n8n | LLM API | Telegram API | WhatsApp API | Google Sheets",
      },
      {
        title: "Team",
        content: "Built by the Ace Intelligence founding team.",
        code: "Om Choksi (CTO) — https://github.com/OMCHOKSI108\nYash Khare (Founder) — https://github.com/firefistisdead\nAnsh Gajera (CEO) — https://github.com/anshgajera",
      },
    ],
  },
  templates: {
    title: "Project Templates",
    intro: "Accelerators that help teams ship automation faster.",
    body: "Our templates package common patterns for intake, approvals, and execution so you can move from prototype to production with fewer surprises.",
    sections: [
      {
        title: "Starter kits",
        content: "Opinionated setups for Next.js + API backends with workflow orchestration and approvals.",
        code: "Available on request",
      },
      {
        title: "Integration blueprints",
        content: "Reference integrations for storage, auth, and operational systems used in production.",
        code: "Contact us for access",
      },
    ],
  },
};

const metricPattern = /\$?\d[\d,.]*\+?%?(?:\s?(?:to|-)\s?\$?\d[\d,.]*\+?%?)?(?:\s?(?:hours?|minutes?|seconds?|days?|weeks?|months?|req\/min))?/;

function highlightMetric(text: string): React.ReactNode {
  const match = text.match(metricPattern);
  if (!match || match.index === undefined) return text;
  const start = match.index;
  const end = start + match[0].length;
  return (
    <>
      {text.slice(0, start)}
      <strong className="font-semibold text-slate-900">{text.slice(start, end)}</strong>
      {text.slice(end)}
    </>
  );
}

function splitIntoPoints(text: string): string[] {
  const numbered = text
    .split(/\(\d+\)\s*/)
    .map((part) => part.trim().replace(/[,.]$/, ""))
    .filter(Boolean);
  if (numbered.length > 1) return numbered;

  return text
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function formatTitleFromSlug(slug: string[]): string {
  return slug
    .map((part) => part.replace(/-/g, " "))
    .join(" / ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const key = slug.join("/");
  const content = contentMap[key] ?? {
    title: formatTitleFromSlug(slug),
    intro: "We&apos;re preparing this page and will publish more detail soon.",
    body: "If you&apos;re looking for something specific, reach out and we&apos;ll point you to the right resources.",
  };

  const sidebarNav = key === "docs" ? [
    { label: "Platform Overview", groups: ["Platform Overview"], items: [
      { label: "Introduction & Vision", href: "#introduction-vision" },
    ]},
    { label: "Core Pillars", groups: ["Core Pillars"], items: [
      { label: "Core Pillars", href: "#core-pillars" },
    ]},
    { label: "Why Choose Ace", groups: ["Why Choose Ace"], items: [
      { label: "Why Choose Ace?", href: "#why-choose-ace" },
    ]},
    { label: "Developer Guides", groups: ["Developer Guides"], items: [
      { label: "Technical Reference", href: "#technical-reference" },
      { label: "Quick Start", href: "#quick-start" },
      { label: "API Overview", href: "#api-overview" },
      { label: "Authentication", href: "#authentication" },
      { label: "Deployment", href: "#deployment" },
    ]},
  ] : null;

  function renderSection(section: Section, idx: number, key: string, content: PageContent) {
    if (section.variant === "star" && section.title === "About the Project") {
      return (
        <div key={idx} className="border border-blue-200 bg-blue-50/30 rounded-xl overflow-hidden">
          <div className="bg-blue-50 px-5 py-4 border-b border-blue-200">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2">
              <FileText size={18} className="text-blue-600" />
              {section.title}
            </h3>
          </div>
          <div className="px-5 py-4">
            <p className="text-sm text-slate-700 leading-relaxed">{section.content}</p>
          </div>
          {section.code && (
            section.code.startsWith("YouTube:") ? (
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${section.code.replace("YouTube: ", "")}`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : section.code.startsWith("https://github.com") ? (
              <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm font-mono">
                <code>
                  <a href={section.code} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                    {section.code}
                  </a>
                </code>
              </pre>
            ) : (
              <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm font-mono">
                <code>{section.code}</code>
              </pre>
            )
          )}
        </div>
      );
    }
    if (section.variant === "star") {
      const starIcons: Record<string, React.ReactNode> = {
        "Situation": <CircleHelp size={18} className="text-amber-600" />,
        "Task": <ListChecks size={18} className="text-blue-600" />,
        "Action": <ArrowRightCircle size={18} className="text-violet-600" />,
        "Result": <Target size={18} className="text-green-600" />,
      };
      const starColors: Record<string, string> = {
        "Situation": "bg-amber-50 border-amber-200",
        "Task": "bg-blue-50 border-blue-200",
        "Action": "bg-violet-50 border-violet-200",
        "Result": "bg-green-50 border-green-200",
      };
      const starHeading: Record<string, string> = {
        "Situation": "text-amber-900",
        "Task": "text-blue-900",
        "Action": "text-violet-900",
        "Result": "text-green-900",
      };
      return (
        <div key={idx} className={`border ${starColors[section.title] || "border-slate-200"} rounded-xl overflow-hidden`}>
          <div className="px-5 py-4">
            <h3 className={`font-semibold ${starHeading[section.title] || "text-slate-900"} flex items-center gap-2 mb-3`}>
              {starIcons[section.title] || null}
              {section.title}
            </h3>
            <ul className="space-y-2">
              {splitIntoPoints(section.content).map((point, pointIdx) => (
                <li key={pointIdx} className="flex items-start gap-2 text-sm text-slate-700 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-50 flex-shrink-0" />
                  <span>{highlightMetric(point)}</span>
                </li>
              ))}
            </ul>
          </div>
          {section.code && (
            <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm font-mono">
              <code>{section.code}</code>
            </pre>
          )}
        </div>
      );
    }

    if (key === "docs" && section.title === "Introduction & Vision") {
      return (
        <div key={idx} id="introduction-vision" className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-blue-200">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2 text-lg">
              <BookOpen size={20} className="text-blue-600" />
              Introduction &amp; Vision
            </h3>
          </div>
          <div className="p-6 space-y-5">
            {[
              { title: "The Ace Intelligence Platform", icon: Gem, desc: "We engineer enterprise autonomy through bespoke AI architectures and scalable cloud infrastructure. Every solution is purpose-built for your operations, not adapted from a generic product." },
              { title: "Our Mission", icon: Target, desc: "We eliminate manual operational bottlenecks by building tailored, purpose-built software solutions rather than off-the-shelf SaaS products. We deliver production-grade AI that transforms how your team works." },
              { title: "Commitment to Ownership", icon: Shield, desc: "Every deployment is custom-built for your specific operations. We provide the architecture, the documentation, and the training to ensure you own and operate your solution effectively. You get full IP rights and complete visibility into every layer of the system." },
            ].map((item, ii) => (
              <div key={ii} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <item.icon size={18} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                  <p className="text-sm text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (key === "docs" && section.title === "Core Pillars") {
      return (
        <div key={idx} id="core-pillars" className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50/60 to-white shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-blue-200">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2 text-lg">
              <Target size={20} className="text-blue-600" />
              Core Pillars
            </h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 p-5">
            {[
              { title: "Operational Efficiency", desc: "We reduce manual labor through intelligent automation workflows, including email triage, automated document parsing, and lead routing.", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
              { title: "Bespoke Intelligence", desc: "We architect custom generative AI and conversational agents, specializing in enterprise RAG and complex multi-agent workflows designed around your unique business logic.", icon: Lightbulb, color: "text-violet-600", bg: "bg-violet-50" },
              { title: "Scalability & Control", desc: "Our infrastructure supports your growth with custom dashboards, predictive AI models, and scalable backend APIs that integrate seamlessly with your existing systems.", icon: Gauge, color: "text-emerald-600", bg: "bg-emerald-50" },
            ].map((goal, gi) => (
              <div key={gi} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-lg ${goal.bg} flex items-center justify-center mb-3`}>
                  <goal.icon size={20} className={goal.color} />
                </div>
                <h4 className="font-semibold text-slate-900 text-sm mb-2">{goal.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{goal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (key === "docs" && section.title === "Why Choose Ace?") {
      return (
        <div key={idx} id="why-choose-ace" className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-indigo-200">
            <h3 className="font-semibold text-indigo-900 flex items-center gap-2 text-lg">
              <Gem size={20} className="text-indigo-600" />
              Why Choose Ace?
            </h3>
          </div>
          <div className="p-6 grid sm:grid-cols-2 gap-5">
            {[
              { title: "Beyond SaaS", icon: Zap, desc: "Unlike generic, off-the-shelf products, our solutions are architected as an extension of your team. We don't force your workflows into a predefined template. Every integration, every agent, and every dashboard is built around your unique operational DNA." },
              { title: "Production-Grade Delivery", icon: Shield, desc: "We follow a proven methodology from Strategic Discovery and Architecture Design to secure, zero-downtime Production Deployment. We deliver real business value rather than just technical demos, with SLAs, security protocols, and knowledge transfer built into every engagement." },
            ].map((item, ii) => (
              <div key={ii} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mb-3">
                  <item.icon size={18} className="text-indigo-600" />
                </div>
                <h4 className="font-semibold text-slate-900 text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (key === "docs" && section.title === "Technical Reference") {
      return (
        <div key={idx} id="technical-reference" className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2 text-lg">
              <Code size={20} className="text-slate-600" />
              Technical Reference
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-6 py-3 font-medium text-slate-700 w-48">Section</th>
                  <th className="text-left px-6 py-3 font-medium text-slate-700">Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { section: "Quick Start", focus: "Connect your first workflow and begin testing with ChatPDF and our automation engine.", icon: Rocket, color: "text-sky-600" },
                  { section: "API Overview", focus: "Leverage our REST API to trigger workflows, manage approvals, and integrate directly with your legacy systems.", icon: Code, color: "text-emerald-600" },
                  { section: "Authentication", focus: "Secure your environment using JWT tokens or OAuth (Google/GitHub), including full Role-Based Access Control (RBAC).", icon: Lock, color: "text-amber-600" },
                  { section: "Deployment", focus: "Utilize our Hybrid Deployment model to keep data within your own network for maximum privacy and compliance.", icon: Server, color: "text-violet-600" },
                ].map((row, ri) => (
                  <tr key={ri} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <row.icon size={16} className={row.color} />
                        <span className="font-medium text-slate-900">{row.section}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{row.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    const sectionIcons: Record<string, React.ReactNode> = {
      "The Ace Intelligence Platform": <Gem size={20} className="text-blue-600" />,
      "Our Mission": <Target size={20} className="text-emerald-600" />,
      "Commitment to Ownership": <Shield size={20} className="text-violet-600" />,
      "Beyond SaaS": <Zap size={20} className="text-indigo-600" />,
      "Production-Grade Delivery": <Shield size={20} className="text-indigo-600" />,
      "Quick Start": <Rocket size={20} className="text-sky-600" />,
      "API Overview": <Code size={20} className="text-emerald-600" />,
      "Authentication": <Lock size={20} className="text-amber-600" />,
      "Deployment": <Server size={20} className="text-violet-600" />,
    };
    const sectionColors: Record<string, string> = {
      "The Ace Intelligence Platform": "border-blue-200 bg-white",
      "Our Mission": "border-emerald-200 bg-white",
      "Commitment to Ownership": "border-violet-200 bg-white",
      "Beyond SaaS": "border-indigo-200 bg-white",
      "Production-Grade Delivery": "border-indigo-200 bg-white",
      "Quick Start": "border-sky-200 bg-white",
      "API Overview": "border-emerald-200 bg-white",
      "Authentication": "border-amber-200 bg-white",
      "Deployment": "border-violet-200 bg-white",
    };
    const sectionBodyColors: Record<string, string> = {
      "The Ace Intelligence Platform": "text-slate-600",
      "Our Mission": "text-slate-600",
      "Commitment to Ownership": "text-slate-600",
      "Beyond SaaS": "text-slate-600",
      "Production-Grade Delivery": "text-slate-600",
      "Quick Start": "text-slate-600",
      "API Overview": "text-slate-600",
      "Authentication": "text-slate-600",
      "Deployment": "text-slate-600",
    };
    const cardColor = sectionColors[section.title] || "border-slate-200 bg-white";
    const icon = sectionIcons[section.title] || null;
    const bodyColor = sectionBodyColors[section.title] || "text-slate-600";
    const sectionId = section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return (
      <div key={idx} id={sectionId} className={`rounded-xl border ${cardColor} shadow-sm hover:shadow-md transition-all duration-200`}>
        <div className="flex items-start gap-4 p-5">
          {icon && (
            <div className="flex-shrink-0 mt-0.5">{icon}</div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900">{section.title}</h3>
            {section.content && (
              <p className={`text-sm ${bodyColor} mt-1 leading-relaxed`}>{section.content}</p>
            )}
          </div>
        </div>
        {section.code && (
          section.code.startsWith("YouTube:") ? (
            <div className="aspect-video w-full border-t border-inherit">
              <iframe
                src={`https://www.youtube.com/embed/${section.code.replace("YouTube: ", "")}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : section.code.startsWith("Email:") ? (
            <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm font-mono">
              <code>
                <a href={`mailto:${section.code.replace("Email: ", "")}`} className="hover:text-blue-300 transition-colors">
                  {section.code}
                </a>
              </code>
            </pre>
          ) : section.code.startsWith("https://github.com") ? (
            <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm font-mono">
              <code>
                <a href={section.code} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                  {section.code}
                </a>
              </code>
            </pre>
          ) : (
            <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm font-mono">
              <code>{section.code}</code>
            </pre>
          )
        )}
      </div>
    );
  }

  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm p-8 sm:p-10 shadow-sm">
        <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase mb-3">Ace Intelligence</p>
        <h1 className="headline-primary text-4xl sm:text-5xl text-slate-900 mb-4">{content.title}</h1>

        {key === "docs" ? (
          <>
            <div className="flex gap-8 mt-8">
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <nav className="sticky top-32 space-y-6">
                  {sidebarNav!.map((group, gi) => (
                    <div key={gi}>
                      <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase mb-2">{group.label}</p>
                      <ul className="space-y-1">
                        {group.items.map((item, ii) => (
                          <li key={ii}>
                            <a
                              href={item.href}
                              className="block text-sm text-slate-600 hover:text-slate-900 hover:font-medium transition-all py-1 px-2 rounded-md hover:bg-slate-50"
                            >
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </nav>
              </aside>
              <div className="flex-1 min-w-0 space-y-6">
                {content.sections && content.sections.length > 0 && (
                  content.sections.map((section, idx) => renderSection(section, idx, key, content))
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-10">
              <Link
                href="/"
                className="inline-flex items-center rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Back to home
              </Link>
            </div>
          </>
        ) : (
          <>
            {content.intro && <p className="text-lg text-slate-700 mb-5">{content.intro}</p>}
            {content.body && <p className="text-slate-600 leading-relaxed mb-8">{content.body}</p>}

            {key === "research" && (
              <div className="my-10 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Agent in Action Live Sandbox</h2>
                  <ResearchSandbox />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Architecture &amp; Security Deep Dive</h2>
                  <p className="text-sm text-slate-600 mb-6">Full multi agent pipeline from Telegram/webhook input through 8 specialized agents to final IEEE format output, with hallucination defense layers for enterprise grade trust.</p>
                  <ArchitectureDiagram />
                </div>
              </div>
            )}

            {content.images && content.images.length > 0 && (
              <div className="mt-8">
                <ImageLightbox
                  images={content.images.map((src) => ({ src, alt: `${content.title} screenshot` }))}
                />
              </div>
            )}

            {content.sections && content.sections.length > 0 && (
              <div className="space-y-6 mt-10">
                {content.sections.map((section, idx) => renderSection(section, idx, key, content))}
              </div>
            )}

            <div className="flex flex-wrap gap-3 mt-10">
              <Link
                href="/"
                className="inline-flex items-center rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Back to home
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
