import { Router } from 'express'
const router = Router()
import {
  google,
  login,
  logout,
  register,
} from '../controllers/authController.js'
import _default from 'concurrently'
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middlewares/validationMiddleware.js'
import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { msg: 'IP rate limit exceeded, retry in 15 minutes.' },
})

router.route('/register').post(apiLimiter, validateRegisterInput, register)
router.route('/login').post(apiLimiter, validateLoginInput, login)
router.route('/google').post(google)
router.route('/logout').get(logout)

export default router
