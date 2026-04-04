import { errorResponse } from '../utils/response.js'

const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return errorResponse(res, 'Access denied', 403)
        }
        next()
    }
}

export default requireRole