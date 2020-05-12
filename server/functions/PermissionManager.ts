import permissionsJson from '../custom/permissions.json';
import { OperatorDoc } from '../models/chat/Operator';
import { RoleDoc } from '../models/chat/Role';

export enum permissionOperation {
  Assign,
  Remove,
}

export enum checkingOperation {
  OR,
  AND,
}

export interface PermissionChange {
  operation: permissionOperation;
  permission: string;
}

export const Permissions = permissionsJson;

class PermissionManager {
  public checkPermissions(
    operator: OperatorDoc,
    permissions: string[],
    operation: checkingOperation,
  ): boolean {
    const initialLength = permissions.length;
    (operator.roles as RoleDoc[]).forEach((role) => {
      role.permissions.forEach((permission) => {
        if (permission === Permissions.all) {
          permissions.splice(0, permissions.length);
        }
        if (permissions.includes(permission)) {
          permissions.splice(permissions.indexOf(permission), 1);
        }
      });
    });
    switch (operation) {
      case checkingOperation.OR:
        return permissions.length < initialLength;
      case checkingOperation.AND:
        return permissions.length === 0;
      default:
        return false;
    }
  }
}

export default new PermissionManager();
