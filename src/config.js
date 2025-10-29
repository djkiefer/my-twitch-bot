// src/config.js
require('dotenv').config();

function required(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`❌ Missing ${name} in .env`);
    process.exit(1);
  }
  return v;
}

const CONFIG = {
  // Environment / identity
  botName:   required('TWITCH_BOT_NAME'),
  channel:   required('TWITCH_CHANNEL'),
  oauth:     required('TWITCH_OAUTH_TOKEN'),

  // Bot behavior
  commandPrefix: '!',         // change if you want
  debug: false,               // set true to see tmi.js debug logs

  // Privileges & moderation
  privilegedBypass: true,     // bypass cooldowns for roles below
  privilegedRoles: ['broadcaster', 'moderator'], // add 'vip' if you like
  moderation: {
    allowUrls: true,
    blocklist: ['slur1', 'slur2'] // fill in with words to block
  },

  // Cooldowns
  cooldowns: {
    defaults: { globalMs: 3000, perUserMs: 20000 },
    showGlobalMsg: false,     // reduce chat noise
    showPerUserMsg: true
  }
};

module.exports = { CONFIG };
