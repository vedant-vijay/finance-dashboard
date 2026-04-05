import { z } from 'zod'

export const createUserSchema = z.object({
    name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
    password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
    role: z.enum(['viewer', 'analyst', 'admin']).optional()
})

export const updateUserSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    role: z.enum(['viewer', 'analyst', 'admin']).optional()
})

export const updateUserStatusSchema = z.object({
    isActive: z.boolean({ required_error: 'isActive is required' })
})