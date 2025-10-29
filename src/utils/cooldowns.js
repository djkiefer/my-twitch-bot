// src/utils/cooldowns.js
let DEFAULTS = { globalMs: 3000, perUserMs: 20000 };

const globalCd = new Map();          // cmd -> timestamp
const perUserCd = new Map();         // `${cmd}:${user}` -> timestamp

function initCooldowns(defaults = {}) {
  DEFAULTS = { ...DEFAULTS, ...defaults };
}

function getRemaining(ms, lastTs, now) {
  if (!lastTs) return 0;
  const diff = now - lastTs;
  return diff >= ms ? 0 : (ms - diff);
}

function checkCooldowns(cmdName, user, meta = {}) {
  const now = Date.now();
  const gMs = meta.globalMs ?? DEFAULTS.globalMs;
  const uMs = meta.perUserMs ?? DEFAULTS.perUserMs;

  const gLeft = getRemaining(gMs, globalCd.get(cmdName), now);
  const uLeft = getRemaining(uMs, perUserCd.get(`${cmdName}:${user}`), now);

  return { now, gLeft, uLeft };
}

function setCooldowns(cmdName, user, meta = {}, now = Date.now()) {
  const gMs = meta.globalMs ?? DEFAULTS.globalMs;
  const uMs = meta.perUserMs ?? DEFAULTS.perUserMs;
  if (gMs > 0) globalCd.set(cmdName, now);
  if (uMs > 0) perUserCd.set(`${cmdName}:${user}`, now);
}

module.exports = { initCooldowns, checkCooldowns, setCooldowns };
