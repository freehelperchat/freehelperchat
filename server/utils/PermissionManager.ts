import permissionsJson from '../custom/permissions.json';
import { OperatorProps } from '../models/chat/Operator';
import { RoleProps } from '../models/chat/Role';

class PermissionManager {
  // Gets the bit assigned to that permission
  public getBit = (permission: string): number => {
    const index = Object.keys(permissionsJson).indexOf(permission);
    if (index >= 0) return 2 ** index;
    return 0;
  }

  // Get the permissions bits that an operator has
  public getPerms(operator: OperatorProps): number {
    let finalPermissions = 0;
    (operator.roles as RoleProps[]).forEach((role) => {
      finalPermissions |= role.permissions;
    });
    finalPermissions |= operator.customPermissions;
    return finalPermissions;
  }

  // Gets the bits assigned to one or more permissions recursively
  public get(...permissions: string[]): number {
    const arr: string[] = [];
    let bits = 0;

    permissions.forEach((p) => {
      const permArr = permissionsJson[p as keyof typeof permissionsJson];
      if (permArr) arr.push(...permArr);
      bits |= this.getBit(p);
    });
    if (arr.length > 0) bits |= this.get(...arr);
    return bits;
  }

  // public has = (operator: OperatorProps, permission: string): boolean => {
  //   const operatorPermissions = this.getPerms(operator);
  //   const finalPermissions = this.get(permission);
  //   return (operatorPermissions & finalPermissions) > 0;
  // }

  // Checks if operator has one or many permissions
  public has = (operator: OperatorProps, ...permissions: string[]): boolean => {
    const operatorPermissions = this.getPerms(operator);
    const finalPermissions = this.get(...permissions);
    return (operatorPermissions & finalPermissions) > 0;
  }

  // public and = (operator: OperatorProps, ...permissions: string[]): boolean => {
  //   const operatorPermissions = this.getPerms(operator);
  //   const finalPermissions = this.get(...permissions);
  //   return (operatorPermissions & finalPermissions) === finalPermissions;
  // }
}

export default new PermissionManager();
