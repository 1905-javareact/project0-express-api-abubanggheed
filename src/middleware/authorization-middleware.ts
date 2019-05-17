import jwt from 'jsonwebtoken';
import jwtconfig from '../jwtconfig';

export const applyAuthorizations = (req, res, next) => {
  req.permissions = {
    id: 0, // id will be 0 if authorization fails
    role: ''
  }
  let token = req.cookies['x-access-token'] || req.cookies['authorization']
  try {
    let credentials = token && jwt.verify(token.val, jwtconfig.jwtSecret)
    if (credentials) {
      req.permissions = credentials
    }
  } catch (error) {
    console.log(error)
  }
  next()
}

const roles = ['employee', 'finance-manager', 'admin']

export const checkRole = role => (req, res, next) => {
  if(roles.indexOf(req.permissions.role) < roles.indexOf(role)) {
    res.status(401)
    res.json({
      message: 'The incoming token has expired'
    })
  } else {
    next()
  }
}

export const checkRoleAndId = role => (req, res, next) => {
  if(roles.indexOf(req.permissions.role) < roles.indexOf(role)
  && +req.permissions.id !== req.params.id){
    res.status(401)
    res.json({
      message: 'The incoming token has expired'
    })
  } else {
    next()
  }
}
