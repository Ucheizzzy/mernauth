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

router.route('/register').post(validateRegisterInput, register)
router.route('/login').post(validateLoginInput, login)
router.route('/google').post(google)
router.route('/logout').get(logout)

export default router
