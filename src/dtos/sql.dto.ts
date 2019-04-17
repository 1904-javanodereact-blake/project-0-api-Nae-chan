import { Role } from '../model/role';

// This is a format converter CLASS for users; sql format to CamalCase
export class SqlUser {
    user_id: number;
    user_name: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    role: Role;
}

// This is a format converter CLASS for role; sql format to CamalCase
export class SqlRole {
    role_id = 0;
    role = undefined;
  }