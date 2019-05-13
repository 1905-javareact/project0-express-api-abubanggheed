
import bcrypt from 'bcryptjs'

export function makePassword(stringIn:string):string {
  return bcrypt.hashSync(stringIn, 10)
}

export function comparePassword(stringIn:string, storedPassword:string):boolean {
  return bcrypt.compareSync(stringIn, storedPassword)
}
