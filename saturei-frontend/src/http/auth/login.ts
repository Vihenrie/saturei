export interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  token: string
}

export async function login({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = {
    token: 'fake-token',
  }

  return response
}
