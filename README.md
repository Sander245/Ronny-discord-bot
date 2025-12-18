# Ronny Bot

A Discord bot with dual personalities (Ronny and Jonny) powered by Groq AI.

## Features

- Dual personalities: Ronny (helpful but slightly annoying) and Jonny (7-year-old chaos gremlin)
- Context-aware responses using the last 5 messages
- Groq AI integration for natural conversations
- Slash command support (`/ask`)
- Realistic typing delays

## Setup

### Prerequisites

- Node.js 20 or higher
- A Discord bot token
- A Groq API key

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   TOKEN=your_discord_bot_token
   CLIENT_ID=your_discord_client_id
   GUILD_ID=your_discord_guild_id
   GROQ_API_KEY=your_groq_api_key
   ```
4. Deploy commands:
   ```bash
   node deploy-commands.js
   ```
5. Run the bot:
   ```bash
   node index.js
   ```

### GitHub Actions Deployment

This bot is configured to run automatically using GitHub Actions. 

#### Setting up GitHub Secrets

1. Go to your GitHub repository
2. Click on **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each of the following:
   - Name: `TOKEN`, Value: Your Discord bot token
   - Name: `CLIENT_ID`, Value: Your Discord application client ID
   - Name: `GUILD_ID`, Value: Your Discord guild (server) ID
   - Name: `GROQ_API_KEY`, Value: Your Groq API key

#### How it works

- The bot runs automatically when you push to the `main` branch
- It can also be triggered manually via the Actions tab
- The bot runs on a scheduled cron job approximately every 5h55m to stay within GitHub Actions' 6-hour timeout limit
  - Scheduled times: 00:00, 05:55, 11:50, 17:45, 23:40 UTC
- The workflow will:
  1. Install dependencies
  2. Deploy slash commands
  3. Start the bot (runs for up to 5h55m before timing out)

**Note:** The bot automatically restarts via scheduled cron jobs before hitting the 6-hour limit. Free GitHub accounts have limited Actions minutes per month. For true 24/7 hosting without interruptions, consider using a dedicated hosting service like Railway, Render, or Heroku.

## Commands

- `/ask` - Ask Ronny or Jonny a question
  - `text` (required): Your message
  - `who` (optional): Choose Ronny or Jonny to respond first

## License

ISC
