import { PoolClient } from "pg";
import { connectionPool } from ".";

export const getReimbursmentsByStatus = async status => {
  let client: PoolClient
  try {
    client = await connectionPool.connect()
    const reimbursements = (await client.query(`
    select reimbursement.id, author as author_id, "user".username as author,
    amount, date_submitted, date_resolved, description, resolver,
    reimbursement_status.id as status_id, reimbursement_status."status",
    reimbursement_type.id as type_id, reimbursement_type."type"
    from reimbursement_api.reimbursement
    join reimbursement_api.reimbursement_type on reimbursement."type" = reimbursement_type.id
    join reimbursement_api.reimbursement_status on reimbursement."status" = reimbursement_status.id
    join reimbursement_api."user" on reimbursement.author = "user".id
    where reimbursement_status.id = $1
    order by date_submitted;
    `, [status])).rows
    const resolvers = (await client.query(`
    select id, username from reimbursement_api."user"
    where role_id < 3;
    `)).rows
    return reimbursements.map(reimburse => {
      let currentResolver = resolvers.filter(resolver => +reimburse.resolver === resolver.id)[0]
      let resolverName = currentResolver ? currentResolver.username : null
      return {
        ...reimburse,
        resolver_name: resolverName
      }
    })
} catch (error) {
  throw error
} finally {
  client && client.release()
}
}
