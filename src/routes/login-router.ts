import express from 'express'

const router = express.Router()

router.post('', (req, res) => {
  res.status(400)
  res.send('invalid credentials')
})

export default router
