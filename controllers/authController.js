import { StatusCodes } from 'http-status-codes'

export const register = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: ' I am the register route' })
}
export const login = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: ' I am the login route' })
}
