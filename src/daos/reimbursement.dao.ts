import { connectionPool } from '.';
import { PoolClient } from 'pg';
import { Reimbursement } from '../model/reimbursement';

/**
 * This dao retrieves reimbursement information from the database
 */

/**
 * Retrieve reimbursement information via the status ID
 */
export async function findReimbursementsByStatus(statusId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM users.reimbursements as r
      INNER JOIN users.reimbursement_status as s ON (r.status = s.status_id)
      WHERE status_id = $1 ORDER BY date_submitted`;
        const result = await client.query(queryString, [statusId]);
        const reimbursementResults = result.rows;
        if (reimbursementResults) {
            console.log(`Successfully retrieved Reimbursements with the Status Id of: ${statusId}`);
            return reimbursementResults;
        } else {
            return undefined;
        }
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
}
/**
 * Retrieve reimbursement information via User ID
 */
export async function findReimbursementsUserId(userId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM users.reimbursements WHERE author = $1 ORDER BY date_submitted`;
        const result = await client.query(queryString, [userId]);
        const reimbursementResults = result.rows;
        console.log(reimbursementResults);
        if (reimbursementResults) {
            console.log(`Successfully retrieved Reimbursements with the User ID of: ${userId}`);
            return reimbursementResults;
        } else {
            return undefined;
        }
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
}
/**
 * Add new reimbursement
 */
export async function addNewReimbursement(newReimbursement: Reimbursement) {

    let client: PoolClient;
    try {
      client = await connectionPool.connect();
      const queryString = `INSERT INTO users.reimbursements (author, amount, date_submitted,
        description, type)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const input = await client.query(queryString, [newReimbursement.author,
        newReimbursement.amount, newReimbursement.dateSubmitted, newReimbursement.description,
        newReimbursement.type]);
      return input.rows[0];
    } catch (err) {
      console.log(err);
      return undefined;
    } finally {
      client && client.release();
    }
  }
/**
 * Update reimbursement to mark approved or not
 */
export async function updateReimbursement(newReimbursement) {
    let client: PoolClient;
    try {
      client = await connectionPool.connect();
      // get the info for this id
      const checkString = `SELECT * FROM users.reimbursements WHERE reimbursement_id = $1`;
      const current = await client.query(checkString, [newReimbursement[0]]);
      const cr = current.rows[0];
      // update the old info with the new info
      let i = 0;
      for (const key in cr) {
        if (cr[key] !== newReimbursement[i] && newReimbursement[i] !== undefined) {
          if (newReimbursement[i].length > 0) {
            cr[key] = newReimbursement[i];
          }
        }
        i++;
      }
      const updateInfoString = `UPDATE users.reimbursements SET author = $2, amount = $3,
      date_submitted = $4, date_resolved = $5, description = $6,
      resolver =$7, status = $8, type = $9 WHERE reimbursement_Id = $1 RETURNING *`;
      const input = await client.query(updateInfoString, [cr.reimbursement_id, cr.author,
        cr.amount, cr.date_submitted, cr.date_resolved, cr.description, cr.resolver, cr.status, cr.type]);
        const reimbursement = input.rows[0];
      if (reimbursement) {
        return reimbursement;
      } else {
        return undefined;
      }
    } catch (err) {
      console.log(err);
      return undefined;
    } finally {
      client && client.release();
    }
  }