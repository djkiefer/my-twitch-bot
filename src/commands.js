// src/commands.js
const { CONFIG } = require('./config.js');

module.exports = {
  ping: {
    description: 'Check if the bot is alive',
    cooldown: { globalMs: 1000, perUserMs: 5000 },
    execute: async ({ client, channel, tags }) => {
      await client.say(channel, `Pong! 🏓 Hey ${tags['display-name'] || tags.username}!`);
    }
  },

  wave: {
    description: 'Send a friendly wave from The Reef',
    cooldown: { globalMs: 3000, perUserMs: 15000 },
    execute: async ({ client, channel, tags }) => {
      const name = tags['display-name'] || tags.username;
      const waves = [
        `🌴 ${name} waves hello from The Reef! 🦈`,
        `🌊 ${name} splashes into the chat with a wave!`,
        `🏖️ ${name} tosses a beach ball and waves at everyone!`,
        `🦈 ${name} pops up from the surf to say hi!`
      ];
      const response = waves[Math.floor(Math.random() * waves.length)];
      await client.say(channel, response);
    }
  },

  ask: {
    description: 'Ask a short question (AI later)',
    cooldown: { globalMs: 3000, perUserMs: 20000 },
    input: {
      expectsText: true,
      usageHint: '<your question>',
      maxLen: 200,
      requireNonEmpty: true,
      moderationOverrides: {
        allowUrls: false   // keep links off for now
      }
    },
    execute: async ({ client, channel, textArg, tags }) => {
      // Placeholder—later: call your LLM here
      //console.log('[ask] textArg:', textArg);
      const name = tags['display-name'] || tags.username;
      await client.say(channel, `I hear you, ${name}: “${textArg}”. AI brain coming soon. 🌊`);
    }
  },

  help: {
    description: 'List all commands',
    execute: async ({ client, channel, commands }) => {
      const list = Object.keys(commands).map(c => `!${c}`).join(', ');
      await client.say(channel, `Available commands: ${list}`);
    }
  }
};
