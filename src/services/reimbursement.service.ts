import { getReimbursmentsByStatus, getReimbursmentsByUserID, postReimbursement, updateReimbursement } from "../daos/reimbursement.dao";
import { reimbursementDTO } from "../dtos/reimbursement.dto";
import { convertReimbursementDTO } from "../strategies/reimbursement-conversion";

export const getReimbursmentsByStatusService = async (statusId, start, end) => {
  try {
    const reimbursements:reimbursementDTO[] = await getReimbursmentsByStatus(statusId, start, end)
    return reimbursements.map(convertReimbursementDTO)
  } catch (error) {
    throw error
  }
}

export const getReimbursmentsByUserIdService = async (userId, start, end) => {
  try {
    const reimbursements:reimbursementDTO[] = await getReimbursmentsByUserID(userId, start, end)
    return reimbursements.map(convertReimbursementDTO)
  } catch (error) {
    throw error
  }
}

export const postReimbursementService = async postData => {
  try {
    const newReimbursement:reimbursementDTO = await postReimbursement(postData)
    return convertReimbursementDTO(newReimbursement)
  } catch (error) {
    throw error
  }
}

export const patchReimbursementService = async patchData => {
  try {
    const patchedReimbursement:reimbursementDTO = await updateReimbursement(patchData)
    return convertReimbursementDTO(patchedReimbursement)
  } catch (error) {
    throw error
  }
}
