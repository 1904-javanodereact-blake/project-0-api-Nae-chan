// import express from 'express';
// import { authMiddleware } from '../middleware/auth.middleware';
// import { reimbursementsArray } from '../Reimbursements.sample';
// import { ReimbursementStatus } from '../model/reimbursement.status';
// /**
//  * reimbursements router will handle all requests starting with
//  *  /reimbursement
//  */
// export const reimbursementsRouter = express.Router();
// /**
//  * find all reimbursements
//  * endpoint: /reimbursements
//  */
// reimbursementsRouter.get('', [authMiddleware(['admin']),
//     (req, res) => {
//       console.log('retreiving all reimbursements');
//       res.json();
//     }]);
//   /**
//    * find reimbursement status by id
//    * endpoint: /reimbursment/status/:id
//    */
//   reimbursementsRouter.get('/status/:statusId', (req, res) => {
//     const reimbursementId: number = +req.params.statusId;
//     console.log(`retreiving reimbursement status: ${ReimbursementStatus}`);
//     const reimbursementStatusId = reimbursementsArray.find(r => r.statusId === statusId);
//     if (reimbursementStatusId) {
//       res.json(reimbursementId);
//     } else {
//       res.sendStatus(404);
//     }
//   });
//# sourceMappingURL=reimbursements.router.js.map