import { Router } from 'express'
import { deleteUser, updateUser } from '../controllers/userController.js'

const router = Router()

router.route('/update-user').patch(updateUser)
router.route('/delete-user').delete(deleteUser)

export default router
