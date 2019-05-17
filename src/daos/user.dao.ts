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

export const getUserById = async (id) => {
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
