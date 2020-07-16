import IDepartment from './Department';

export default interface IOperator {
  _id: string;
  fullName: string;
  username: string;
  email?: string;
  disabled?: boolean;
  departmentIds: string[] | IDepartment[];
  allDepartments?: boolean;
  autoAccept?: boolean;
  maxActiveChats?: number;
  activeChats?: number;
  hideOnline?: boolean;
  invisibleMode?: boolean;
}
