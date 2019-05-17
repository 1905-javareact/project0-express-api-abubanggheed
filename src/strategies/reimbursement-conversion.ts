import { reimbursementDTO } from "../dtos/reimbursement.dto";
import { Reimbursement } from "../models/reimbursement";

export const convertReimbursementDTO = (reimbursement:reimbursementDTO) => (
  new Reimbursement(
    reimbursement.id,
    reimbursement.author_id,
    reimbursement.author,
    reimbursement.amount,
    reimbursement.date_submitted,
    reimbursement.date_resolved,
    reimbursement.description,
    reimbursement.resolver,
    reimbursement.resolver_name,
    reimbursement.status_id,
    reimbursement.status,
    reimbursement.type_id,
    reimbursement.type
  )
)
