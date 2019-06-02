
export const corsFilter = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${req.headers.origin}`) // this is a hack, remove later
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}
