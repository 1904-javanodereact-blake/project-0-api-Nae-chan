import express from 'express';
import { authMiddleware, userIdAuthMiddleware } from '../middleware/auth.middleware';
import * as reimbursementDao from '../daos/reimbursement.dao';
import { Reimbursement } from '../model/reimbursement';
// import { reimbursementsArray } from '../Reimbursements.sample';
// import { ReimbursementStatus } from '../model/reimbursement.status';

/**
 * reimbursements router will handle all requests starting with
 *  /reimbursement
 */
export const reimbursementsRouter = express.Router();

/**
 * find reimbursements by statusId
 * endpoint: /reimbursements/status/:statusId
 */
reimbursementsRouter.get('/status/:statusId', // , [authMiddleware(['Admin', 'Finance Manager']),
    async (req, res) => {
        const statusId: number = +req.params.statusId;
      console.log('retreiving all reimbursements. Status ID is ', statusId);
      const reimbursements = await reimbursementDao.findReimbursementsByStatus(statusId);
      if (reimbursements) {
        res.json(reimbursements);
      } else {
        res.sendStatus(404).send(`Please enter a valid status ID.
        1--Pending, 2--Approved, 5--Denied`);
      }
    });
/**
 * find reimbursements by User
 * endpoint: /reimbursements/author/userId/:userId
 */
reimbursementsRouter.get('/author/userId/:userId', [userIdAuthMiddleware(['Admin', 'Finance Manager']),
    async (req, res) => {
        const userId: number = +req.params.userId;
      console.log('retreiving all reimbursements by the user ID of ', userId);
      const reimbursements = await reimbursementDao.findReimbursementsUserId(userId);
      if (reimbursements) {
        res.json(reimbursements);
      } else {
        res.status(404).send('Please enter a valid User ID.');
      }
    }]);
/**
 * Submit a new reimbursement
 * endpoint: /reimbursements
 */
reimbursementsRouter.post('', async (req, res) => {
    const reimbursement: Reimbursement = req.body;
    reimbursement.dateSubmitted = new Date().toISOString().slice(0, 10);
    console.log('This is the input', reimbursement);
    const newReimbursement = await reimbursementDao.addNewReimbursement(reimbursement);
    if (newReimbursement) {
    res.status(201).send(newReimbursement);
    } else {
        res.status(400).send('Reimbursement not submitted. Please Check entry.');
    }
  });
/**
 * Update reimbursements
 * endpoint: /reimbursements
 */
reimbursementsRouter.patch('', [authMiddleware(['Admin', 'Finance Manager']), async (req, res) => {
    const {reimbursementId, author, amount, dateSubmitted, dateResolved, description,
        resolver, status, type } = req.body;
    const newInputArray = [reimbursementId, author, amount, dateSubmitted, dateResolved, description,
        resolver, status, type];
    console.log(newInputArray);
    const getReimbursement = await reimbursementDao.updateReimbursement(newInputArray);
    // const { body } = req; // destructuring
    console.log(`updating user`);
    if (getReimbursement) {
      res.send(getReimbursement);
    } else {
      res.sendStatus(404);
    }
  }]);