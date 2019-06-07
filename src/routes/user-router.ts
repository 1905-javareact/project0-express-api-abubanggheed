import express from 'express'
import { getAllUsersService, getUserByIdService, patchUserByBodyService } from '../services/user.service';
import { checkRole, checkRoleAndId } from '../middleware/authorization-middleware';

const router = express.Router()

router.get('', [checkRole('finance-manager'), async (req, res) => {
  try {
    let { limit, offset } = req.query
    if(limit > 100 || isNaN(limit)) {
      limit = 100
    }
    let allUsers = await getAllUsersService(limit || 100, offset || 0)
    res.json(allUsers)
  } catch (error) {
    switch (error) {
      default:
        res.status(500)
        res.send('server error')
        break;
    }
  }
}])

router.get('/self', async (req:any, res) => {
  try {
    let { id } = req.permissions
    if(!id) {
      throw 'not logged in'
    }
    let selfToSend = await getUserByIdService(id)
    if(!selfToSend) {
      throw 'user doesnt exist'
    }
    res.json(selfToSend)
  } catch (error) {
    switch (error) {
      case 'not logged in':
        res.sendStatus(204)
        break;
      case 'user doesnt exist':
        res.status(404).send({
          message: 'that user does not exist anymore'
        })
      default:
        res.sendStatus(500)
        break;
    }
  }
})

router.get('/:id', [checkRoleAndId('finance-manager'), async (req, res) => {
  try {
    let { id } = req.params
    let userToSend = await getUserByIdService(id)
    if(!userToSend) {
      throw 'user not found'
    }
    res.json(userToSend)
  } catch (error) {
    switch (error) {
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
}])

router.patch('', [checkRole('admin'), async (req, res) => {
  try {
    if(!req.body.id) {
      throw 'no id'
    }
    const user = await patchUserByBodyService(req.body)
    res.json(user)
  } catch (error) {
    switch (error) {
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
}])

export default router
