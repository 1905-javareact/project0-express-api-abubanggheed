import express from 'express'
import bodyParser from 'body-parser'
import { loggingMiddleware } from './middleware/logging-middleware';
import loginRouter from './routes/login-router'
import userRouter from './routes/user-router'
import reimbursementRouter from './routes/reimbursement-router'
import { defaultResponse } from './middleware/default-middleware';

// module constants
const PORT: number = 9050
const app = express()

// middleware
app.use(bodyParser.json())
app.use(loggingMiddleware)
app.use(defaultResponse)

// routes
app.use('/login', loginRouter)
app.use('/user', userRouter)
app.use('/reimbursement', reimbursementRouter)

// main loop
app.listen(PORT, ():void => {
  console.log(`app is running on port ${PORT}`)
})
