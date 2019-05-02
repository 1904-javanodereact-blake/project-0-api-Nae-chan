import express = require('express');
import * as usersDao from '../daos/user.dao';

/**
 * This login router will handle all requests starting with
 *  /login
 */

export const loginRouter = express.Router();

loginRouter.post('', async (req, res) => {
    const { username, password } = req.body;
    const user = await usersDao.findLogInInfo(username, password);
    if (user) {
      // attach the user data to the session object
      req.session.user = user;
      // res.json(user);
      res.send(user);
    } else {
      res.status(400).send('Invalid Credentials. TRY AGAIN');
    }
  });