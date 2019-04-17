import { User } from '../model/user';
import { Role } from '../model/role';
import { SqlUser, SqlRole } from '../dtos/sql.dto';

// This is a format converter for users; sql format to CamalCase
export function convertSqlUser(user: SqlUser) {
  return new User(user.user_id, user.user_name, user.password, user.firstname, user.lastname, user.email, user.role);
}
// This is a format converter for roles; sql format to CamalCase
export function convertSqlRole(role: SqlRole) {
  return new Role(role.role_id, role.role);
}