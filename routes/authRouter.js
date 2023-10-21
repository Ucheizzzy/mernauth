import { Router } from 'express'
const router = Router()
import { login, register } from '../controllers/authController.js'
import _default from 'concurrently'
import { validateRegisterInput } from '../middlewares/validationMiddleware.js'

router.route('/register').post(validateRegisterInput, register)
router.route('/login').post(login)

export default router
