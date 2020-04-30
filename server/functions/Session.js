const encrypter = require('./Encrypter');

const sessions = {};

module.exports = {
  addSession(account) {
    const token = encrypter.randomString(256);
    const session = {
      userId: account._id,
      socketId: null,
      time: new Date().getTime(),
    };
    sessions[token] = session;
    return token;
  },
  updateSession(token, socketId) {
    if (sessions[token]) {
      sessions[token].socketId = socketId;
      return true;
    }
    return false;
  },
  getSession(token) {
    return sessions[token];
  },
  deleteSession(token) {
    if (sessions[token]) {
      delete sessions[token];
      return true;
    }
    return false;
  },
  deleteSessionByUserId(userId) {
    const currentSessions = Object.keys(sessions)
      .filter((s) => String(sessions[s].userId).trim() === String(userId).trim());
    if (currentSessions.length > 0) return currentSessions.map((cs) => delete sessions[cs]);
    return false;
  },
};
