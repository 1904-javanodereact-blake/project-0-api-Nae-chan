"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var sql_converter_1 = require("../util/sql.converter");
/**
 * This connects the database to retrieve user for log in
 */
function findLogInInfo(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var client, queryString, result, user, convertedUser, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    queryString = "SELECT * FROM users.users as u INNER JOIN\n      users.roles_table as r ON (u.role = r.role_id) WHERE user_name = $1 AND password = $2";
                    return [4 /*yield*/, client.query(queryString, [username, password])];
                case 2:
                    result = _a.sent();
                    user = result.rows[0];
                    if (user) {
                        convertedUser = sql_converter_1.convertSqlUser(user);
                        convertedUser.role = sql_converter_1.convertSqlRole(user);
                        return [2 /*return*/, convertedUser];
                    }
                    else {
                        return [2 /*return*/, undefined];
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [2 /*return*/, undefined];
                case 4:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.findLogInInfo = findLogInInfo;
/**
 * This connects the database to retrieve user information
 */
function findAllUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var client, result, usersResult, convertedUser, i, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("SELECT * FROM users.users as u INNER JOIN\n    users.roles_table as r ON (u.role = r.role_id)")];
                case 2:
                    result = _a.sent();
                    usersResult = result.rows;
                    convertedUser = result.rows.map(sql_converter_1.convertSqlUser);
                    if (usersResult) {
                        for (i = 0; i < usersResult.length; i++) {
                            convertedUser[i].role = sql_converter_1.convertSqlRole(usersResult[i]);
                        }
                        return [2 /*return*/, convertedUser];
                    }
                    else {
                        return [2 /*return*/, undefined];
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    console.log(err_2);
                    return [2 /*return*/, undefined];
                case 4:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.findAllUsers = findAllUsers;
/**
 * This connects the database to retrieve user information by id
 */
function findUserById(id) {
    return __awaiter(this, void 0, void 0, function () {
        var client, queryString, result, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    queryString = 'SELECT * FROM users.users WHERE user_id = $1';
                    return [4 /*yield*/, client.query(queryString, [id])];
                case 2:
                    result = _a.sent();
                    console.log(result.fields[0]);
                    return [2 /*return*/, sql_converter_1.convertSqlUser(result.rows[0])];
                case 3:
                    err_3 = _a.sent();
                    console.log(err_3);
                    return [2 /*return*/, undefined];
                case 4:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.findUserById = findUserById;
// NEEDS WORK!!!!!!!!!!
function addNewUsers(newUser) {
    return __awaiter(this, void 0, void 0, function () {
        var client, queryString, input, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('this is in the function ', newUser);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 2:
                    client = _a.sent();
                    queryString = "INSERT INTO users.users (user_id, user_name, password, firstname,\n      lastname, email, role) VALUES ($1, $2, $3, $4, $5, $6, $7);";
                    return [4 /*yield*/, client.query(queryString, [newUser.userId, newUser.username,
                            newUser.password, newUser.firstName, newUser.lastName, newUser.email, newUser.role])];
                case 3:
                    input = _a.sent();
                    console.log(input.rows[0]);
                    debugger;
                    return [2 /*return*/, sql_converter_1.convertSqlUser(input.rows[0])];
                case 4:
                    err_4 = _a.sent();
                    console.log(err_4);
                    return [2 /*return*/, undefined];
                case 5:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.addNewUsers = addNewUsers;
/**
 * This connects the database to retrieve user information and updates fields
 */
function updateUser(id, username, password, firstName, lastName, email, role) {
    return __awaiter(this, void 0, void 0, function () {
        var array, client, checkString, userInfo, ui, i, key, updateInfoString, input, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    array = [id, username, password, firstName, lastName, email, role];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 2:
                    client = _a.sent();
                    checkString = "SELECT * FROM users.users WHERE user_id = $1";
                    return [4 /*yield*/, client.query(checkString, [id])];
                case 3:
                    userInfo = _a.sent();
                    console.log('step 3', userInfo.rows);
                    ui = userInfo.rows[0];
                    i = 0;
                    for (key in ui) {
                        if (ui[key] !== array[i] && array[i] !== undefined) {
                            if (array[i].length > 0) {
                                console.log(array[i].length);
                                ui[key] = array[i];
                            }
                        }
                        i++;
                    }
                    updateInfoString = "UPDATE users.users SET user_name = $1,\n    password =  $2, firstname = $3, lastname = $4, email = $5,\n    role = $6 WHERE user_id = $7 RETURNING *";
                    return [4 /*yield*/, client.query(updateInfoString, [ui.user_name, ui.password, ui.firstname, ui.lastname, ui.email, ui.role, ui.user_id])];
                case 4:
                    input = _a.sent();
                    return [2 /*return*/, input.rows[0]];
                case 5:
                    err_5 = _a.sent();
                    console.log(err_5);
                    return [2 /*return*/, undefined];
                case 6:
                    client && client.release();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.updateUser = updateUser;
//# sourceMappingURL=user.dao.js.map