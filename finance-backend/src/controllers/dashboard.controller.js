import { getSummaryService, getCategoryTotalsService, getTrendsService, getRecentActivityService } from '../services/dashboard.service.js'
import { successResponse, errorResponse } from '../utils/response.js'

export async function getSummaryController(req, res) {
    try {
        const summary = await getSummaryService()
        return successResponse(res, summary, 200)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}

export async function getCategoryTotalsController(req, res) {
    try {
        const categories = await getCategoryTotalsService()
        return successResponse(res, categories, 200)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}

export async function getTrendsController(req, res) {
    try {
        const trends = await getTrendsService()
        return successResponse(res, trends, 200)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}

export async function getRecentActivityController(req, res) {
    try {
        const activity = await getRecentActivityService()
        return successResponse(res, activity, 200)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}