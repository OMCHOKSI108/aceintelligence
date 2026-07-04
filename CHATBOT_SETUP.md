# Botpress Chatbot Setup

This document explains how to set up, deploy, and embed the Ace Intelligence chatbot powered by Botpress.

## Prerequisites

- Node.js v22+
- A [Botpress](https://botpress.com) account
- Access to the Ace Intelligence Systems GitHub repository

---

## 1. Create a Botpress Account

1. Go to [https://app.botpress.com](https://app.botpress.com) and sign up.
2. Create a new workspace (or use the default one).
3. Create a new bot named `ace-intelligence-assistant` (or any name you prefer).

## 2. Configure the Bot

1. Open the bot in the Botpress Studio.
2. Set up the chatbot behavior using the visual flow editor or the code editor.
3. Use the knowledge base in `docs/ace-chatbot-knowledge.md` to populate the bot's knowledge.
4. Configure the bot to capture leads (name, email, company, project description, timeline, budget).

## 3. Generate a Personal Access Token

1. In Botpress Dashboard, go to **Settings → Personal Access Tokens**.
2. Create a new token with appropriate scopes.
3. Copy the token — you'll need it for CLI deployment.

## 4. CLI Setup (Optional — for bot-as-code)

```bash
# Install Botpress CLI
npm install -g @botpress/cli

# Login
bp login

# Init a bot project
mkdir -p tools/botpress
cd tools/botpress
bp init --type "bot" --name "ace-intelligence-assistant" --template "empty"
npm install
bp build
```

## 5. Deploy the Bot

```bash
# Deploy from the bot directory
bp deploy --create-new-bot
```

Or deploy directly from the Botpress Studio using the **Publish** button.

## 6. Get Webchat Embed URLs

1. In Botpress Dashboard, open your bot.
2. Go to **Webchat → Deploy Settings**.
3. Copy the **Inject URL** and **Config URL**.
4. Add them to your `.env.local` file:

```
NEXT_PUBLIC_BOTPRESS_INJECT_URL=https://cdn.botpress.cloud/webchat/vX.X/inject.js
NEXT_PUBLIC_BOTPRESS_CONFIG_URL=https://files.bpcontent.cloud/XXXXX/config.js
```

## 7. Test Locally

```bash
npm run dev
```

The chatbot widget should appear on every page at the bottom-right corner.

## 8. Deploy to Production (Vercel)

1. Push your code to GitHub:

```bash
git add .
git commit -m "feat: add Botpress chatbot widget"
git push
```

2. In Vercel Dashboard, go to your project → **Settings → Environment Variables**.
3. Add the two environment variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_BOTPRESS_INJECT_URL` | `https://cdn.botpress.cloud/webchat/vX.X/inject.js` |
| `NEXT_PUBLIC_BOTPRESS_CONFIG_URL` | `https://files.bpcontent.cloud/XXXXX/config.js` |

4. Redeploy the project.

---

## Files Overview

| File | Purpose |
|------|---------|
| `src/components/BotpressChatbot.tsx` | React component that embeds the Botpress webchat |
| `docs/ace-chatbot-knowledge.md` | Knowledge base content for the bot |
| `.env.example` | Template for required environment variables |
| `CHATBOT_SETUP.md` | This file |
