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
      if (permissionsJson[permission as keyof typeof permissionsJson]) {
        const arr = [
          permission,
          ...permissionsJson[permission as keyof typeof permissionsJson] as string[],
        ];
        arr.forEach((p) => {
          finalPermissions |= 2 ** Object.keys(permissionsJson).indexOf(p);
        });
      }
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
