import { Router } from 'express'
import { updateUser } from '../controllers/userController.js'
import { validateUpdateUserInput } from '../middlewares/validationMiddleware.js'
import upload from '../middlewares/multerMiddleware.js'
const router = Router()

router
  .route('/update-user')
  .patch(upload.single('avatar'), validateUpdateUserInput, updateUser)

export default router
