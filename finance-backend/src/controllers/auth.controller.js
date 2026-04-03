import { register, login, refresh, logout } from '../services/auth.service.js'
import { successResponse, errorResponse } from '../utils/response.js'

export async function registerController(req, res) {
    try {
        const { name, email, password, role } = req.body
        const result = await register(name, email, password, role)
        return successResponse(res, result, 201)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}

export async function loginController(req, res) {
    try {
        const { email, password } = req.body
        const result = await login(email, password)

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return successResponse(res, { user: result.user, accessToken: result.accessToken }, 200)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}

export async function refreshController(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return errorResponse(res, 'Refresh token required', 401)
        const result = await refresh(refreshToken)
        return successResponse(res, result, 200)
    } catch (err) {
        return errorResponse(res, err.message, 401)
    }
}

export async function logoutController(req, res) {
    try {
        await logout(req.user.id)
        res.clearCookie('refreshToken')
        return successResponse(res, { message: 'Logged out successfully' }, 200)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}