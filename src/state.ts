import { Role } from "./models/role";
import { User } from "./models/user";

export const roles = [
  new Role(1, 'admin'),
  new Role(2, 'finance-manager'),
  new Role(3, 'user')
]

export const users = [
  new User(1, 'theadmin', '$2a$10$9Gob83Rzothq6Hw4yVHSOOhnAaDvIyeNozjzGRTjGWTdYTxErSRQa',
  'Ad', 'Min', 'admin@admin.coffee', roles[0]),
  new User(2, 'finny', '$2a$10$9Gob83Rzothq6Hw4yVHSOOhnAaDvIyeNozjzGRTjGWTdYTxErSRQa',
  'Finny', 'Ance', 'finnyance@manager.coffee', roles[1]),
  new User(3, 'manny', '$2a$10$9Gob83Rzothq6Hw4yVHSOOhnAaDvIyeNozjzGRTjGWTdYTxErSRQa',
  'Man', 'Ager', 'manager@finance.coffee', roles[1])
]
