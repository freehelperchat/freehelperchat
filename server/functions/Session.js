const encrypter = require('./Encrypter');

const sessions = {};

module.exports = {
  /**
   * Creates a new session for the given user
   * @param {*} operator Operator object from the database
   * @returns {String} The session's token
   */
  addSession(operator) {
    const token = encrypter.randomString(256);
    const session = {
      userId: operator._id,
      socketId: null,
      time: new Date().getTime(),
    };
    sessions[token] = session;
    return token;
  },

  /**
   * Adds the socket id to the User Session
   * @param {String} token Session's token
   * @param {String} socketId SocketId of the user
   * @returns {boolean} Boolean that indicates that the session was updated or not
   */
  updateSession(token, socketId) {
    if (sessions[token]) {
      sessions[token].socketId = socketId;
      return true;
    }
    return false;
  },

  /**
   *
   * @param {String} token Session's token
   * @returns {{
   *  userId: String
   *  socketId: String
   *  time: String
   * }} The user's session or null if token is invalid
   */
  getSession(token) {
    return sessions[token];
  },

  /**
   * Deletes an User Session by the token
   * @param {String} token Session's token
   * @returns {boolean} Boolean that indicates that the session was delete or not
   */
  deleteSession(token) {
    if (sessions[token]) {
      delete sessions[token];
      return true;
    }
    return false;
  },

  /**
   * Deletes an User Session by the UserID
   * @param {String} userId User's ID
   * @returns {boolean} Boolean that indicates that the session was deleted or not
   */
  deleteSessionByUserId(userId) {
    const currentSessions = Object.keys(sessions)
      .filter((s) => String(sessions[s].userId).trim() === String(userId).trim());
    if (currentSessions.length > 0) return currentSessions.map((cs) => delete sessions[cs]);
    return false;
  },

  /**
   * Checks if a session exists or not
   * @param {String} token Session's token
   * @returns {boolean} Boolean that indicates if the session exists or not
   */
  sessionExists(token) {
    const session = this.getSession(token);
    return typeof session !== 'undefined' && session !== null;
  },
};
