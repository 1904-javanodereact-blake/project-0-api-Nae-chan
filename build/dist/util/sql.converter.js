"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../model/user");
var role_1 = require("../model/role");
// This is a format converter for users; sql format to CamalCase
function convertSqlUser(user) {
    return new user_1.User(user.user_id, user.user_name, user.password, user.firstname, user.lastname, user.email, user.role);
}
exports.convertSqlUser = convertSqlUser;
// This is a format converter for roles; sql format to CamalCase
function convertSqlRole(role) {
    return new role_1.Role(role.role_id, role.role);
}
exports.convertSqlRole = convertSqlRole;
//# sourceMappingURL=sql.converter.js.map