import { fetchDataAuth } from './index'

export const API_BASE_URL = 'http://127.0.0.1:8090'

export const getMovieList = async (input: { limit: number; page: number; name: string }) => {
  try {
    let startPage = input.page || 1
    let startLimit = input.limit || 10
    let name = input.name ?? ''

    const response = await fetch(
      `${API_BASE_URL}/api/collections/movies/records?page=${startPage}&limit=${startLimit}&${
        name !== '' ? `filter=%28name~%27${name}%27%29` : ''
      }`,
      {
        method: 'GET',
      },
    )

    const rawResponse = await response.json()

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

    const rawResponse = await response.json()

    return rawResponse
  } catch (error: any) {
    return { success: false, data: null, message: error.message }
  }
}

export const addMovie = async (input: {
  name: string
  description: string
  actor_id: string
  poster: string
  category_id: string
  accessToken: string
}) => {
  try {
    const { name, description, actor_id, poster, category_id, accessToken } = input

    if (!name || name === '') {
      return { success: false, data: null, message: 'Invalid Name' }
    }

    if (!actor_id) {
      return {
        success: false,
        data: null,
        message: 'Please enter your Id actor',
      }
    }

    if (!category_id) {
      return {
        success: false,
        data: null,
        message: 'Please enter your Id Category',
      }
    }

    if (!accessToken || accessToken === '') {
      return { success: false, data: null, message: 'Invalid Access Token' }
    }

    const response = await fetch(`${API_BASE_URL}/api/collections/movies/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name,
        description,
        actor_id,
        poster,
        category_id,
      }),
    })

    const rawResponse = await response.json()

    return rawResponse
  } catch (error: any) {
    return { success: false, data: null, message: error.message }
  }
}

export const deleteMovie = async (input: { id: string; accessToken: string }) => {
  try {
    const { id, accessToken } = input

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' }
    }

    if (!accessToken || accessToken === '') {
      return { success: false, data: null, message: 'Invalid Access Token' }
    }

    const response = await fetch(`${API_BASE_URL}/api/collections/movies/records/${id}`, {
      method: 'DELETE',
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

export const updateMovie = async (input: {
  id: string
  name: string
  description: string
  actor_id: string
  poster: string
  category_id: string
  accessToken: string
}) => {
  try {
    const { id, name, description, actor_id, poster, category_id, accessToken } = input

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' }
    }

    if (!accessToken || accessToken === '') {
      return { success: false, data: null, message: 'Invalid Access Token' }
    }

    const response = await fetch(`${API_BASE_URL}/api/collections/movies/records/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name,
        description,
        actor_id,
        poster,
        category_id,
      }),
    })

    const rawResponse = await response.json()

    return rawResponse
  } catch (error: any) {
    return { success: false, data: null, message: error.message }
  }
}

export const getMovieData = async (input: { id: string }) => {
  try {
    const { id } = input

    if (!id || id === '') {
      return { success: false, data: null, message: 'Invalid Id' }
    }

    const response = await fetchDataAuth(`${API_BASE_URL}/api/collections/movies/records/${id}`, 'GET')

    return response
  } catch (error: any) {
    return { success: false, data: null, message: error.message }
  }
}

export const createCommentMovieData = async (input: { field: string; comments: string; movies: string }) => {
  try {
    const { field, comments, movies } = input

    if (!field || field === '') {
      return { success: false, data: null, message: 'Invalid Fields' }
    }

    if (!comments || comments === '') {
      return { success: false, data: null, message: 'Invalid Comments' }
    }

    if (!movies || movies === '') {
      return { success: false, data: null, message: 'Invalid Movies' }
    }

    const response = await fetch(`${API_BASE_URL}/api/collections/comments/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ field, comments, movies }),
    })

    return response
  } catch (error: any) {
    return { success: false, data: null, message: error.message }
  }
}

export const getCommentData = async (input: { name: string }) => {
  try {
    const { name } = input

    if (!name || name === '') {
      return { success: false, data: null, message: 'Invalid name' }
    }

    const response = await fetch(
      `${API_BASE_URL}/api/collections/comments/records?${name !== '' ? `filter=%28movies~%27${name}%27%29` : ''}`,
      {
        method: 'GET',
      },
    )

    const rawResponse = await response.json()

    return rawResponse
  } catch (error: any) {
    return { success: false, data: null, message: error.message }
  }
}

export const voteMovie = async (input: { field: string; votes: number; movies: string }) => {
  try {
    const { field, votes, movies } = input

    if (!field || field === '') {
      return { success: false, data: null, message: 'Invalid Fields' }
    }

    if (!votes || votes === 0) {
      return { success: false, data: null, message: 'Invalid Comments' }
    }

    if (!movies || movies === '') {
      return { success: false, data: null, message: 'Invalid Movies' }
    }

    const response = await fetch(`${API_BASE_URL}/api/collections/votes/records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ field, votes, movies }),
    })

    return response
  } catch (error: any) {
    return { success: false, data: null, message: error.message }
  }
}

export const getVoteMovieData = async (input: { name: string }) => {
  try {
    const { name } = input

    if (!name || name === '') {
      return { success: false, data: null, message: 'Invalid name' }
    }

    const response = await fetch(
      `${API_BASE_URL}/api/collections/votes/records?${name !== '' ? `filter=%28movies~%27${name}%27%29` : ''}`,
      {
        method: 'GET',
      },
    )

    const rawResponse = await response.json()

    return rawResponse
  } catch (error: any) {
    return { success: false, data: null, message: error.message }
  }
}
