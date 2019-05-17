import express from 'express'
import { getAllUsersService } from '../services/user.service';

const router = express.Router()

router.get('', async (req, res) => {
  try {
    if(!['admin', 'finance-manager'].includes(req.permissions.role)) {
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

router.get('/:id', (req, res) => {
  res.json({
    temp: 'user',
    permissions: ['finance-manager', 'user:id']
  })
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
