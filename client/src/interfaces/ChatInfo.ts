import IUserData from './UserData';

export default interface IChatInfo {
  _id?: string;
  name: string;
  email: string;
  clientToken: number;
  time: {
    started: number;
    closed?: number;
    pending?: number;
  };
  department: {
    _id: string;
    name: string;
  };
  userData: IUserData[];
  status: number;
}
