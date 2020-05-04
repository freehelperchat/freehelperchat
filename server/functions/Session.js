const encrypter = require('./Encrypter');
const Session = require('../models/chat/Session');

module.exports = {
  /**
   * Creates a new session for the given user
   * @param {*} operator Operator object from the database
   * @returns {Promise<String>} The session's token
   */
  async addSession(operator) {
    const token = encrypter.randomString(256);
    const session = {
      _id: token,
      operatorId: operator._id,
    };
    return Session.create(session)
      .then((res) => res._id)
      .catch(() => null);
  },

  /**
   * Adds the socket id to the User Session
   * @param {String} token Session's token
   * @param {String} socketId SocketId of the user
   * @returns {Promise<boolean>} Boolean that indicates that the session was updated or not
   */
  async updateSession(token, socketId) {
    const session = await Session.findById(token);
    if (session) {
      session.socketId = socketId;
      await session.save();
      return true;
    }
    return false;
  },

  /**
   *
   * @param {String} token Session's token
   * @returns {Promise<Document>} The session document
   */
  async getSession(token) {
    return Session.findById(token).populate({ path: 'operator', select: '-password' });
  },

  /**
   * Deletes an User Session by the token
   * @param {String} token Session's token
   * @returns {Promise<boolean>} Boolean that indicates that the session was delete or not
   */
  async deleteSession(token) {
    return Session.findByIdAndDelete(token)
      .then(() => true)
      .catch(() => false);
  },

  /**
   * Deletes an User Session by the operatorId
   * @param {String} operatorId User's ID
   * @returns {Promise<boolean>} Boolean that indicates that the session was deleted or not
   */
  async deleteSessionByOperatorId(operatorId) {
    return Session.findOneAndDelete({ operatorId })
      .then(() => true)
      .catch(() => false);
  },

  /**
   * Checks if a session exists or not
   * @param {String} token Session's token
   * @returns {Promise<boolean>} Boolean that indicates if the session exists or not
   */
  async sessionExists(token) {
    const session = await this.getSession(token);
    return typeof session !== 'undefined' && session !== null;
  },
};
