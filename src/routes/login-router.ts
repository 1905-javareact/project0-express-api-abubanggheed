import express from 'express'
import { loginService } from '../services/login.service';

const router = express.Router()

router.post('', async (req, res) => {
  const { username, password } = req.body
  try {
    const { token, self } = await loginService(username, password)
    res.cookie('y-access-head', {
      val: token
    })
    res.json(self)
  } catch (error) {
    switch (error) {
      case 'wrong username':
        res.status(400)
        res.send({
          message: 'a user by that username doesn\'t exist'
        })
        break;
      case 'invalid credentials':
        res.status(401)
        res.send({
          message: 'the username and password do not match'
        })
        break;
      default:
        console.log(error)
        res.sendStatus(500)
        break;
    }
  }
})

router.delete('/', (req, res) => {
  if (req.cookies) {
    res.clearCookie('y-access-head')
  }
  res.sendStatus(205)
})

export default router
