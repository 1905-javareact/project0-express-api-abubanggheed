
export class User {
  userId: number // primary key
	username: string // not null, unique
	firstName: string // not null
	lastName: string // not null
	email: string // not null
	role: string // not null
	constructor(id:number, username:string, fName:string,
		lName:string, email:string, role:string) {
			this.userId = id
			this.username = username
			this.firstName = fName
			this.lastName = lName
			this.email = email
			this.role = role
	}
}
