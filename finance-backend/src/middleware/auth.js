import { verifyToken } from '../utils/jwt.js'
import { errorResponse } from '../utils/response.js'

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return errorResponse(res, 'No token provided', 401)
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = verifyToken(token)
        req.user = decoded
        next()
    } catch (err) {
        return errorResponse(res, 'Invalid or expired token', 401)
    }
}

export default authenticate