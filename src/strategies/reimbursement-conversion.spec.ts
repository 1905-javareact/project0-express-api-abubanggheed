import { reimbursementDTO } from "../dtos/reimbursement.dto";
import { convertReimbursementDTO } from "./reimbursement-conversion";
import { Reimbursement } from "../models/reimbursement";

describe('reimbursement conversion tests', () => {
  const dto1 = {
    id: 1,
    author_id: 1,
    author: 'me',
    amount: '$10.00',
    date_submitted: '2020-20-20',
    date_resolved: null,
    description: 'test',
    resolver: 2,
    resolver_name: 'also me',
    status_id: 2,
    status: 'approved',
    type_id: 1,
    type: 'travel'
  }
  const dto2 = new reimbursementDTO()
  let reimbursement1 = convertReimbursementDTO(dto1)
  let reimbursement2 = convertReimbursementDTO(dto2)
  test('our converter should be able to predict the user converted from a dto', () => {
    expect(reimbursement1).toMatchObject({
      id: 1,
      authorId: 1,
      authorName: 'me',
      amount: '$10.00',
      dateSubmitted: '2020-20-20',
      dateResolved: null,
      description: 'test',
      resolverId: 2,
      resolverName: 'also me',
      statusId: 2,
      status: 'approved',
      typeId: 1,
      type: 'travel'
    })
  })
  test('our result should be recognized as a user', () => {
    expect(reimbursement1).toBeInstanceOf(Reimbursement)
  })
  test('all user fields may be undefined', () => {
    expect(reimbursement2).toMatchObject({
      id: undefined,
      authorId: undefined,
      authorName: undefined,
      amount: undefined,
      dateSubmitted: undefined,
      dateResolved: undefined,
      description: undefined,
      resolverId: undefined,
      resolverName: undefined,
      statusId: undefined,
      status: undefined,
      typeId: undefined,
      type: undefined
    })
  })
})
