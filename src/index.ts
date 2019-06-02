import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { loggingMiddleware } from './middleware/logging-middleware';
import loginRouter from './routes/login-router'
import userRouter from './routes/user-router'
import reimbursementRouter from './routes/reimbursement-router'
import { defaultResponse } from './middleware/default-middleware';
import { applyAuthorizations } from './middleware/authorization-middleware';
import { corsFilter } from './middleware/cors-filter-middleware';

// module constants
const PORT: number = 9050
const app = express()

// middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(corsFilter)
app.use(loggingMiddleware)

// routes
app.use('/login', loginRouter)
app.use(applyAuthorizations)
app.use('/users', userRouter)
app.use('/reimbursements', reimbursementRouter)

// setup express event
app.use(defaultResponse)
app.listen(PORT, ():void => {
  console.log(`app is running on port ${PORT}`)
})
