import { getReimbursmentsByStatus } from "../daos/reimbursement.dao";
import { reimbursementDTO } from "../dtos/reimbursement.dto";
import { convertReimbursementDTO } from "../strategies/reimbursement-conversion";

export const getReimbursmentsByStatusService = async type => {
  try {
    const reimbursements:reimbursementDTO[] = await getReimbursmentsByStatus(type)
    return reimbursements.map(convertReimbursementDTO)
  } catch (error) {
    throw error
  }
}
