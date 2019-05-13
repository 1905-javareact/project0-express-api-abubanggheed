import session from 'express-session'

export const applyAuthorizations = (req, res, next) => {
  req.permissions = {
    id: 0, // id will be 0 if authorization fails
    role: ''
  }
  if(req.session && req.session.user) {
    req.permissions.role =  req.session.user.role
    req.permissions.id = req.session.user.id
  }
  next()
}

const sessionConfig = {
  secret: process.env.SERVER_SESSION_SECERET || 'secret',
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false
}

export const sessionMiddleware = session(sessionConfig)
