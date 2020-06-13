import permissionsJson from '../custom/permissions.json';
import { OperatorProps } from '../models/chat/Operator';
import { RoleProps } from '../models/chat/Role';

class PermissionManager {
  public getPermissions(operator: OperatorProps): number {
    let finalPermissions = 0;
    (operator.roles as RoleProps[]).forEach((role) => {
      finalPermissions |= role.permissions;
    });
    finalPermissions |= operator.customPermissions;
    return finalPermissions;
  }

  public get(...names: string[]) : number {
    if (names.length === 0) return 0;
    let finalPermissions = 0;
    names.forEach((permission) => {
      finalPermissions |= permissionsJson.list.indexOf(permission);
    });
    return finalPermissions;
  }
}

export default new PermissionManager();
