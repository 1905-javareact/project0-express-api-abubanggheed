import express from 'express'
import { checkRole, checkRoleAndId } from '../middleware/authorization-middleware';
import { getReimbursmentsByStatusService, getReimbursmentsByUserIdService, postReimbursementService, patchReimbursementService } from '../services/reimbursement.service';

const router = express.Router()

router.get('/status/:statusId', [checkRole('finance-manager'), async (req, res) => {
  try {
    let { start, end, limit, offset } = req.query
    if(limit > 100) {
      limit = 100
    }
    const reimbursements = await getReimbursmentsByStatusService(req.params.statusId, start, end, limit, offset)
    res.json(reimbursements)
  } catch (error) {
    switch (error) {
      default:
        console.log(error)
        res.status(500)
        res.send('server error')
        break;
    }
  }
}])

router.get('/author/userId/:id', [checkRoleAndId('finance-manager'), async (req, res) => {
  try {
    let { start, end, limit, offset } = req.query
    if(limit > 100) {
      limit = 100
    }
    const reimbursements = await getReimbursmentsByUserIdService(req.params.id, start, end, limit, offset)
    res.json(reimbursements)
  } catch (error) {
    switch (error) {
      default:
        console.log(error)
        res.status(500)
        res.send('server error')
        break;
    }
  }
}])

router.post('', [checkRole('employee'), async (req, res) => {
  let reimbursement = {
    author: req.permissions.id,
    amount: req.body.amount,
    description: req.body.description,
    type: req.body.type
  }
  try {
    for(let key in reimbursement) {
      if (reimbursement[key] === undefined) {
        throw 'invalid post data'
      }
    }
    const newReimbursement = await postReimbursementService(reimbursement)
    res.status(201)
    res.json(newReimbursement)
  } catch (error) {
    switch (error) {
      case 'invalid post data':
        res.status(400)
        res.send('you must fill out all required fields')
        break;
    
      default:
        console.log(error)
        res.status(500)
        res.send('server error')
        break;
    }
  }
}])

router.patch('', [ checkRole('finance-manager'), async (req, res) => {
try {
  let reimbursementData = {
    ...req.body,
    id: req.body.reimbursementId,
    user: req.permissions.id
  }
  if(!reimbursementData.id) {
    throw 'missing id'
  }
  const patchedReimbursement = await patchReimbursementService(reimbursementData)
  res.json(patchedReimbursement)
} catch (error) {
  switch (error) {
    case 'missing id':
      res.status(400)
      res.send('cannot recognize the reimbursement id from the body of this request')
      break;
  
    default:
      res.status(500)
      res.send('server error')
      break;
  }
}
}])

export default router
