import express from 'express'

const router = express.Router()

router.get('', (req, res) => {
  res.json({
    temp: ['all users'],
    permissions: ['finance-manager']
  })
})

router.get('/:id', (req, res) => {
  res.json({
    temp: 'user',
    permissions: ['finance-manager', 'user:id']
  })
})

router.patch('', (req, res) => {
  if(req.body.id) {
    res.status(202)
    res.json({
      temp: 'user (updated)',
      permissions: ['finance-manager'],
    })
  } else {
    res.sendStatus(400)
  }
})

export default router
