import express = require("express");
import { usersArray } from "../usersArray";

 /**
 * This login router will handle all requests starting with
 *  /login
 */
export const loginRouter = express.Router();

loginRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = usersArray.find(u => u.username === username && u.password === password); //TODO: Replace with DB
  
    if (user) {
      // attach the user data to the session object
      req.session.user = user;
      res.end();
    } else {
      res.sendStatus(401);
    }
  })