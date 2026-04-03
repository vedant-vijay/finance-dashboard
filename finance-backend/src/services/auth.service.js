import bcrypt from 'bcryptjs'
import { findUserByEmail, createUser, updateRefreshToken, findUserByRefreshToken } from '../repositories/auth.repository.js'
import { signToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.js'

export async function register(name, email, password, role = 'viewer') {
    const existing = await findUserByEmail(email)
    if (existing) throw new Error('Email already in use')

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser(name, email, hashedPassword, role)

    return { user }
}

export async function login(email, password) {
    const user = await findUserByEmail(email)
    if (!user) throw new Error('Invalid credentials')

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('Invalid credentials')

    const accessToken = signToken({ id: user.id, role: user.role })
    const refreshToken = signRefreshToken({ id: user.id, role: user.role })

    await updateRefreshToken(user.id, refreshToken)

    return { user: { name: user.name, email: user.email, role: user.role }, accessToken, refreshToken }
}

export async function refresh(refreshToken) {
    const user = await findUserByRefreshToken(refreshToken)
    if (!user) throw new Error('Invalid refresh token')

    verifyRefreshToken(refreshToken)

    const accessToken = signToken({ id: user.id, role: user.role })

    return { accessToken }
}

export async function logout(userId) {
    await updateRefreshToken(userId, null)
}