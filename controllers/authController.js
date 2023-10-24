import { StatusCodes } from 'http-status-codes'
import User from '../models/userModel.js'
import { comparedPassword, hashedPassword } from '../utils/passwordUtils.js'
import { BadRequestError } from '../errors/customeErrors.js'
import { createJWT } from '../utils/tokenUtils.js'

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0
  req.body.role = isFirstAccount ? 'admin' : 'user'
  const hashed = await hashedPassword(req.body.password)
  req.body.password = hashed
  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({ msg: 'user created' })
}

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  const isValidator =
    user && (await comparedPassword(req.body.password, user.password))
  if (!isValidator) throw new BadRequestError('invalid credentials')
  //set the payload for the jwt created
  const token = createJWT({ userId: user._id, role: user.role })
  //set up cookie and pass the token
  const oneDay = 1000 * 60 * 60 * 24
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
  })

  res.status(StatusCodes.OK).json({ msg: 'user logged in successfully', user })
}

export const google = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  // so if the exist just grant access by create token and cookie, no need for password checks
  if (user) {
    const token = createJWT({ userId: user._id, role: user.role })
    //set up cookie and pass the token
    const oneDay = 1000 * 60 * 60 * 24
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    })
    res.status(StatusCodes.OK).json({ msg: 'Google user logged in', user })
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8)
    const hashed = await hashedPassword(generatedPassword)
    const googleUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashed,
      avatar: req.body.avatar,
    })
    await googleUser.save()
    const token = createJWT({ userId: googleUser._id, role: googleUser.role })
    //set up cookie and pass the token
    const oneDay = 1000 * 60 * 60 * 24
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    })
    res
      .status(StatusCodes.OK)
      .json({ msg: 'Google auth successful', user: googleUser })
  }
}
export const logout = async (req, res) => {
  res
    .clearCookie('token')
    .status(StatusCodes.OK)
    .json({ msg: 'user logout successful' })
}
