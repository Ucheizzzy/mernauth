import { StatusCodes } from 'http-status-codes'
import { hashedPassword } from '../utils/passwordUtils.js'
import { formatImage } from '../middlewares/multerMiddleware.js'
import cloudinary from 'cloudinary'
import User from '../models/userModel.js'

export const updateUser = async (req, res) => {
  const newUser = { ...req.body }
  //   delete newUser.password
  if (req.body.password) {
    newUser.password = await hashedPassword(req.body.password)
  }
  if (req.file) {
    const file = formatImage(req.file)
    const response = await cloudinary.v2.uploader.upload(file)
    newUser.avatar = response.secure_url
    newUser.avatarPublicId = response.public_id
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser)

  if (req.file && updateUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updateUser.avatarPublicId)
  }
  res.status(StatusCodes.OK).json({ msg: 'user updated', user: updatedUser })
}
