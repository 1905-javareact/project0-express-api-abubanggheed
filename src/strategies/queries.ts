
export let userByUsernameQuery = `
  SELECT * FROM reimbursement_api."user" WHERE "username" = $1
  JOIN reimbursement_api."role" ON "user"."roleId" = "role"."id";
`

export let selectUsersQuery = `
  SELECT * FROM reimbursement_api."user" ORDER BY "id"
  JOIN reimbursement_api."role" ON "user"."roleId" = "role"."id";
`

export let userByIdQuery = `
  SELECT * FROM reimbursement_api."user" WHERE "id" = $1
  JOIN reimbursement_api."role" ON "user"."roleId" = "role"."id;
`

export let patchUserfieldQuery = `
  UPDATE reimbursement_api."user" SET $1 = $2 WHERE "id" = $3;
`

export let reimbursementsByStatusQuery = `
  SELECT * FROM reimbursement_api."reimbursement" WHERE "status"."type = $1
  AND "reimbursement"."date" >= $2 AND "reimbursement"."date" <= $3
  JOIN reimbursement_api."status" ON "status"."id" = "reimbursement"."statusId";
`

export let reimbursementByUserQuery = `
  SELECT * FROM reimbursement_api."reimbursement" WHERE "userId" = $1
  AND "date" >= $2 AND "date" <= $3;
`

export let patchReimbursementfieldQuery = `
  UPDATE reimbursement_api."reimbursement" SET $1 = $2 WHERE "id" = $3;
`
