import express from 'express'
import { getAllUsersService, getUserByIdService, patchUserByBodyService } from '../services/user.service';

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

router.patch('', async (req, res) => {
  try {
    if(req.permissions.role !== 'admin') {
      throw 'invalid credentials'
    }
    if(!req.body.id) {
      throw 'no id'
    }
    const user = await patchUserByBodyService(req.body)
    res.json(user)
  } catch (error) {
    switch (error) {
      case 'invalid credentials':
        res.status(403)
        res.send('you must be logged in as an admin')
        break;
      case 'no id':
        res.status(400)
        res.send('request body must contain an id')
        break;
      case 'no user':
        res.status(404)
        res.send('that user does not exist')
      default:
        console.log(error)
        res.status(500)
        res.send('server error')
        break;
    }
  }
})

export default router
