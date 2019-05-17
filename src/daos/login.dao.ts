import { PoolClient } from "pg";
import { connectionPool } from ".";

export const getUserByUsername = async (username) => {
  let client: PoolClient
  try {
    client = await connectionPool.connect()
    let result = (await client.query(`
      SELECT * FROM reimbursement_api."user" WHERE username = $1
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
