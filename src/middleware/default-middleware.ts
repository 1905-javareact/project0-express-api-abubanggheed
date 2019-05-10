
export const defaultResponse = (req, res, next) => {
  next()
  if(!res.finished) {
    res.status(404)
    res.send('this route does not exist')
  }
}