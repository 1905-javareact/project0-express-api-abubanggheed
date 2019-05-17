import { PoolClient } from "pg";
import { connectionPool } from ".";

export const getReimbursmentsByStatus = async status => {
  let client: PoolClient
  try {
    client = await connectionPool.connect()
    const reimbursements = (await client.query(`
    select reimbursement_info.*, "user".username as resolver_name from reimbursement_api.reimbursement_info
    left join reimbursement_api."user" on "user".id = reimbursement_info.resolver
    where status_id = $1
    order by date_submitted;
    `, [status])).rows
    return reimbursements
  } catch (error) {
    throw error
  } finally {
    client && client.release()
  }
}

export const getReimbursmentsByUserID = async userId => {
  let client: PoolClient
  try {
    client = await connectionPool.connect()
    const reimbursements = (await client.query(`
    select reimbursement_info.*, "user".username as resolver_name from reimbursement_api.reimbursement_info
    left join reimbursement_api."user" on "user".id = reimbursement_info.resolver
    where author_id = $1
    order by date_submitted;
    `, [userId])).rows
    return reimbursements
  } catch (error) {
    throw error
  } finally {
    client && client.release()
  }
}
