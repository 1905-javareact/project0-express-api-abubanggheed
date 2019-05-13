
export const applyAuthorizations = (req, res, next) => {
  req.admin = {
    id: 0,
    auths: []
  }
  next()
}
