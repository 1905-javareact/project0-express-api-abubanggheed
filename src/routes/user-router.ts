import express from 'express'
import { getAllUsersService, getUserByIdService, patchUserByBodyService } from '../services/user.service';
import { checkRole, checkRoleAndId } from '../middleware/authorization-middleware';

const router = express.Router()

router.get('', [checkRole('finance-manager'), async (req, res) => {
  try {
    let allUsers = await getAllUsersService()
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
