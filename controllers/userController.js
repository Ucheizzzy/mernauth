import { StatusCodes } from 'http-status-codes'
import { hashedPassword } from '../utils/passwordUtils.js'

import User from '../models/userModel.js'

export const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = await hashedPassword(req.body.password)
  }
  const updateUser = await User.findByIdAndUpdate(
    req.user.userId,
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      },
    },
    { new: true }
  )
  res.status(StatusCodes.OK).json({ msg: 'user updated', user: updateUser })
}

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.user.userId)
  res.status(StatusCodes.OK).json({ msg: 'User deleted successfully' })
}
