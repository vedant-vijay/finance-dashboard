import { Router } from 'express'
import { getAllRecordsController, getRecordByIdController, createRecordController, updateRecordController, softDeleteRecordController } from '../controllers/records.controller.js'
import authenticate from '../middleware/auth.js'
import requireRole from '../middleware/roleGuard.js'
import validate from '../middleware/validate.js'
import { createRecordSchema, updateRecordSchema } from '../schemas/records.schema.js'

const router = Router()

router.get('/', authenticate, requireRole('admin', 'analyst', 'viewer'), getAllRecordsController)
router.get('/:id', authenticate, requireRole('admin', 'analyst', 'viewer'), getRecordByIdController)
router.post('/', authenticate, requireRole('admin', 'analyst'), validate(createRecordSchema), createRecordController)
router.patch('/:id', authenticate, requireRole('admin', 'analyst'), validate(updateRecordSchema), updateRecordController)
router.delete('/:id', authenticate, requireRole('admin'), softDeleteRecordController)

export default router