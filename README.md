# 🏖️ BotOnTheBeach Twitch Chat Bot

**BotOnTheBeach** is a Node.js-based Twitch chatbot built for the *DaddyKiefer* channel — designed to bring chill beach vibes, fun commands, and a foundation for future AI-powered interactions.

---

## 📑 Table of Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Setup & Run](#-setup--run)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration-in-srcconfigjs)
- [Planned Roadmap](#-planned-roadmap)
- [Author](#-author)
- [License](#-license)

---


## 🌊 Features

- ⚡ Responds to chat commands (`!ping`, `!wave`, `!ask`, etc.)
- 🕒 Per-command and per-user cooldowns
- 🧩 Modular architecture for easy expansion
- 🌴 Built-in message sanitization and moderation filters
- 🔧 Configurable via `.env` and `config.js`
- 💬 Planned AI integration through a Python microservice

---

## 🧰 Requirements

- [Node.js](https://nodejs.org/) (v18 or newer)
- A Twitch account (for your bot)
- A Twitch **OAuth Token** (generated via [Twitch Token Generator](https://twitchtokengenerator.com/))

---

## 🚀 Setup & Run

### 1. Clone the repository

```bash
git clone https://github.com/djkiefer/my-twitch-bot.git
cd my-twitch-bot.git
```
---

### 2. Install Dependencies

```bash
npm install
```
---

### 3. Configure environment

```ini
TWITCH_BOT_NAME=your_bot_name
TWITCH_CHANNEL=your_twtich_channel
TWITCH_OAUTH_TOKEN=oauth:your_token_here
OPENAI_API_KEY=sk-yourkeyhere
```
---

### 4. Run the bot
Start in development mode (auto-reload with **nodemon**):
```bash
npm run dev
```
Or start normally:
```bash
npm start
```
---

## 🧩 Project Structure
```bash
botonthebeach/
├─ src/
│  ├─ index.js           # Entry point (bot connection)
│  ├─ commands.js        # All bot commands
│  ├─ router.js          # Message handling logic
│  └─ utils/             # Helpers: cooldowns, sanitize, permissions
├─ .env.example          # Template for environment variables
├─ .gitignore
├─ .gitattributes
├─ package.json
└─ README.md
```
---

## ⚙️ Configuration (in src/config.js)
| Key                            | Description                          | Example                        |
| ------------------------------ | ------------------------------------ | ------------------------------ |
| `commandPrefix`                | Character that triggers bot commands | `!`                            |
| `privilegedRoles`              | Roles that bypass cooldowns          | `['broadcaster', 'moderator']` |
| `cooldowns.defaults.globalMs`  | Global cooldown (ms)                 | `3000`                         |
| `cooldowns.defaults.perUserMs` | Per-user cooldown (ms)               | `20000`                        |
| `moderation.allowUrls`         | Allow posting links                  | `false`                        |
---

## 🧠 Planned Roadmap
- 🤖 AI microservice (FastAPI + OpenAI) 
- 🎥 OBS / Streamer.bot integration 
- 💾 Persistent user data (JSON or SQLite) 
- 🌈 Custom overlay responses 
- 🗣️ Personality system for AI responses 
---

## 🧑‍💻 Author
**DaddyKiefer**  
Twitch: [twitch.tv/daddykiefer](https://twitch.tv/dadykiefer)  
Discord: [The Reef 🌴](https://discord.gg/Utw53buB)  

---

## 📜 License
This project is open-source under the [MIT License](https://opensource.org/licenses/MIT).