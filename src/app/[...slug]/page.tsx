import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle, Code, Zap, Shield, BookOpen, FileText, Layers, Calendar, Activity, CircleHelp, ListChecks, ArrowRightCircle, Target, BarChart3, Clock, Inbox } from "lucide-react";
import { ResearchSandbox } from "@/components/home/ResearchSandbox";
import { ArchitectureDiagram } from "@/components/home/ArchitectureDiagram";
import { ImageLightbox } from "@/components/home/ImageLightbox";

type Section = {
  title: string;
  content: string;
  code?: string;
  variant?: "star";
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
    title: "Documentation",
    intro: "Technical documentation for the Ace Intelligence platform.",
    body: "Learn how to integrate our API, set up your environment, and deploy enterprise grade workflow automation.",
    sections: [
      {
        title: "Quick Start",
        content: "Get started with ChatPDF and our automation platform. Connect your first workflow and start testing.",
      },
      {
        title: "API Overview",
        content: "Our REST API lets you trigger workflows, manage approvals, and integrate with your existing systems.",
      },
      {
        title: "Authentication",
        content: "Secure your API requests with JWT tokens or OAuth (Google, GitHub). Role based access control included.",
      },
      {
        title: "Hybrid Deployment",
        content: "Deploy on your own infrastructure for maximum privacy. Data never leaves your network in hybrid mode.",
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

  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm p-8 sm:p-10 shadow-sm">
        <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase mb-3">Ace Intelligence</p>
        <h1 className="headline-primary text-4xl sm:text-5xl text-slate-900 mb-4">{content.title}</h1>
        <p className="text-lg text-slate-700 mb-5">{content.intro}</p>
        <p className="text-slate-600 leading-relaxed mb-8">{content.body}</p>

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
            {content.sections.map((section, idx) => {
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
                            <a
                              href={section.code}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-blue-300 transition-colors"
                            >
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
              return (
                <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                    <h3 className="font-medium text-slate-900">{section.title}</h3>
                    {section.content && (
                      <p className="text-sm text-slate-600 mt-1">{section.content}</p>
                    )}
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
                    ) : section.code.startsWith("Email:") ? (
                      <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm font-mono">
                        <code>
                          <a
                            href={`mailto:${section.code.replace("Email: ", "")}`}
                            className="hover:text-blue-300 transition-colors"
                          >
                            {section.code}
                          </a>
                        </code>
                      </pre>
                    ) : section.code.startsWith("https://github.com") ? (
                      <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm font-mono">
                        <code>
                          <a
                            href={section.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-300 transition-colors"
                          >
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
            })}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-10">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Open docs
          </Link>
        </div>
      </div>
    </section>
  );
}
