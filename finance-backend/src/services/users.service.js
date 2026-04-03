import bcrypt from 'bcryptjs'
import { getAllUsers, getUserById, createUser, updateUser, updateUserStatus, deleteUser } from '../repositories/users.repository.js'

export async function getAllUsersService() {
    const users = await getAllUsers()
    if (!users) throw new Error('No users found')
    return users
}

export async function getUserByIdService(id) {
    const user = await getUserById(id)
    if (!user) throw new Error('User not found')
    return user
}

export async function createUserService(name, email, password, role = 'viewer') {
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser(name, email, hashedPassword, role)
    return user
}

export async function updateUserService(id, fields) {
    const user = await getUserById(id)
    if (!user) throw new Error('User not found')
    const updated = await updateUser(id, fields)
    return updated
}

export async function updateUserStatusService(id, isActive) {
    const user = await getUserById(id)
    if (!user) throw new Error('User not found')
    const updated = await updateUserStatus(id, isActive)
    return updated
}

export async function deleteUserService(id) {
    const user = await getUserById(id)
    if (!user) throw new Error('User not found')
    await deleteUser(id)
}