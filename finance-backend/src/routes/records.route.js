import { Router } from 'express'
import { getAllRecordsController, getRecordByIdController, createRecordController, updateRecordController, softDeleteRecordController } from '../controllers/records.controller.js'
import authenticate from '../middleware/auth.js'
import requireRole from '../middleware/roleGuard.js'

const router = Router()

router.get('/', authenticate, requireRole('admin', 'analyst', 'viewer'), getAllRecordsController)
router.get('/:id', authenticate, requireRole('admin', 'analyst', 'viewer'), getRecordByIdController)
router.post('/', authenticate, requireRole('admin', 'analyst'), createRecordController)
router.patch('/:id', authenticate, requireRole('admin', 'analyst'), updateRecordController)
router.delete('/:id', authenticate, requireRole('admin'), softDeleteRecordController)

export default router