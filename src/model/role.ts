/**
 * This holds the class for Role, which tracks what permissions
 * a user has
 */

export class Role {
  roleId: number; // primary key
  role: string; // not null, unique

  constructor(roleId = 3, role = 'Employee') {
    this.roleId = roleId;
    this.role = role;
  }
}