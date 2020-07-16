export default interface IMessage {
  _id: string;
  chatId: string;
  operator: boolean;
  time: number;
  message: string;
  name: string;
}
