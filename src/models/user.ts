import { Role } from "./role";

export class User {
  userId: number // primary key
	username: string // not null, unique
	password: string // not null
	firstName: string // not null
	lastName: string // not null
	email: string // not null
	role: Role // not null
	constructor(id:number, username:string, password:string,
		fName:string, lName:string, email:string, role:Role) {
			this.userId = id
			this.username = username
			this.password = password
			this.firstName = fName
			this.lastName = lName
			this.email = email
			this.role = role
	}
}
