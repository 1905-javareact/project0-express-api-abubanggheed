import { getReimbursmentsByStatus, getReimbursmentsByUserID, postReimbursement, updateReimbursement } from "../daos/reimbursement.dao";
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

export const getReimbursmentsByUserIdService = async userId => {
  try {
    const reimbursements:reimbursementDTO[] = await getReimbursmentsByUserID(userId)
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
