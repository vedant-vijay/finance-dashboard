import { getAllUsersService, getUserByIdService, createUserService, updateUserService, updateUserStatusService, deleteUserService } from '../services/users.service.js'
import { successResponse, errorResponse } from '../utils/response.js'

export async function getAllUsersController(req, res) {
    try {
        const users = await getAllUsersService()
        return successResponse(res, users, 200)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}

export async function getUserByIdController(req, res) {
    try {
        const user = await getUserByIdService(req.params.id)
        return successResponse(res, user, 200)
    } catch (err) {
        return errorResponse(res, err.message, 404)
    }
}

export async function getMeController(req, res) {
    try {
        const user = await getUserByIdService(req.user.id)
        return successResponse(res, user, 200)
    } catch (err) {
        return errorResponse(res, err.message, 404)
    }
}

export async function createUserController(req, res) {
    try {
        const { name, email, password, role } = req.body
        const user = await createUserService(name, email, password, role)
        return successResponse(res, user, 201)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}

export async function updateUserController(req, res) {
    try {
        const user = await updateUserService(req.params.id, req.body)
        return successResponse(res, user, 200)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}

export async function updateUserStatusController(req, res) {
    try {
        const { isActive } = req.body
        const user = await updateUserStatusService(req.params.id, isActive)
        return successResponse(res, user, 200)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}

export async function deleteUserController(req, res) {
    try {
        await deleteUserService(req.params.id)
        return successResponse(res, { message: 'User deleted successfully' }, 200)
    } catch (err) {
        return errorResponse(res, err.message, 400)
    }
}