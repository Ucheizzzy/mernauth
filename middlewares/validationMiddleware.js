import { body, param, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/customeErrors.js'
import User from '../models/userModel.js'
const withValidationErrors = (validationValues) => {
  return [
    validationValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg)
        throw new BadRequestError(errorMessage)
      }
      next()
    },
  ]
}

export const validateRegisterInput = withValidationErrors([
  body('username').notEmpty().withMessage('You cannot be nameless'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('please enter a valid email')
    .custom(async (email) => {
      const user = await User.findOne({ email })
      if (user) {
        throw new BadRequestError('email already exist')
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 5 })
    .withMessage('password must be at least 5 characters'),
])

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('Email field cannot be empty')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Please enter the password you registered with'),
])
