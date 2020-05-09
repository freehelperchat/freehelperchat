import crypto from 'crypto';

export interface Hash {
  salt: string;
  hash: string;
}

export default class Encrypter {
  /**
   * Generates a random number within the given range
   * @param {number} min The minimum value the random number can be
   * @param {number} max The maximum value the random number can be
   * @returns {number} A generated number
   */
  static randomNumber(min: number, max: number): number {
    return Math.ceil(Math.random() * (max - min) + min);
  }

  /**
   * Generates a random string of the given length
   * @param {number} length The length of the string
   * @returns {string} The generated string
   */
  static randomString(length: number): string {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  /**
   * Generates a random hash
   * @param {string} password The password to be hashed
   * @param {string} salt Random string generated for the password
   * @returns {string} The random hash
   */
  static sha256(password: string, salt: string): string {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
  }

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
  static hashPassword(password: string): Hash {
    const salt = this.randomString(16);
    return {
      salt,
      hash: this.sha256(password, salt),
    };
  }
}
