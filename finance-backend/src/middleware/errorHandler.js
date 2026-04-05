import { errorResponse } from '../utils/response.js'

const errorHandler = (err, req, res, next) => {
    console.error(err.stack)

    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'

    return errorResponse(res, message, statusCode)
}

export default errorHandler