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

  public get(...names: string[]): number {
    let finalPermissions = 0;
    names.forEach((permission) => {
      const current = permissionsJson.list.indexOf(permission);
      if (current < 0) return;
      finalPermissions |= current;
    });
    return finalPermissions;
  }

  public has = (operator: OperatorProps, permission: string): boolean => {
    const operatorPermissions = this.getPermissions(operator);
    const finalPermissions = this.get(permission);
    return (operatorPermissions & finalPermissions) > 0;
  }

  public or = (operator: OperatorProps, ...permissions: string[]): boolean => {
    const operatorPermissions = this.getPermissions(operator);
    const finalPermissions = this.get(...permissions);
    return (operatorPermissions & finalPermissions) > 0;
  }

  public and = (operator: OperatorProps, ...permissions: string[]): boolean => {
    const operatorPermissions = this.getPermissions(operator);
    const finalPermissions = this.get(...permissions);
    return (operatorPermissions & finalPermissions) === finalPermissions;
  }
}

export default new PermissionManager();
