import { StatusCodes } from 'http-status-codes'

export const updateUser = async (req, res) => {
  const newUser = { ...req.body }
  delete newUser.password
  res.status(StatusCodes.OK).json({ msg: 'user updated' })
}
