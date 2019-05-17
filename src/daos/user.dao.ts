import { PoolClient } from "pg";
import { connectionPool } from ".";

export const getAllUsers = async () => {
  let client: PoolClient
  try {
    client = await connectionPool.connect()
    let result = (await client.query(`
    select "user".id, username, first_name, last_name, email, role_name from reimbursement_api."user"
    join reimbursement_api."role" on "user".role_id = "role".id
    order by "user".id;
    `)).rows
    return result
  } catch (error) {
    throw error
  } finally {
    client && client.release()
  }
}

export const getUserById = async id => {
  let client: PoolClient
  try {
    client = await connectionPool.connect()
    let result = (await client.query(`
    select "user".id, username, first_name, last_name, email, role_name from reimbursement_api."user"
    join reimbursement_api."role" on "user".role_id = "role".id
    where "user".id = $1;
    `, [id])).rows[0]
    return result
  } catch (error) {
    throw error
  } finally {
    client && client.release()
  }
}

export const patchUserByFields = async fields => {
  let client: PoolClient
  try {
    client = await connectionPool.connect()
    await client.query(`begin`)
    const updatedUser = await client.query(`
      update reimbursement_api."user" set username = $1, first_name = $2,
      last_name = $3, email = $4, role_id = $5
      where id = $6
      returning "user".id, username, first_name, last_name, email
    `, [fields.username, fields.first_name, fields.last_name, fields.email,
    fields.role_id, fields.id])
    await client.query(`commit`)
    return updatedUser
  } catch (error) {
    await client && client.query(`rollback`)
    throw error
  } finally {
    client && client.release()
  }
}
