export interface RegisterRequest {
  name: string
  email: string
  password: string
}

// biome-ignore lint/suspicious/noConfusingVoidType: This is intentional, as the register function does not return any data.
type RegisterResponse = void

export async function register({
  name,
  email,
  password,
}: RegisterRequest): Promise<RegisterResponse> {
  await new Promise((resolve) => setTimeout(resolve, 2000))
}
