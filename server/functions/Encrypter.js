const crypto = require('crypto');

module.exports = {
  /**
   * Generates a random number within the given range
   * @param {number} min The minimum value the random number can be
   * @param {number} max The maximum value the random number can be
   * @returns {number} A generated number
   */
  randomNumber(min, max) {
    return Math.ceil((Math.random() * (max - min) + min));
  },

  /**
   * Generates a random string of the given length
   * @param {number} length The length of the string
   * @returns {string} The generated string
   */
  randomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  },

  /**
   * Generates a random hash
   * @param {string} password The password to be hashed
   * @param {string} salt Random string generated for the password
   * @returns {string} The random hash
   */
  sha256(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
  },

  /**
   * Generates a salt string to the password and uses it
   * to create a random hash for the given password
   * @param {string} password The password to be hashed
   * @returns {{
   *  salt: string
   *  hash: string
   * }} An object containing the generated salt and
   * generated hash for the password
   */
  hashPassword(password) {
    const salt = this.randomString(16);
    return {
      salt,
      hash: this.sha256(password, salt),
    };
  },
};
