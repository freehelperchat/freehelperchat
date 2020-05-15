class Mongotype {
  public enumToArray<T>(e: T): string[] {
    return Object.keys(e).filter((key) => /^\D/.test(key));
  }
}

export default new Mongotype();
