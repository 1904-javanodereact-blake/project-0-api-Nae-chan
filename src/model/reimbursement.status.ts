/**
 * This holds the class for the reimbursments status
 * for each reimbursement submitted.
 *  */ 

 export class ReimbursementStatus {
    statusId: number; // primary key
    status: string; // not null, unique

    constructor (statusId, status){
        this.statusId = statusId;
        this.status = status;
    }
  }