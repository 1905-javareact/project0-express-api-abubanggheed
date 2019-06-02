import { PoolClient } from "pg";
import { connectionPool } from ".";

export const getUserByUsername = async (username) => {
  let client: PoolClient
  try {
    client = await connectionPool.connect()
    let result = (await client.query(`
    select "user".id, username, password, first_name, last_name, email, role_name from reimbursement_api."user"
    join reimbursement_api."role" on "user".role_id = "role".id
    where username = $1
    `, [username])).rows
    if(result.length) {
      return result[0]
    } else {
      throw('wrong username') 
    }
  } catch (error) {
      throw error
  } finally {
    client && client.release()
  }
}
