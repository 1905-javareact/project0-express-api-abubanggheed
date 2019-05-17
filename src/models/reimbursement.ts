
export class Reimbursement {
  id: number
  authorId: number
  authorName: string
	amount: string
  dateSubmitted: string
  dateResolved: string
  description: string
  resolverId: number
  resolverName: string
  statusId: number
  status: string
  typeId: number
  type: string
  constructor(id:number, authorId:number, authorName:string, amount:string,
    dateSubmitted:string, dateResolved:string, description:string, resolverId:number,
    resolverName:string, statusId:number, status:string, typeId:number, type:string) {
      this.id = id
      this.authorId = authorId
      this.authorName = authorName
      this.amount = amount
      this.dateSubmitted = dateSubmitted
      this.dateResolved = dateResolved
      this.description = description
      this.resolverId = resolverId
      this.resolverName = resolverName
      this.statusId = statusId
      this.status = status
      this.typeId = typeId
      this.type = type
  }
}