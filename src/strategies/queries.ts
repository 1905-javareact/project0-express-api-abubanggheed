
export let userByUsernameQuery = `
  SELECT * FROM "user" WHERE "username" = $1
  JOIN "role" ON "user"."roleId" = "role"."id";
`

export let selectUsersQuery = `
  SELECT * FROM "user" ORDER BY "id"
  JOIN "role" ON "user"."roleId" = "role"."id";
`

export let userByIdQuery = `
  SELECT * FROM "user" WHERE "id" = $1
  JOIN "role" ON "user"."roleId" = "role"."id;
`

export let patchUserfieldQuery = `
  UPDATE "user" SET $1 = $2 WHERE "id" = $3;
`

export let reimbursementsByStatusQuery = `
  SELECT * FROM "reimbursement" WHERE "status"."type = $1
  AND "reimbursement"."date" >= $2 AND "reimbursement"."date" <= $3
  JOIN "status" ON "status"."id" = "reimbursement"."statusId";
`

export let reimbursementByUserQuery = `
  SELECT * FROM "reimbursement" WHERE "userId" = $1
  AND "date" >= $2 AND "date" <= $3;
`

export let patchReimbursementfieldQuery = `
  UPDATE "reimbursement" SET $1 = $2 WHERE "id" = $3;
`
