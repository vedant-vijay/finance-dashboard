import { Router } from 'express'
import { registerController, loginController, refreshController, logoutController } from '../controllers/auth.controller.js'
import authenticate from '../middleware/auth.js'
import validate from '../middleware/validate.js'
import { registerSchema, loginSchema } from '../schemas/auth.schema.js'
import { authLimiter } from '../middleware/rateLimiter.js'


const router = Router()

router.post('/register', authLimiter, validate(registerSchema), registerController)
router.post('/login', authLimiter, validate(loginSchema), loginController)
router.post('/refresh', refreshController)
router.post('/logout', authenticate, logoutController)

export default router