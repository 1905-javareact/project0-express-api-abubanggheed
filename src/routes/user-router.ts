import express from 'express'
import { getAllUsersService, getUserByIdService } from '../services/user.service';

const router = express.Router()

router.get('', async (req, res) => {
  try {
    if (!['admin', 'finance-manager'].includes(req.permissions.role)) {
      throw 'invalid credentials'
    }
    let allUsers = await getAllUsersService()
    res.json(allUsers)
  } catch (error) {
    switch (error) {
      case 'invalid credentials':
        res.status(403)
        res.send('you must be logged in as an administrator to access these resources')
        break;

      default:
        res.status(500)
        res.send('server error')
        break;
    }
  }
})

router.get('/:id', async (req, res) => {
  try {
    let { id } = req.params
    if (!['admin', 'finance-manager'].includes(req.permissions.role)
      && +req.permissions.id !== +id) {
      throw ('invalid credentials')
    }
    let userToSend = await getUserByIdService(id)
    if(!userToSend) {
      throw 'user not found'
    }
    res.json(userToSend)
  } catch (error) {
    switch (error) {
      case 'invalid credentials':
        res.status(403)
        res.send('You are not authorized to acces this information. Are you logged in?')
        break;

      case 'user not found':
        res.status(404)
        res.send('this user does not exist')
        break;

      default:
        res.status(500)
        res.send('server error')
        break;
    }
  }
})

router.patch('', (req, res) => {
  if (req.body.id) {
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
