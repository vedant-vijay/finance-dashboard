import { Router } from 'express'
import { getSummaryController, getCategoryTotalsController, getTrendsController, getRecentActivityController } from '../controllers/dashboard.controller.js'
import authenticate from '../middleware/auth.js'
import requireRole from '../middleware/roleGuard.js'

const router = Router()

router.get('/summary', authenticate, requireRole('admin', 'analyst', 'viewer'), getSummaryController)
router.get('/categories', authenticate, requireRole('admin', 'analyst', 'viewer'), getCategoryTotalsController)
router.get('/trends', authenticate, requireRole('admin', 'analyst', 'viewer'), getTrendsController)
router.get('/recent', authenticate, requireRole('admin', 'analyst', 'viewer'), getRecentActivityController)

export default router