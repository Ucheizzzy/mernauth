import 'express-async-errors'
import express from 'express'
const app = express()
import * as dotenv from 'dotenv'
import morgan from 'morgan'
dotenv.config()
import mongoose from 'mongoose'
import authRouter from './routes/authRouter.js'
// middlewares
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/v1/auth', authRouter)

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'Hello' })
})

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'Not-found!!' })
})
//error handler middleware
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 3000

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`server is running on port ${port}..`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
