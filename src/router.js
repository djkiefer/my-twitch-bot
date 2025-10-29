// src/router.js
const { checkCooldowns, setCooldowns } = require('./utils/cooldowns.js');
const { sanitizeInput } = require('./utils/sanitize.js');
const { isPrivileged } = require('./utils/permissions.js');

/**
 * Build a message handler bound to your config & commands.
 * Usage in index.js: client.on('message', handleMessage(client))
 */
function buildRouter(CONFIG, commands) {
  return function handleMessage(client) {
    return async (chan, tags, message, self) => {
      if (self) return;

      // 1) Prefix check
      if (!message.startsWith(CONFIG.commandPrefix)) return;

      // 2) Parse command + args
      const parts = message.slice(CONFIG.commandPrefix.length).trim().split(/\s+/);
      const cmdName = (parts.shift() || '').toLowerCase();
      const cmd = commands[cmdName];
      if (!cmd) return;

      // 3) Context
      const username = tags['display-name'] || tags.username || 'user';
      const roles = tags.badges || {};
      const privileged = CONFIG.privilegedBypass && isPrivileged(tags, CONFIG.privilegedRoles);

      // 4) Cooldowns
      if (!privileged) {
        const { now, gLeft, uLeft } = checkCooldowns(cmdName, username, cmd.cooldown);
        if (gLeft > 0 || uLeft > 0) {
          if (uLeft > 0 && CONFIG.cooldowns.showPerUserMsg) {
            await client.say(chan, `⏳ ${username}, try !${cmdName} again in ${Math.ceil(uLeft/1000)}s`);
          } else if (gLeft > 0 && CONFIG.cooldowns.showGlobalMsg) {
            await client.say(chan, `⏳ !${cmdName} cooling down (${Math.ceil(gLeft/1000)}s)`);
          }
          return;
        }
        setCooldowns(cmdName, username, cmd.cooldown, now);
      }

      // 5) Input sanitization (only if command expects text)
      let textArg = null;
      if (cmd?.input?.expectsText) {
        textArg = parts.join(' ').trim();
        const moderation = {
          allowUrls: CONFIG.moderation.allowUrls,
          blocklist: CONFIG.moderation.blocklist,
          maxLen: cmd?.input?.maxLen ?? 200,
          requireNonEmpty: cmd?.input?.requireNonEmpty ?? false,
          ...(cmd?.input?.moderationOverrides || {})
        };
        const result = sanitizeInput(textArg, moderation);
        if (!result.ok) {
          if (result.reason === 'empty')            return client.say(chan, `Usage: ${CONFIG.commandPrefix}${cmdName} ${cmd.input.usageHint || '<text>'}`);
          if (result.reason === 'too_long')         return client.say(chan, `That’s a bit long. Max ${moderation.maxLen} chars.`);
          if (result.reason === 'url_not_allowed')  return client.say(chan, `Links aren’t allowed for this command.`);
          if (result.reason === 'blocked_word')     return client.say(chan, `Let’s keep it friendly 🏖️`);
          return;
        }
      }

      // 6) Execute
      try {
        await cmd.execute({
          client,
          channel: chan,
          tags,
          args: parts,     // still pass split args
          textArg,         // joined text if needed
          commands,
          CONFIG,
          meta: { username, roles, privileged }
        });
      } catch (err) {
        console.error(`Error running command ${cmdName}:`, err);
        client.say(chan, '🤿 Oops, something went wrong with that command!');
      }
    };
  };
}

module.exports = { buildRouter };
