import express from 'express'
import { checkRole, checkRoleAndId } from '../middleware/authorization-middleware';
import { getReimbursmentsByStatusService, getReimbursmentsByUserIdService, postReimbursementService } from '../services/reimbursement.service';

const router = express.Router()

router.get('/status/:statusId', [checkRole('finance-manager'), async (req, res) => {
  try {
    const reimbursements = await getReimbursmentsByStatusService(req.params.statusId)
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
    const reimbursements = await getReimbursmentsByUserIdService(req.params.id)
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

router.patch('', (req, res) => {
  if(req.body.id) {
    res.status(202)
    res.json({
      temp: 'reimbursement',
      permissions: ['finance-manager']
    })
  } else {
    res.sendStatus(400)
  }
})

export default router
