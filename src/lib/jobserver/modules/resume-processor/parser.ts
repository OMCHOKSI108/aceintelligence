import type { ProfileData } from "../../models/CandidateProfile";

// ── Curated Skills List ────────────────────────────────────
const TECH_SKILLS = [
  // Languages
  "javascript",
  "typescript",
  "python",
  "java",
  "c++",
  "c#",
  "ruby",
  "go",
  "rust",
  "php",
  "swift",
  "kotlin",
  "scala",
  "r",
  "matlab",
  "perl",
  "haskell",
  "elixir",
  "dart",
  "lua",
  "groovy",
  // Frontend
  "react",
  "reactjs",
  "react.js",
  "angular",
  "angularjs",
  "vue",
  "vuejs",
  "vue.js",
  "svelte",
  "next.js",
  "nextjs",
  "nuxt",
  "remix",
  "gatsby",
  "html",
  "css",
  "sass",
  "scss",
  "less",
  "tailwind",
  "tailwindcss",
  "bootstrap",
  "material-ui",
  "mui",
  "chakra-ui",
  "ant design",
  // Backend
  "node.js",
  "nodejs",
  "express",
  "express.js",
  "fastify",
  "nestjs",
  "django",
  "flask",
  "fastapi",
  "spring",
  "spring boot",
  "rails",
  "ruby on rails",
  "laravel",
  "symfony",
  "asp.net",
  "dotnet",
  "graphql",
  "rest",
  "grpc",
  "websocket",
  // Databases
  "postgresql",
  "postgres",
  "mysql",
  "mongodb",
  "redis",
  "elasticsearch",
  "sqlite",
  "oracle",
  "sql server",
  "cassandra",
  "dynamodb",
  "couchdb",
  "neo4j",
  "firebase",
  "supabase",
  "sequelize",
  "typeorm",
  "prisma",
  "mongoose",
  "knex",
  "sqlalchemy",
  "active record",
  // Cloud & DevOps
  "aws",
  "amazon web services",
  "gcp",
  "google cloud",
  "azure",
  "docker",
  "kubernetes",
  "k8s",
  "terraform",
  "ansible",
  "jenkins",
  "github actions",
  "gitlab ci",
  "circleci",
  "travis ci",
  "nginx",
  "apache",
  "linux",
  "bash",
  "shell scripting",
  "ci/cd",
  "devops",
  // AI/ML
  "machine learning",
  "deep learning",
  "tensorflow",
  "pytorch",
  "keras",
  "scikit-learn",
  "nlp",
  "natural language processing",
  "computer vision",
  "opencv",
  "pandas",
  "numpy",
  "matplotlib",
  "jupyter",
  "hugging face",
  "transformers",
  "langchain",
  "openai",
  "gpt",
  // Data
  "sql",
  "nosql",
  "etl",
  "data warehousing",
  "apache spark",
  "hadoop",
  "kafka",
  "airflow",
  "tableau",
  "power bi",
  "looker",
  "dbt",
  "snowflake",
  "bigquery",
  "redshift",
  // Testing
  "jest",
  "mocha",
  "chai",
  "cypress",
  "playwright",
  "selenium",
  "pytest",
  "junit",
  "testng",
  "rspec",
  "xunit",
  "tdd",
  "bdd",
  // Mobile
  "react native",
  "flutter",
  "ios",
  "android",
  "xcode",
  "android studio",
  "ionic",
  "capacitor",
  "expo",
  // Tools
  "git",
  "github",
  "gitlab",
  "bitbucket",
  "jira",
  "confluence",
  "slack",
  "figma",
  "sketch",
  "adobe xd",
  "photoshop",
  "illustrator",
  "vscode",
  "vim",
  "neovim",
  // Other
  "agile",
  "scrum",
  "kanban",
  "jira",
  "microservices",
  "serverless",
  "lambda",
  "blockchain",
  "web3",
  "solidity",
  "ethereum",
  "smart contracts",
  "security",
  "oauth",
  "jwt",
  "encryption",
  "penetration testing",
  "seo",
  "analytics",
  "a/b testing",
  "ux",
  "ui",
];

// ── Section Headers ────────────────────────────────────────
const SECTION_PATTERNS = [
  /(?:^|\n)\s*(EXPERIENCE|WORK\s+EXPERIENCE|EMPLOYMENT\s+HISTORY|WORK\s+HISTORY|PROFESSIONAL\s+EXPERIENCE|CAREER\s+HISTORY)\s*(?:\n|$)/i,
  /(?:^|\n)\s*(EDUCATION|ACADEMIC\s+BACKGROUND|EDUCATIONAL\s+BACKGROUND|QUALIFICATIONS)\s*(?:\n|$)/i,
  /(?:^|\n)\s*(SKILLS|TECHNICAL\s+SKILLS|TECHNICAL\s+EXPERTISE|CORE\s+COMPETENCIES|COMPETENCIES|TECHNOLOGIES)\s*(?:\n|$)/i,
  /(?:^|\n)\s*(CERTIFICATIONS?|CERTIFICATES?|LICENSES?|LICENSES?\s+AND?\s+CERTIFICATIONS?)\s*(?:\n|$)/i,
  /(?:^|\n)\s*(PROJECTS?|PERSONAL\s+PROJECTS?|KEY\s+PROJECTS?|SIDE\s+PROJECTS?)\s*(?:\n|$)/i,
  /(?:^|\n)\s*(SUMMARY|OBJECTIVE|PROFESSIONAL\s+SUMMARY|CAREER\s+SUMMARY|PROFILE|ABOUT\s+ME|PROFESSIONAL\s+PROFILE)\s*(?:\n|$)/i,
  /(?:^|\n)\s*(LINKEDIN|GITHUB|PORTFOLIO|WEBSITE|CONTACT|CONTACT\s+INFORMATION)\s*(?:\n|$)/i,
];

