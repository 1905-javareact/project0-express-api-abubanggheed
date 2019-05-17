
export class reimbursementDTO {
  id: number
  author_id: number
  author: string
  amount: string
  date_submitted: string
  date_resolved: string | null
  description: string
  resolver: number | null
  resolver_name: string | null
  status_id: number
  status: string
  type_id: number
  type: string
}
