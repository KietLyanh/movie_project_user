import PocketBase from 'pocketbase'
import { ILoginAuth } from 'src/models/api/auth.interface'

export const pb = new PocketBase('http://127.0.0.1:8090')

export const AUTH_TOKEN = '@token_admin_movie_mock_project'
export const USER_INFO = '@admin_movie_mock_project_info'

export const API_BASE_URL = 'http://127.0.0.1:8090'

export const isLogin = () => {
  return !!localStorage.getItem(USER_INFO) && !!localStorage.getItem(AUTH_TOKEN)
}

export const authWithOauth2 = async (data: any) => {
  try {
    const res = await fetch('/api/collections/users/auth-with-oauth2', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const rawResponse = await res.json()

    if (res) {
      return { success: true, data: rawResponse, message: 'Login successfully' }
    }
  } catch (error: any) {
    return { success: false, data: null, message: error.message }
  }
}

export const login = async ({ email, password }: { email: string; password: string }) => {
  try {
    if (email === '') {
      return { success: false, data: null, message: 'Please enter your email' }
    }
    if (password === '') {
      return { success: false, data: null, message: 'Please enter your password' }
    }

    const response = await fetch(`${API_BASE_URL}/api/collections/users/auth-with-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identity: email, password }),
    })

    const rawResponse = (await response.json()) as ILoginAuth

    if (rawResponse) {
      return rawResponse
    }
  } catch (error) {
    return { success: false, data: null, message: 'Something went wrong' }
  }
}
