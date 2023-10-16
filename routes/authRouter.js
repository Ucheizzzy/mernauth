import { Router } from 'express'
const router = Router()
import { login, register } from '../controllers/authController.js'
import _default from 'concurrently'

router.route('/register').post(register)
router.route('/login').post(login)

export default router
