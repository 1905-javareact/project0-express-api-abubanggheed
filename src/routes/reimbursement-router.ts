import express from 'express'
import { checkRole } from '../middleware/authorization-middleware';
import { getReimbursmentsByStatusService } from '../services/reimbursement.service';

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

router.get('/author/userId/:userId', (req, res) => {
  console.log(req.query)
  res.json({
    temp: ['reimbursement'],
    permissions: ['finance-manager', 'user:userId']
  })
})

router.post('', (req, res) => {
  res.status(201)
  res.json({
    temp: 'reimbursement'
  })
})

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
