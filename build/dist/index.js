"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var users_router_1 = require("./routers/users.router");
var spaceship_router_1 = require("./routers/spaceship.router");
var session_middleware_1 = require("./middleware/session.middleware");
var login_router_1 = require("./routers/login.router");
var app = express_1.default();
app.use(function (req, res, next) {
    console.log("request made with url: " + req.url + " and method: " + req.method);
    var headers = req.rawHeaders;
    console.log(headers);
    next();
});
app.use(body_parser_1.default.json());
app.use(session_middleware_1.sessionMiddleware);
/**
 * Register Routers
 */
app.use('/login', login_router_1.loginRouter);
app.use('/users', users_router_1.userRouter);
app.use('/spaceships', spaceship_router_1.spaceshipRouter);
app.listen(8080);
console.log('end of index');
//# sourceMappingURL=index.js.map