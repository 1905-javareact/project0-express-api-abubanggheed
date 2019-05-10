import express from 'express'

const router = express.Router()

router.get('/status/:statusId', (req, res) => {
  console.log(req.query)
  res.json({
    temp: ['reimbursement'],
    permissions: 'finance-manager'
  })
})

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
