import express from 'express';
import { User } from '../model/user';
import { authMiddleware, userIdAuthMiddleware } from '../middleware/auth.middleware';
import * as usersDao from '../daos/user.dao';

/**
 * User router will handle all requests starting with
 *  /users
 */
export const userRouter = express.Router();

/**
 * find all users
 * endpoint: /users
 */
userRouter.get('', // [authMiddleware(['Admin', 'Finance Manager']),
  async (req, res) => {
    console.log('retreiving all users');
    const users = await usersDao.findAllUsers();
    res.json(users);
  });

/**
 * find user by id
 * endpoint: /users/:id
 */
userRouter.get('/:id', [authMiddleware(['Admin', 'Finance Manager']),
 async (req, res) => {
  const id: number = +req.params.id;
  console.log(`retreiving user with id: ${id}`);
  const users = await usersDao.findUserById (id);
  if (users) {
    res.json(users);
  } else {
    res.sendStatus(404);
  }
}]);

/**
 * Submit a new user
 * endpoint: /users
 */
userRouter.post('', [authMiddleware(['Admin']),
async (req, res) => {
  const user: User = req.body;
  user.userId = Math.floor(Math.random() * 10000000);
  // user.role = 3;
  const newUser = await usersDao.addNewUsers(user);
  if (newUser) {
  res.status(201).send(newUser);
  } else {
    res.status(400).send('New user was not added. Please Check entry.');
  }
}]);

/**
 * Update user
 * endpoint: /users/:userid
 */
userRouter.patch('/:userId', [userIdAuthMiddleware(['Admin', 'Finance Manager']), async (req, res) => {
  const id: number = +req.params.userId;
  const {username, password, firstName, lastName, email, role } = req.body;
  console.log('input:', id, username, password, firstName, lastName, email, role);
  const getUser = await usersDao.updateUser (id, username, password, firstName, lastName, email, role);
  console.log(`updating user`);
  if (getUser) {
    res.send(getUser);
  } else {
    res.sendStatus(404);
  }
}]);


