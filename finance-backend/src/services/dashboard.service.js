import { getSummary, getCategoryTotals, getTrends, getRecentActivity } from '../repositories/dashboard.repository.js'

export async function getSummaryService() {
    return await getSummary()
}

export async function getCategoryTotalsService() {
    return await getCategoryTotals()
}

export async function getTrendsService() {
    return await getTrends()
}

export async function getRecentActivityService() {
    return await getRecentActivity()
}