// import permissions from '../custom/permissions.json';

export enum permissionOperation {
  Assign,
  Remove,
}

export interface PermissionChange {
  operation: permissionOperation | string;
  permission: string;
}

class PermissionManager {
  // public checkPermission(permission: string): boolean {
  //     if(permissions[permission])
  // }

  public aaa(): void {
    console.log(typeof permissionOperation);
    Object.keys(permissionOperation).map((key) => console.log(key));
  }
}

export default new PermissionManager();
