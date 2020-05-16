class Mongotype {
  /**
   * Transforms an enum into an Array
   * @param e The enum to be transformed
   * @returns Array containing the string indexes of the enum
   */
  public enumToArray<T>(e: T): string[] {
    return Object.keys(e).filter((key) => /^\D/.test(key));
  }
}

export default new Mongotype();
