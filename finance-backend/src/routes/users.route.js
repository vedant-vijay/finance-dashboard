import { Router } from 'express'
import { getAllUsersController, getUserByIdController, getMeController, createUserController, updateUserController, updateUserStatusController, deleteUserController } from '../controllers/users.controller.js'
import authenticate from '../middleware/auth.js'
import requireRole from '../middleware/roleGuard.js'

const router = Router()

router.get('/me', authenticate, getMeController)
router.get('/', authenticate,requireRole('admin'), getAllUsersController)
router.get('/:id', authenticate, requireRole('admin'), getUserByIdController)
router.post('/', authenticate, requireRole('admin'), createUserController)
router.patch('/:id', authenticate,requireRole('admin'), updateUserController)
router.patch('/:id/status', authenticate,requireRole('admin'), updateUserStatusController)
router.delete('/:id', authenticate,requireRole('admin'),  deleteUserController)

export default router