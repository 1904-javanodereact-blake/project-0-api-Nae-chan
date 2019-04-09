/**
 * This holds the class for Role, which tracks what permissions
 * a user has
 */

export class Role {
  roleId: number; //primary key
  role: string; // not null, unique

  constructor(roleId = 0, role = ''){
    this.roleId = roleId;
    this.role = role;
  }
}