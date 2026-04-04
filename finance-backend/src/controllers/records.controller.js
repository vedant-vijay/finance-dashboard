import { getAllRecordsService, getRecordByIdService, createRecordService, updateRecordService, softDeleteRecordService } from '../services/records.service.js'
import { successResponse, errorResponse } from '../utils/response.js'

export async function getAllRecordsController(req, res) {
    try {
        const filters = req.query
        const records = await getAllRecordsService(filters)
        return successResponse(res, records, 200)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}

export async function getRecordByIdController(req, res) {
    try {
        const record = await getRecordByIdService(req.params.id)
        return successResponse(res, record, 200)
    } catch (err) {
        return errorResponse(res, err.message, 404)
    }
}

export async function createRecordController(req, res) {
    try {
        const { amount, type, category, date, notes } = req.body
        const userId = req.user.id
        const record = await createRecordService(userId, amount, type, category, date, notes)
        return successResponse(res, record, 201)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}

export async function updateRecordController(req, res) {
    try {
        const record = await updateRecordService(req.params.id, req.body)
        return successResponse(res, record, 200)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}

export async function softDeleteRecordController(req, res) {
    try {
        await softDeleteRecordService(req.params.id)
        return successResponse(res, { message: 'Record deleted successfully' }, 200)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}