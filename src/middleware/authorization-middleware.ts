import session from 'express-session'

export const applyAuthorizations = (req, res, next) => {
  console.log(req.session)
  req.permissions = {
    id: 0, // id will be 0 if authorization fails
    auths: []
  }
  if(req.session && req.session.user) {
    req.permissions.auths =  req.session.user.roles
    req.permissions.id = req.session.user.id
  }
  next()
}

const sessionConfig = {
  secret: process.env.SERVER_SESSION_SECERET,
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false
}

export const sessionMiddleware = session(sessionConfig)
