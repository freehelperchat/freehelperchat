interface IObject {
  [key: string]: boolean | number | string | undefined;
}

class DataProvider {
  public async getData(data: IObject): Promise<IObject> {
    Promise.all(Object.keys(data).map((obj) => {
      const output: IObject = {};
      switch (key) {
        case 'time':
          switch (value) {
            case 'short':
              if (value === true) {
                output.timestamp = new Date().toDateString();
                output.showDate = true;
              }
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
      return output;
    }));
  }
}

export default new DataProvider();
