"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
/**
 * User router will handle all requests starting with
 *  /users
 */
exports.spaceshipRouter = express_1.default.Router();
/**
 * find all spaceships
 * endpoint: /spaceships
 */
exports.spaceshipRouter.get('', function (req, res) {
    console.log('retreiving all spaceships');
    res.send('all spaceships');
});
/**
 * find spaceship by id
 * endpoint: /spaceships/:id
 */
exports.spaceshipRouter.get('/:id', function (req, res) {
    console.log("retreiving spaceship with id: " + req.params.id);
    res.send("here is the spaceship with id: " + req.params.id);
});
/**
 * find spaceships by owner id
 * endpoint: /spaceships/owner/:id
 */
exports.spaceshipRouter.get('/owner/:ownerId', function (req, res) {
    console.log("retreiving spaceship with id: " + req.params.ownerId);
    res.send("here is the spaceship with id: " + req.params.ownerId);
});
exports.spaceshipRouter.post('', function (req, res) {
    console.log("creating spaceship", req.body);
    res.status(201);
    res.send('created spaceship');
});
exports.spaceshipRouter.patch('', function (req, res) {
    console.log("updating spaceship", req.body);
    res.send('updated spaceship');
});
//# sourceMappingURL=spaceship.router.js.map