import { Pool } from 'pg'

export const connectionPool = new Pool({
  user: process.env['MUSIC_API_USERNAME'],
  host: process.env['MUSIC_API_HOST'],
  database: process.env['MUSIC_API_DBNAME'],
  password: process.env['MUSIC_API_PASSWORD'],
  port: 5432,
  max: 5,
})
