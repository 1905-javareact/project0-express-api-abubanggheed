
BEGIN;

-- all passwords are hashed from 'password'
INSERT INTO "user" (username, "password", first_name, last_name, email, role_id) values
('godmode','$2a$10$9Gob83Rzothq6Hw4yVHSOOhnAaDvIyeNozjzGRTjGWTdYTxErSRQa',
'Ad', 'Min', 'admin@cia.gov', 1),
('fanny', '$2a$10$9Gob83Rzothq6Hw4yVHSOOhnAaDvIyeNozjzGRTjGWTdYTxErSRQa',
'Finny', 'Ants', 'finnyants@manager.coffee', 2),
('manny', '$2a$10$9Gob83Rzothq6Hw4yVHSOOhnAaDvIyeNozjzGRTjGWTdYTxErSRQa',
'Manny', 'Anger', 'mannyanger@finance.coffee', 2),
('buddy', '$2a$10$9Gob83Rzothq6Hw4yVHSOOhnAaDvIyeNozjzGRTjGWTdYTxErSRQa',
'Air', 'Bud', 'airbud@esdn.com', 3),
('patom', '$2a$10$9Gob83Rzothq6Hw4yVHSOOhnAaDvIyeNozjzGRTjGWTdYTxErSRQa',
'Princly', 'Adams', 'definatelynotheman@piracybay.com', 3),
('gng', '$2a$10$9Gob83Rzothq6Hw4yVHSOOhnAaDvIyeNozjzGRTjGWTdYTxErSRQa',
'Grandma', 'and_Grandpa', 'gng@awol.com', 3),
('valac', '$2a$10$9Gob83Rzothq6Hw4yVHSOOhnAaDvIyeNozjzGRTjGWTdYTxErSRQa',
'Vala', 'Sea', 'valac@geegnome.us', 3),
('dsmear', '$2a$10$9Gob83Rzothq6Hw4yVHSOOhnAaDvIyeNozjzGRTjGWTdYTxErSRQa',
'Doctor', 'Smear', 'dsmear@cornhub.gov', 3);

COMMIT;
