// src/utils/permissions.js
function isPrivileged(tags, roles = ['broadcaster', 'moderator']) {
  const badges = tags.badges || {};
  return roles.some(r => badges[r]);
}

module.exports = { isPrivileged };
