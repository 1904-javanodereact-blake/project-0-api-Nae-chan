"use strict";
/**
 * This holds the class for Users, which tracks users' info
 */
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(userId, username, password, firstName, lastName, email, role) {
        if (userId === void 0) { userId = 0; }
        if (username === void 0) { username = ''; }
        if (password === void 0) { password = ''; }
        if (firstName === void 0) { firstName = ''; }
        if (lastName === void 0) { lastName = ''; }
        if (email === void 0) { email = ''; }
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map