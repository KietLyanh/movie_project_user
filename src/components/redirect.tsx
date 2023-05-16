import React, { useEffect } from 'react'
import { authWithOauth2 } from '../utils/api/auth'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {
  const nav = useNavigate()

  const authWithOauth = async () => {
    const redirectUrl = 'http://localhost:3001/redirect'

    const params = new URL(window.location.href).searchParams
    const provider = JSON.parse(localStorage.getItem('provider') ?? '{}')

    const res = await authWithOauth2({
      provider: provider.name,
      code: params.get('code'),
      codeVerifier: provider.codeVerifier,
      redirectUrl: redirectUrl,
    })
    console.log(res)
    nav('/')
  }

  useEffect(() => {
    authWithOauth()
  }, [])

  return <div>Wait A Minute</div>
}

export default Redirect
