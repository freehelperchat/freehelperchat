import IOperator from './Operator';

export default interface IOnlineOperator {
  _id: string;
  operator: IOperator;
  socket: string;
  time: number;
  __v: number;
}
