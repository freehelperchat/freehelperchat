import permissionsJson from '../custom/permissions.json';
import { OperatorProps } from '../models/chat/Operator';
import { RoleProps } from '../models/chat/Role';

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
  /**
   * Checks if the given operator has the given permissions
   * @param operator The operator document
   * @param permissions The permission(s) to be checked
   * @param operation Either `OR`(0) or`AND`(1) from the `checkingOperation` enum,
   * determines if the operator needs to have all the given permissions or at least one of them
   * @returns Boolean indicating if the operator has the given permissions or not
   */
  public checkPermissions(
    operator: OperatorProps,
    permissions: string[],
    operation: checkingOperation,
  ): boolean {
    const initialLength = permissions.length;
    (operator.roles as RoleProps[]).forEach((role) => {
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
