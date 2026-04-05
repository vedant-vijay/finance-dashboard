import { errorResponse } from '../utils/response.js'

const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body)
        if (!result.success) {
            const errors = result.error.errors.map(e => ({
                field: e.path.join('.'),
                message: e.message
            }))
            return errorResponse(res, errors, 400)
        }
        req.body = result.data
        next()
    }
}

export default validate