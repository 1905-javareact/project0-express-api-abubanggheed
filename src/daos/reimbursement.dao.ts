import { PoolClient } from "pg";
import { connectionPool } from ".";

const joinResolverToInfoQuery = `
select reimbursement_info.*, "user".username as resolver_name from reimbursement_api.reimbursement_info
left join reimbursement_api."user" on "user".id = reimbursement_info.resolver
`

export const getReimbursmentsByStatus = async (status, start, end, limit, offset) => {
  let client: PoolClient
  try {
    client = await connectionPool.connect()
    const reimbursements = (await client.query(`
    ${joinResolverToInfoQuery}
    where status_id = $1 and date_submitted between $2 and $3
    order by date_submitted limit $4 offset $5;
    `, [status, start, end, limit, offset])).rows
    return reimbursements
  } catch (error) {
    console.log(error)
    throw error
  } finally {
    client && client.release()
  }
}

export const getReimbursmentsByUserID = async (userId, start, end, limit, offset) => {
  let client: PoolClient
  try {
    client = await connectionPool.connect()
    const reimbursements = (await client.query(`
    ${joinResolverToInfoQuery}
    where author_id = $1 and date_submitted between $2 and $3
    order by date_submitted limit $4 offset $5
    `, [userId, start, end, limit, offset])).rows
    return reimbursements
  } catch (error) {
    console.log(error)
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
    ${joinResolverToInfoQuery}
    where reimbursement_info.id = $1
    `, [id])).rows[0]
    return postedReiumbursement
  } catch (error) {
    client && await client.query(`rollback`)
    console.log(error)
    throw error
  } finally {
    client && client.release()
  }
}

export const updateReimbursement = async reimbursement => {
  let client:PoolClient
  let { id, author, amount, dateSubmitted, dateResolved, description,
    resolver, status, type, user } = reimbursement
  try {
    client = await connectionPool.connect()
    const oldReimbursement = (await client.query(`
      select * from reimbursement_api.reimbursement where id = $1
    `, [id])).rows[0]
    const newReimbursement = [
      author || oldReimbursement.author,
      amount || oldReimbursement.amount,
      dateSubmitted || oldReimbursement.date_submitted,
      dateResolved || oldReimbursement.date_resolved,
      description || oldReimbursement.description,
      resolver || oldReimbursement.resolver,
      status || oldReimbursement.status,
      type || oldReimbursement.type
    ]
    if(!newReimbursement[5] && (oldReimbursement.status === 1 &&
      newReimbursement[6] !== 1)) {
        newReimbursement[5] = user
        newReimbursement[3] = 'now()' // dev-ops issue: timezone
    }
    await client.query(`begin`)
    await client.query(`
      update reimbursement_api.reimbursement set author = $1, amount = $2,
      date_submitted = $3, date_resolved = $4, description = $5, resolver = $6,
      status = $7, type = $8 where id = $9
    `, [...newReimbursement, id])
    await client.query(`commit`)
    const updatedReimbursement = (await client.query(`
    ${joinResolverToInfoQuery}
    where reimbursement_info.id = $1
    `, [id])).rows[0]
    return updatedReimbursement
  } catch (error) {
    client && await client.query(`rollback`)
    console.log(error)
    throw error
  }
}
