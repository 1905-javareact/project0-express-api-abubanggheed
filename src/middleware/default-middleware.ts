
export const defaultResponse = (req, res) => {
  //next()
  if(!res.finished) {
    console.log('sending 404')
    res.status(404)
    res.send('this route does not exist')
  }
}