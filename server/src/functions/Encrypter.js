const crypto = require('crypto');

module.exports = {

  randomNumber(min, max) {
    return Math.ceil((Math.random() * (max - min) + min));
  },

  randomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  },

  sha256(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
  },

  hashPassword(password) {
    const salt = this.randomString(16);
    return {
      salt,
      hash: this.sha256(password, salt),
    };
  },
};
