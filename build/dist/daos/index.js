"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
console.log({
    user: process.env['SHIP_DB_USERNAME'],
    host: process.env['SHIP_DB_URL'] || 'localhost',
    database: process.env['SHIP_DB_NAME'] || 'postgres',
    password: process.env['SHIP_DB_PASSWORD'],
    port: 5432,
    max: 5,
});
exports.connectionPool = new pg_1.Pool({
    user: process.env['SHIP_DB_USERNAME'],
    host: process.env['SHIP_DB_URL'] || 'localhost',
    database: process.env['SHIP_DB_NAME'] || 'postgres',
    password: process.env['SHIP_DB_PASSWORD'],
    port: 5432,
    max: 5,
});
//# sourceMappingURL=index.js.map