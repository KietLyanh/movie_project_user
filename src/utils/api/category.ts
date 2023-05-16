import { ICategoryListDataResponse, ICreateCategoryDataResponse } from 'src/models/api/category.interface'

export const API_BASE_URL = 'http://127.0.0.1:8090'

export const getCategoryList = async (input: { limit: number; page: number; name: string }) => {
  try {
    let startPage = input.page || 1
    let startLimit = input.limit || 10

    const response = await fetch(
      `${API_BASE_URL}/api/collections/categories/records?page=${startPage}&limit=${startLimit}`,
      {
        method: 'GET',
      },
    )

    const rawResponse = (await response.json()) as ICategoryListDataResponse

    return rawResponse
  } catch (error: any) {
    return { success: false, data: null, message: error.message }
  }
}

export const addCategory = async (input: { name: string; accessToken: string }) => {
  try {
    const { name, accessToken } = input

    if (!name || name === '') {
      return { success: false, data: null, message: 'Invalid Name' }
    }

    if (!accessToken || accessToken === '') {
      return { success: false, data: null, message: 'Invalid Access Token' }
    }

    const response = await fetch(`${API_BASE_URL}/api/collections/categories/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name }),
    })

    const rawResponse = (await response.json()) as ICreateCategoryDataResponse

    return rawResponse
  } catch (error: any) {
    return { success: false, data: null, message: error.message }
  }
}

export const deleteCategory = async (input: { id: string; accessToken: string }) => {
  try {
    const { id, accessToken } = input

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' }
    }

    if (!accessToken || accessToken === '') {
      return { success: false, data: null, message: 'Invalid Access Token' }
    }

    const response = await fetch(`${API_BASE_URL}/api/collections/categories/records/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const rawResponse = response.json()

    return await rawResponse
  } catch (error: any) {
    return { success: false, data: null, message: error.message }
  }
}

export const updateCategory = async (input: { id: string; name: string; accessToken: string }) => {
  try {
    const { id, name, accessToken } = input

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' }
    }

    if (!accessToken || accessToken === '') {
      return { success: false, data: null, message: 'Invalid Access Token' }
    }

    const response = await fetch(`${API_BASE_URL}/api/collections/categories/records/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name }),
    })

    const rawResponse = await response.json()

    return rawResponse
  } catch (error: any) {
    return { success: false, data: null, message: error.message }
  }
}

export const getCategoryData = async (input: { id: string; accessToken: string }) => {
  try {
    const { id, accessToken } = input

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' }
    }

    if (!accessToken || accessToken === '') {
      return { success: false, data: null, message: 'Invalid Access Token' }
    }

    const response = await fetch(`${API_BASE_URL}/api/collections/categories/records/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const rawResponse = await response.json()

    return rawResponse
  } catch (error: any) {
    return { success: false, data: null, message: error.message }
  }
}
