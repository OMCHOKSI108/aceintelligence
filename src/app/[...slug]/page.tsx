import Link from "next/link";
import { ArrowRight, CheckCircle, Code, Zap, Shield, BookOpen, FileText, Layers, Calendar, Activity } from "lucide-react";
import { RagWorkflow3D } from "@/components/home/RagWorkflow3D";

type PageContent = {
  title: string;
  intro: string;
  body: string;
  sections?: {
    title: string;
    content: string;
    code?: string;
  }[];
};

const contentMap: Record<string, PageContent> = {
  research: {
    title: "Research",
    intro: "aceintellegence researches practical, safe, and useful AI systems.",
    body: "Our research programs focus on reliability, model quality, and real-world impact so teams can deploy AI with confidence. Below is our conceptual RAG (Retrieval-Augmented Generation) workflow for ChatPDF.",
  },
  "economic-futures": {
    title: "Economic Futures",
    intro: "We study how AI changes work, productivity, and opportunity.",
    body: "aceintellegence explores economic outcomes and builds tools that support sustainable growth for developers, startups, and enterprises.",
  },
  constitution: {
    title: "Company Constitution",
    intro: "Our constitution defines long-term product and safety principles.",
    body: "It guides how we prioritize user value, technical excellence, and responsible scaling in every release.",
  },
  transparency: {
    title: "Transparency",
    intro: "We communicate openly about product direction and system behavior.",
    body: "aceintellegence publishes clear updates so users understand capabilities, limitations, and expected improvements.",
  },
  "responsible-scaling": {
    title: "Responsible Scaling",
    intro: "Scaling decisions are paired with evaluation and safety checks.",
    body: "We combine measured rollout, monitoring, and governance practices to ensure stable growth of our AI systems.",
  },
  security: {
    title: "Security",
    intro: "Security is built into every layer of the platform.",
    body: "From infrastructure to application flows, aceintellegence follows secure engineering practices and continuous hardening.",
  },
  academy: {
    title: "Academy",
    intro: "Learn how to build with aceintellegence products quickly.",
    body: "Academy includes practical guides, examples, and onboarding content for developers and technical teams.",
    sections: [
      {
        title: "Quickstart",
        content: "Get started with your first project in minutes.",
        code: `npx create-aceintellegence-app my-project\ncd my-project\nnpm run dev`,
      },
      {
        title: "Basic Integration",
        content: "Connect to the aceintellegence API with a few lines of code.",
        code: `import { Aceintellegence } from '@aceintellegence/sdk'\n\nconst client = new Aceintellegence({ apiKey: process.env.ACE_KEY })\nconst response = await client.complete('Write a hello world function')`,
      },
    ],
  },
  tutorials: {
    title: "Tutorials",
    intro: "Step-by-step tutorials for common AI workflows.",
    body: "Build faster with implementation-first walkthroughs for prompts, tooling, and product integration.",
    sections: [
      {
        title: "Build a Code Assistant",
        content: "Create an AI coding assistant that helps with debugging and refactoring.",
        code: `// Step 1: Initialize the client\nconst aceintellegence = new Aceintellegence({ apiKey: process.env.ACE_KEY })\n\n// Step 2: Create a coding assistant\nconst assistant = await aceintellegence.assistants.create({\n  name: 'Code Helper',\n  model: 'opus',\n  instructions: 'You are a helpful coding assistant...'\n})`,
      },
      {
        title: "Add Tooling",
        content: "Enable file reading, shell commands, and web search.",
        code: `await aceintellegence.tools.register('bash', {\n  command: 'bash',\n  description: 'Run shell commands'\n})\n\nawait aceintellegence.tools.register('filesystem', {\n  command: 'read_file',\n  description: 'Read files from disk'\n})`,
      },
    ],
  },
  "use-cases": {
    title: "Use Cases",
    intro: "See how teams apply aceintellegence in production.",
    body: "Explore proven patterns across coding, automation, internal assistants, and customer-facing experiences.",
  },
  engineering: {
    title: "Engineering",
    intro: "Engineering at aceintellegence is focused on execution quality.",
    body: "We build fast, keep systems maintainable, and ship features that create measurable developer value.",
  },
  claude: {
    title: "ChatPDF",
    intro: "ChatPDF is our core document intelligence experience.",
    body: "It helps teams understand, query, and extract insights from documents with better speed and accuracy.",
  },
  code: {
    title: "Voice Chat",
    intro: "Voice-enabled AI interactions with STT and TTS pipelines.",
    body: "Use voice commands to interact with your documents and get streaming transcriptions in real-time.",
  },
  cowork: {
    title: "Collaborative Workspace",
    intro: "Shared workspaces for team document intelligence.",
    body: "Teams can collaborate on document analysis, share insights, and build collective knowledge bases.",
  },
  platform: {
    title: "Platform",
    intro: "The aceintellegence platform provides APIs and integration tools.",
    body: "Build and scale document intelligence products with predictable performance and developer-friendly interfaces.",
  },
  pricing: {
    title: "Pricing",
    intro: "Flexible plans for builders, teams, and organizations.",
    body: "Choose a plan that matches usage needs, project scale, and support expectations.",
    sections: [
      {
        title: "Free",
        content: "For learning and experimentation. 5 documents/day, community support.",
        code: "$0/month",
      },
      {
        title: "Pro",
        content: "For professional builders. 100 documents/day, priority support, advanced RAG.",
        code: "$20/month",
      },
      {
        title: "Team",
        content: "For teams building products. Unlimited documents, dedicated support, custom integrations.",
        code: "$99/month",
      },
    ],
  },
  "models/opus": {
    title: "Opus",
    intro: "Opus is designed for complex document analysis tasks.",
    body: "It is optimized for advanced reasoning and deep document understanding workflows.",
  },
  "models/sonnet": {
    title: "Sonnet",
    intro: "Sonnet balances quality, speed, and cost for document Q&A.",
    body: "It is ideal for everyday document queries where consistency and responsiveness matter most.",
  },
  "models/haiku": {
    title: "Haiku",
    intro: "Haiku is tuned for lightweight and fast document lookups.",
    body: "Use it for high-throughput Q&A, concise extractions, and low-latency applications.",
  },
  docs: {
    title: "Developer Docs",
    intro: "Everything needed to start building with aceintellegence.",
    body: "Find setup instructions, architecture guidance, and examples for shipping real features.",
    sections: [
      {
        title: "Installation",
        content: "Install the aceintellegence SDK in your project.",
        code: `npm install @aceintellegence/sdk\n# or\nyarn add @aceintellegence/sdk`,
      },
      {
        title: "Authentication",
        content: "Get your API key from the dashboard and set it as an environment variable.",
        code: `export ACEINTELLIGENCE_API_KEY="ace_your_key_here"`,
      },
      {
        title: "Your First Request",
        content: "Make a completion request to analyze a document.",
        code: `import { Aceintellegence } from '@aceintellegence/sdk'\n\nconst client = new Aceintellegence()\nconst response = await client.analyze({\n  document: 'path/to/doc.pdf',\n  query: 'Summarize the key points'\n})\nconsole.log(response.summary)`,
      },
      {
        title: "Streaming Responses",
        content: "Stream tokens as they are generated for real-time output.",
        code: `const stream = await client.analyze({\n  document: 'path/to/doc.pdf',\n  query: 'Explain the methodology',\n  stream: true\n})\n\nfor await (const chunk of stream) {\n  process.stdout.write(chunk.text)\n}`,
      },
      {
        title: "Using Tools",
        content: "Enable the model to execute code and interact with external systems.",
        code: `const response = await client.analyze({\n  document: 'path/to/doc.pdf',\n  query: 'What files reference this?',\n  tools: [{ type: 'search' }],\n  tool_choice: 'auto'\n})`,
      },
    ],
  },
  api: {
    title: "aceintellegence API",
    intro: "The API enables integration into apps and internal tools.",
    body: "Use clear endpoints and predictable contracts to power automation and AI experiences.",
    sections: [
      {
        title: "Base URL",
        content: "All API requests go through this endpoint.",
        code: `https://api.aceintellegence.ai/v1`,
      },
      {
        title: "Document Upload",
        content: "Upload documents for analysis.",
        code: `curl -X POST https://api.aceintellegence.ai/v1/documents \\\n  -H "Authorization: Bearer $ACE_API_KEY" \\\n  -F "file=@document.pdf"`,
      },
      {
        title: "Chat Completions",
        content: "Send document-based questions and get answers with citations.",
        code: `curl -X POST https://api.aceintellegence.ai/v1/chat \\\n  -H "Authorization: Bearer $ACE_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "document_id": "doc_123",\n    "messages": [\n      {"role": "user", "content": "Summarize this document"}\n    ]\n  }'`,
      },
      {
        title: "Voice Chat",
        content: "Stream voice interactions with the document intelligence API.",
        code: `curl -X POST https://api.aceintellegence.ai/v1/voice \\\n  -H "Authorization: Bearer $ACE_API_KEY" \\\n  -F "audio=@recording.mp3" \\\n  -F "document_id=doc_123"`,
      },
      {
        title: "Rate Limits",
        content: "Understand request limits per plan.",
        code: `Free: 60 req/min\nPro: 300 req/min\nTeam: Unlimited`,
      },
    ],
  },
  templates: {
    title: "Project Templates",
    intro: "Start from working templates for common product patterns.",
    body: "Templates reduce setup time and help teams standardize engineering practices from day one.",
    sections: [
      {
        title: "Document Chat App",
        content: "Full-featured chat interface with document upload and citations.",
        code: `npx create-aceintellegence-app chat-app --template doc-chat`,
      },
      {
        title: "Admin Dashboard",
        content: "Dashboard for managing documents, users, and analytics.",
        code: `npx create-aceintellegence-app admin --template dashboard`,
      },
      {
        title: "API Service",
        content: "FastAPI wrapper for document intelligence endpoints.",
        code: `npx create-aceintellegence-api service --template api`,
      },
      {
        title: "Slack Bot",
        content: "Connect aceintellegence to your Slack workspace for document Q&A.",
        code: `npx create-aceintellegence-bot slack-bot --template slack`,
      },
    ],
  },
  projects: {
    title: "Projects",
    intro: "Browse active aceintellegence initiatives.",
    body: "Projects reflect our core direction across document intelligence, voice pipelines, and startup-focused products.",
    sections: [
      {
        title: "ChatPDF Core",
        content: "RAG-powered document chat with citations. MVP shipping Q2 2026.",
        code: "In Development",
      },
      {
        title: "Voice Pipeline",
        content: "STT + TTS integration for voice-based document interactions. Beta Q3 2026.",
        code: "In Development",
      },
      {
        title: "Multi-Document Workspaces",
        content: "Cross-document analysis and workspace sharing. Coming Q4 2026.",
        code: "Planning",
      },
      {
        title: "Enterprise API",
        content: "Custom integrations, OAuth, and business workflows. Private beta signup open.",
        code: "Beta",
      },
    ],
  },
  status: {
    title: "Status",
    intro: "Real-time system status for aceintellegence services.",
    body: "Monitor API availability, latency, and incident history.",
    sections: [
      {
        title: "API Status",
        content: "Current operational status of all services.",
        code: "Operational",
      },
      {
        title: "API Latency",
        content: "Average response time over the last 5 minutes.",
        code: "142ms",
      },
      {
        title: "Uptime (30 days)",
        content: "Service availability over the past month.",
        code: "99.98%",
      },
      {
        title: "Incidents (30 days)",
        content: "No major incidents in the past 30 days.",
        code: "0",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro: "We protect user information with clear privacy practices.",
    body: "This section explains how data is used, stored, and secured across aceintellegence services.",
    sections: [
      {
        title: "Data Collection",
        content: "We collect only essential data to provide our services. API keys, usage metrics, and support communications.",
      },
      {
        title: "Data Usage",
        content: "Your data is used solely to provide and improve aceintellegence services. We never train on user data without consent.",
      },
      {
        title: "Data Security",
        content: "All data is encrypted in transit and at rest. We follow SOC 2 and GDPR compliance frameworks.",
      },
      {
        title: "User Rights",
        content: "You can request data export or deletion at any time. Contact privacy@aceintellegence.ai.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro: "Terms define usage rules and responsibilities.",
    body: "They establish a transparent agreement between aceintellegence and platform users.",
    sections: [
      {
        title: "Acceptable Use",
        content: "No illegal activities, no attempting to bypass safety guardrails, no mass scraping of services.",
      },
      {
        title: "Liability",
        content: "aceintellegence services are provided 'as is'. We are not liable for indirect or consequential damages.",
      },
      {
        title: "Account Responsibilities",
        content: "Keep your API keys secure. You are responsible for activity under your account.",
      },
      {
        title: "Changes to Terms",
        content: "We will notify users of material changes. Continued use constitutes acceptance.",
      },
    ],
  },
  support: {
    title: "Support",
    intro: "Get help with aceintellegence products and services.",
    body: "Find answers to common questions or reach out to our team for assistance.",
    sections: [
      {
        title: "Documentation",
        content: "Browse our comprehensive docs at /docs for guides, API references, and tutorials.",
        code: "Visit /docs",
      },
      {
        title: "Status Page",
        content: "Check our system status and uptime at /status before reporting issues.",
        code: "Visit /status",
      },
      {
        title: "FAQ",
        content: "How do I get an API key? Sign up and visit the dashboard to generate your key.\nWhat file types are supported? PDF, DOCX, TXT are currently supported.\nIs there a rate limit? Free tier: 60 req/min, Pro: 300 req/min, Team: Unlimited.",
      },
    ],
  },
  contact: {
    title: "Contact Us",
    intro: "Get in touch with the aceintellegence team.",
    body: "We'd love to hear from you. Reach out through any of the channels below.",
    sections: [
      {
        title: "General Inquiries",
        content: "For general questions about aceintellegence products and services.",
        code: "Email: hello@aceintellegence.ai",
      },
      {
        title: "Technical Support",
        content: "For bug reports, technical issues, and API support.",
        code: "Email: support@aceintellegence.ai",
      },
      {
        title: "Business & Partnerships",
        content: "For enterprise plans, partnerships, and business development.",
        code: "Email: business@aceintellegence.ai",
      },
      {
        title: "Privacy & Legal",
        content: "For data privacy requests and legal inquiries.",
        code: "Email: privacy@aceintellegence.ai",
      },
      {
        title: "Office Location",
        content: "aceintellegence HQ - Remote-first startup with team members worldwide.",
        code: "Available on Discord & GitHub",
      },
    ],
  },
};

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
    intro: "This page is now active and ready for content.",
    body: "aceintellegence is a startup founded by OMCHOKSI108, firefistisdead, and anshgajera. This section can be extended with detailed product, research, or documentation content.",
  };

  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm p-8 sm:p-10 shadow-sm">
        <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase mb-3">aceintellegence</p>
        <h1 className="headline-primary text-4xl sm:text-5xl text-slate-900 mb-4">{content.title}</h1>
        <p className="text-lg text-slate-700 mb-5">{content.intro}</p>
        <p className="text-slate-600 leading-relaxed mb-8">{content.body}</p>

        {key === "research" && (
          <div className="my-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">RAG Workflow Visualization</h2>
            <p className="text-sm text-slate-600 mb-6">Interactive 3D visualization of our Retrieval-Augmented Generation pipeline. Hover over nodes for details. Drag to rotate, scroll to zoom.</p>
            <RagWorkflow3D />
          </div>
        )}

        {content.sections && content.sections.length > 0 && (
          <div className="space-y-6 mt-10">
            {content.sections.map((section, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <h3 className="font-medium text-slate-900">{section.title}</h3>
                  {section.content && (
                    <p className="text-sm text-slate-600 mt-1">{section.content}</p>
                  )}
                </div>
                {section.code && (
                  <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm font-mono">
                    <code>{section.code}</code>
                  </pre>
                )}
              </div>
            ))}
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
