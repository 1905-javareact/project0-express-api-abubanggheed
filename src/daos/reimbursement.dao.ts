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

export const postReimbursement = async newReiumbursement => {
  let client: PoolClient
  let { author, amount, description, type } = newReiumbursement
  try {
    client = await connectionPool.connect()
    await client.query(`begin`)
    const id = (await client.query(`
      insert into reimbursement_api.reimbursement ("author", "amount", "description", "type")
      values ($1, $2, $3, $4) returning id
    `, [author, amount, description, type])).rows[0].id
    await client.query(`commit`)
    const postedReiumbursement = (await client.query(`
    select reimbursement_info.*, "user".username as resolver_name from reimbursement_api.reimbursement_info
    left join reimbursement_api."user" on "user".id = reimbursement_info.resolver
    where reimbursement_info.id = $1
    `, [id])).rows[0]
    return postedReiumbursement
  } catch (error) {
    await client.query(`rollback`)
    throw error
  } finally {
    client && client.release()
  }
}