// ── Core Extraction Functions ──────────────────────────────

export function extractEmail(text: string): string | undefined {
  const match = text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
  return match?.[0]?.toLowerCase();
}

export function extractPhone(text: string): string | undefined {
  const patterns = [
    /(?:\+?\d{1,3}[\s\-\.]?)?\(?\d{2,4}\)?[\s\-\.]?\d{3,4}[\s\-\.]?\d{3,4}/,
    /\d{10,15}/,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const cleaned = match[0].replace(/[\s\-\.\(\)]/g, "");
      if (cleaned.length >= 7 && cleaned.length <= 15) return match[0].trim();
    }
  }
  return undefined;
}

export function extractLinkedIn(text: string): string | undefined {
  const match = text.match(/linkedin\.com\/in\/[a-zA-Z0-9\-_%]+/i);
  return match?.[0];
}

export function extractGitHub(text: string): string | undefined {
  const match = text.match(/github\.com\/[a-zA-Z0-9\-_]+/i);
  return match?.[0];
}

export function extractSkills(text: string): string[] {
  const lower = text.toLowerCase();
  const found: string[] = [];
  for (const skill of TECH_SKILLS) {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`\\b${escaped}\\b`, "i");
    if (pattern.test(lower) && !found.includes(skill)) {
      found.push(skill);
    }
  }
  return [...new Set(found)];
}

export function extractName(text: string, email?: string): string | undefined {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  for (const line of lines.slice(0, 10)) {
    if (email && line.toLowerCase().includes(email.toLowerCase())) continue;
    if (/^[\+]?[\d\s\-\(\)]{7,}$/.test(line)) continue;
    if (/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/.test(line)) continue;
    if (/linkedin\.com|github\.com/i.test(line)) continue;
    if (SECTION_PATTERNS.some((p) => p.test(`\n${line}\n`))) continue;
    if (line.split(/\s+/).length > 5) continue;
    if (line.split(/\s+/).length < 2) continue;
    if (/^\d/.test(line)) continue;

    return line;
  }
  return lines[0] || undefined;
}

function splitIntoSections(text: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const lines = text.split("\n");
  let currentSection = "header";
  let currentContent: string[] = [];

  for (const line of lines) {
    let matched = false;
    for (const pattern of SECTION_PATTERNS) {
      const m = line.match(pattern);
      if (m) {
        sections[currentSection] = currentContent.join("\n").trim();
        currentSection = (m[1] || "other").toLowerCase().replace(/[^a-z]/g, "_");
        currentContent = [];
        matched = true;
        break;
      }
    }
    if (!matched) {
      currentContent.push(line);
    }
  }
  sections[currentSection] = currentContent.join("\n").trim();
  return sections;
}

function parseExperience(sectionText: string): ProfileData["experience"] {
  const blocks = sectionText.split(/\n{2,}/).filter(Boolean);
  return blocks.map((block) => {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const title = lines[0] || "";
    const company = lines[1] || "";
    const durationMatch = block.match(
      /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*[\s\.]+\d{4}\s*[-–—to]+\s*(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*[\s\.]+\d{4}|(?:\d{4}\s*[-–—to]+\s*(?:\d{4}|present|current))/i,
    );
    const duration = durationMatch?.[0] || "";
    const description = lines.slice(duration ? 2 : 1).join("\n");
    return { title, company, duration, description };
  });
}

function parseEducation(sectionText: string): ProfileData["education"] {
  const blocks = sectionText.split(/\n{2,}/).filter(Boolean);
  return blocks.map((block) => {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const degree = lines[0] || "";
    const institution = lines[1] || "";
    const yearMatch = block.match(
      /\b(19|20)\d{2}\s*[-–—to]*\s*(?:(19|20)\d{2}|present|current)?\b/i,
    );
    const year = yearMatch?.[0] || "";
    return { degree, institution, year };
  });
}

function parseCertifications(sectionText: string): string[] {
  return sectionText
    .split(/\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 2 && !/^(certifications?|licenses?)$/i.test(l));
}

function parseProjects(sectionText: string): ProfileData["projects"] {
  const blocks = sectionText.split(/\n{2,}/).filter(Boolean);
  return blocks.map((block) => {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const name = lines[0] || "";
    const urlMatch = block.match(/https?:\/\/[^\s]+/);
    const url = urlMatch?.[0] || undefined;
    const description = lines
      .slice(1)
      .filter((l) => l !== url)
      .join("\n");
    return { name, description, url };
  });
}

// ── Main Parse Function ────────────────────────────────────

export function parseResume(text: string): ProfileData {
  const email = extractEmail(text);
  const phone = extractPhone(text);
  const linkedIn = extractLinkedIn(text);
  const github = extractGitHub(text);
  const name = extractName(text, email);
  const skills = extractSkills(text);
  const sections = splitIntoSections(text);

  const summary =
    sections["summary"] || sections["professional_summary"] || sections["about_me"] || undefined;

  return {
    name,
    email,
    phone,
    summary,
    skills,
    experience:
      sections["experience"] || sections["work_experience"] || sections["employment_history"]
        ? parseExperience(
            sections["experience"] || sections["work_experience"] || sections["employment_history"],
          )
        : [],
    education: sections["education"] ? parseEducation(sections["education"]) : [],
    certifications:
      sections["certifications"] || sections["licenses"]
        ? parseCertifications(sections["certifications"] || sections["licenses"])
        : [],
    projects:
      sections["projects"] || sections["personal_projects"]
        ? parseProjects(sections["projects"] || sections["personal_projects"])
        : [],
    linkedIn,
    github,
  };
}
