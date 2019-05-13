import express from 'express'
import { comparePassword } from '../strategies/authentication-strategy';
import { users } from '../state';
import jwt from 'jsonwebtoken';
import jwtConfig from '../jwtconfig';

const router = express.Router()

router.post('', (req, res) => {
  const { username, password } = req.body
  const user = users.find(user => user.username === username)
  if (user && password && comparePassword(password, user.password)) {
    req.session.user = user
    const token = jwt.sign({
      userId: user.userId,
      username: user.username,
      role: user.role
    },
      jwtConfig.jwtSecret,
      { expiresIn: '1h' })
    res.send(token)
  } else if (user && password) {
    res.status(401)
    res.send('the username and password do not match')
  } else {
    res.status(400)
    res.send('invalid fields')
  }
})

export default router
