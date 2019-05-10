import express from 'express'

const router = express.Router()

router.use('', (req, res) => {
  res.sendStatus(200)
})

export default router
