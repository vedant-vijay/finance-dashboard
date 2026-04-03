import { Router } from 'express'
import { registerController, loginController, refreshController, logoutController } from '../controllers/auth.controller.js'
import authenticate from '../middleware/auth.js'

const router = Router()

router.post('/register', registerController)
router.post('/login', loginController)
router.post('/refresh', refreshController)
router.post('/logout', authenticate, logoutController)

export default router