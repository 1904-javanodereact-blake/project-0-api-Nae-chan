"use strict";
/**
 * This holds the class for Role, which tracks what permissions
 * a user has
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Role = /** @class */ (function () {
    function Role(roleId, role) {
        if (roleId === void 0) { roleId = 0; }
        if (role === void 0) { role = ''; }
        this.roleId = roleId;
        this.role = role;
    }
    return Role;
}());
exports.Role = Role;
//# sourceMappingURL=role.js.map