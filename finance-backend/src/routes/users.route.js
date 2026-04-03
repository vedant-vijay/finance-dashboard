import { Router } from 'express'
import { getAllUsersController, getUserByIdController, getMeController, createUserController, updateUserController, updateUserStatusController, deleteUserController } from '../controllers/users.controller.js'
import authenticate from '../middleware/auth.js'

const router = Router()

router.get('/me', authenticate, getMeController)
router.get('/', authenticate, getAllUsersController)
router.get('/:id', authenticate, getUserByIdController)
router.post('/', authenticate, createUserController)
router.patch('/:id', authenticate, updateUserController)
router.patch('/:id/status', authenticate, updateUserStatusController)
router.delete('/:id', authenticate, deleteUserController)

export default router