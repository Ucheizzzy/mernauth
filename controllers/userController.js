import { StatusCodes } from 'http-status-codes'
import { hashedPassword } from '../utils/passwordUtils.js'
import { formatImage } from '../middlewares/multerMiddleware.js'
import cloudinary from 'cloudinary'
import User from '../models/userModel.js'

export const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, req.body)
  res.status(StatusCodes.OK).json({ msg: 'user updated', user: updatedUser })
}
