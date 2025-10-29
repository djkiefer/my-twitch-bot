// src/utils/sanitize.js
/**
 * Returns { ok: boolean, reason?: string }
 * reasons: "blocked_word", "url_not_allowed", "too_long", "empty"
 */
function sanitizeInput(text, opts) {
  const {
    allowUrls = false,
    blocklist = [],
    maxLen = 200,     // default clamp
    requireNonEmpty = false
  } = opts || {};

  const raw = (text ?? "").trim();
  if (requireNonEmpty && raw.length === 0) {
    return { ok: false, reason: "empty" };
  }
  if (raw.length > maxLen) {
    return { ok: false, reason: "too_long" };
  }

  const lowered = raw.toLowerCase();

  // Basic URL detection (http(s):// or bare domain TLDs)
  const urlRegex = /https?:\/\/\S+|(?:\b[\w-]+\.(?:com|net|org|io|gg|tv|co|dev|app|edu|gov|mil)\b)/i;
  if (!allowUrls && urlRegex.test(raw)) {
    return { ok: false, reason: "url_not_allowed" };
  }

  for (const bad of blocklist) {
    if (!bad) continue;
    if (lowered.includes(bad.toLowerCase())) {
      return { ok: false, reason: "blocked_word" };
    }
  }

  return { ok: true };
}

module.exports = { sanitizeInput };
