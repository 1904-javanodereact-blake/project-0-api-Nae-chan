"use strict";
/**
 * This hold the class for Reimbursement, which is a single reimbursements
 * an employee would submit
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Reimbursement = /** @class */ (function () {
    function Reimbursement(reimbursementId, author, amount, dateSubmitted, dateResolved, description, resolver, status, type) {
        this.reimbursementId = reimbursementId;
        this.author = author;
        this.amount = amount;
        this.dateSubmitted = dateSubmitted;
        this.dateResolved = dateResolved;
        this.description = description;
        this.resolver = resolver;
        this.status = status;
        this.type = type;
    }
    return Reimbursement;
}());
exports.Reimbursement = Reimbursement;
//# sourceMappingURL=reimbursement.js.map