import { StatusCodes } from 'http-status-codes'

export const updateUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'user updated' })
}
