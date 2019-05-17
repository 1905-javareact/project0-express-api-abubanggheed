import { PoolClient } from "pg";
import { connectionPool } from ".";

export const getRoleIdByRoleName = async roleName => {
  let client: PoolClient
  try {
    client = await connectionPool.connect()
    const role = (await client.query(`
      select * from reimbursement_api."role"
      where role_name = $1
    `, [roleName]
    )).rows[0]
    return role.id
  } catch (error) {
    throw error
  } finally {
    client && client.release()
  }
}
