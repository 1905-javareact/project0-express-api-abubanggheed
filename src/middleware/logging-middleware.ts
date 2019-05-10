
export const loggingMiddleware = (req, res, next):void => {
  console.log(`recieved request at ${req.url} and method ${req.method}
  `)
  next()
  console.log('done with request\n')
}
