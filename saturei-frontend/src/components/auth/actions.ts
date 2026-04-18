'use server'

import { type LoginRequest, login } from '@/http/auth/login'
import { type RegisterRequest, register } from '@/http/auth/register'
import type { ActionResponse } from '@/interfaces/action-response'

export async function loginAction({
  email,
  password,
}: LoginRequest): Promise<ActionResponse> {
  try {
    const response = await login({ email, password })

    console.log('Login response:', response)
  } catch (error) {
    return {
      success: false,
      message: 'Login failed',
    }
  }

  return {
    success: true,
    message: 'Login successful',
  }
}

export async function registerAction({
  name,
  email,
  password,
}: RegisterRequest): Promise<ActionResponse> {
  try {
    await register({ name, email, password })
  } catch (error) {
    return {
      success: false,
      message: 'Register failed',
    }
  }

  return {
    success: true,
    message: 'Register successful',
  }
}
