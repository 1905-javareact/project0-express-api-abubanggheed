import express from 'express'
import { comparePassword } from '../strategies/authentication-strategy';
import { users } from '../state';

const router = express.Router()

router.post('', (req, res) => {
  const {username, password} = req.body
  const user = users.find(user => user.username === username)
  if(user && password && comparePassword(password, user.password)) {
    req.session.user = user
    res.send('You are logged in')
  } else if(user && password) {
    res.status(401)
    res.send('the username and password do not match')
  } else {
    res.status(400)
    res.send('invalid fields')
  }
})

export default router
