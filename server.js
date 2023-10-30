import 'express-async-errors'
import express from 'express'
const app = express()
import * as dotenv from 'dotenv'
import morgan from 'morgan'
dotenv.config()
import mongoose from 'mongoose'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
// middlewares
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'
import { authenticatedUser } from './middlewares/authMiddleware.js'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
// public
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.static(path.resolve(__dirname, './client/dist')))
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(mongoSanitize())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', authenticatedUser, userRouter)

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'Hello' })
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
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
