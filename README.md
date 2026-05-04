# aceintellegence

Building AI products that ship. Document intelligence for the modern startup.

## What It Is

aceintellegence is a startup-focused website showcasing our document intelligence platform **ChatPDF** — an AI-powered tool that lets users upload documents, ask natural-language questions, and get grounded answers with source references.

## Team

- **OMCHOKSI108** — [GitHub](https://github.com/OMCHOKSI108)
- **firefistisdead** — [GitHub](https://github.com/firefistisdead)
- **anshgajera** — [GitHub](https://github.com/anshgajera)

## Product: ChatPDF

ChatPDF is a document intelligence platform built with RAG (Retrieval-Augmented Generation) architecture.

### Features

- RAG chat with document citations and conversation history
- Async ingestion and processing pipeline with worker queue
- Multi-document and workspace-aware access patterns
- Organization and business APIs (including local/hybrid flows)
- Voice chat endpoints with STT + TTS streaming
- OAuth (Google, GitHub) and JWT authentication
- Health, analytics, feedback, and operational endpoints

### Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend**: FastAPI, Redis (queue), PostgreSQL (persistence), Qdrant (vector search)
- **AI Pipeline**: STT/TTS for voice chat
- **Auth**: OAuth (Google, GitHub) + JWT

### Architecture

Monorepo structure:
- User-facing app (Next.js)
- Admin dashboard (Next.js)
- FastAPI backend + async workers
- Redis queue + PostgreSQL persistence + Qdrant vector search
- Voice chat pipeline (STT + TTS)

## Website Pages

- `/` — Landing page with Hero, LinkCards, ProjectsSection
- `/support` — FAQ, documentation links, status page
- `/contact` — Email contacts for general, support, business, privacy
- `/docs` — Developer documentation
- `/api` — API reference
- `/templates` — Project starter templates
- `/pricing` — Free, Pro, Team plans
- `/projects` — ChatPDF product showcase
- `/research`, `/constitution`, `/transparency`, `/security` — Company pages
- `/privacy`, `/terms` — Legal pages

All additional pages are served dynamically via the `/[...slug]` catch-all route.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

```bash
npm run build
npm run start
```

## License

All rights reserved — aceintellegence © 2026
