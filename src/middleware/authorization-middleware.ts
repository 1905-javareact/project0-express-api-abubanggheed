// import session from 'express-session'
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
    req.permissions = credentials
  } catch (error) {
    console.log(error)
  }
  next()
}

// const sessionConfig = {
//   secret: process.env.SERVER_SECERET || 'secret',
//   cookie: { secure: false },
//   resave: false,
//   saveUninitialized: false
// }

// export const sessionMiddleware = session(sessionConfig)
