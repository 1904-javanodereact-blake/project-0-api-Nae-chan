/**
 * This holds the class for the reimbursments status
 * for each reimbursement submitted.
 */

export class ReimbursementType {
    typeId: number; // primary key
    type: string; // not null, unique

    constructor (typeId, type) {
        this.typeId = typeId;
        this.type = type;
    }
  }