import { Router } from 'express'
import { updateUser } from '../controllers/userController.js'

const router = Router()

router.route('/update-user').patch(updateUser)

export default router
