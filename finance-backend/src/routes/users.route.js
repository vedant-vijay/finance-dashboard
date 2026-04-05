import { Router } from 'express'
import { getAllUsersController, getUserByIdController, getMeController, createUserController, updateUserController, updateUserStatusController, deleteUserController } from '../controllers/users.controller.js'
import authenticate from '../middleware/auth.js'
import requireRole from '../middleware/roleGuard.js'
import validate from '../middleware/validate.js'
import { createUserSchema, updateUserSchema, updateUserStatusSchema } from '../schemas/users.schema.js'

const router = Router()

router.get('/me', authenticate, getMeController)
router.get('/', authenticate,requireRole('admin'), getAllUsersController)
router.get('/:id', authenticate, requireRole('admin'), getUserByIdController)
router.post('/', authenticate, requireRole('admin'), validate(createUserSchema), createUserController)
router.patch('/:id', authenticate, requireRole('admin'), validate(updateUserSchema), updateUserController)
router.patch('/:id/status', authenticate, requireRole('admin'), validate(updateUserStatusSchema), updateUserStatusController)
router.delete('/:id', authenticate,requireRole('admin'),  deleteUserController)

export default router