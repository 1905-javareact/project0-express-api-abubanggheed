
BEGIN;

DROP TABLE IF EXISTS "role";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "reimbursement_status";
DROP TABLE IF EXISTS "reimbursement_type";
DROP TABLE IF EXISTS "reimbursement";

CREATE TABLE "role" (
  "id" SERIAL PRIMARY KEY,
  "role_name" TEXT
);

INSERT INTO "role" ("role_name") VALUES
('admin'),
('finance-manager'),
('employee');

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "role_id" NUMERIC REFERENCES "role"("id")
);

CREATE TABLE "reimbursement_status" (
  "id" SERIAL PRIMARY KEY,
  "status" TEXT
);

INSERT INTO "reimbursement_status" ("status") VALUES
  ('Pending'),
  ('Approved'),
  ('Denied');

CREATE TABLE "reimbursement_type" (
  "id" SERIAL PRIMARY KEY,
  "type" TEXT
);

INSERT INTO "reimbursement_type" ("type") VALUES
  ('Lodging'),
  ('Travel'),
  ('Food'),
  ('Other');

CREATE TABLE "reimbursement" (
  "id" SERIAL PRIMARY KEY,
  "author" NUMERIC REFERENCES "user"("id"),
  "amount" MONEY NOT NULL,
  "date_submitted" DATE DEFAULT NOW(),
  "date_resolved" DATE DEFAULT NULL,
  "description" TEXT NOT NULL,
  "resolver" NUMERIC REFERENCES "user"("id") DEFAULT NULL,
  "status" NUMERIC REFERENCES "reimbursement_status"("id") DEFAULT 1,
  "type" NUMERIC REFERENCES "reimbursement_type"("id") DEFAULT 4
);

COMMIT;
