import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import { hashedPassword } from '../utils/passwordUtils.js'

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0
  req.body.role = isFirstAccount ? 'admin' : 'user'
  const hashed = await hashedPassword(req.body.password)
  req.body.password = hashed
  const user = await User.create(req.body)
  res.status(StatusCodes.OK).json({ msg: 'user created', user })
}

export const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: ' I am the login route' })
}
