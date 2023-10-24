import { UnauthenticatedError } from '../errors/customeErrors.js'
import { verifyJWT } from '../utils/tokenUtils.js'

export const authenticatedUser = (req, res, next) => {
  const { token } = req.cookies
  if (!token) throw new UnauthenticatedError('authentication invalid')

  try {
    const { userId, role } = verifyJWT(token)
    req.user = { userId, role }
    next()
  } catch (error) {
    throw new UnauthenticatedError('invalid authentication')
  }
}
