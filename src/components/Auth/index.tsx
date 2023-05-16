import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import InputPassword from 'src/common/InputPassword'
import { ILoginAuth } from 'src/models/api/auth.interface'
import { AUTH_TOKEN, USER_INFO, login } from 'src/utils/api/auth'

export const LoginPage = () => {
  const navigate = useNavigate()
  const emailValue = useRef() as React.MutableRefObject<HTMLInputElement>
  const passwordValue = useRef() as React.MutableRefObject<HTMLInputElement>

  const onLogin = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault()
      if (emailValue.current.value !== '' && passwordValue.current.value !== '') {
        const res = (await login({
          email: emailValue.current.value,
          password: passwordValue.current.value,
        })) as ILoginAuth

        if (res) {
          localStorage.setItem(USER_INFO, JSON.stringify(res.record))
          localStorage.setItem(AUTH_TOKEN, res.token)
          navigate('/')
        }
      }
    } catch (error) {
      alert('Something went wrong')
    }
  }

  return (
    <div className="relative bg-cover h-screen w-full font-library">
      <div className="w-full h-full bg-[#00000075] relative z-1"></div>
      <div className="absolute w-[500px] translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] bg-[#BA8C63] z-100 rounded-md">
        <div className="text-white text-center text-[32px] mt-[20px]">Login</div>
        <form className="p-[20px]" onSubmit={onLogin}>
          <div>
            <label htmlFor="email" className="block text-[18px] text-white">
              Username:
            </label>
            <input
              id="email"
              name="email"
              ref={emailValue}
              className="w-full rounded-sm mt-[5px] outline-none px-[10px] py-[5px] border-[1px] border-[#808080] bg-transparent text-[#ffffffb6]"
            />
          </div>
          <div className="mt-[10px]">
            <label htmlFor="password" className="block text-[18px] text-white">
              Password:
            </label>
            <InputPassword classNameCustom="text-[#ffffffb6] mt-[5px] rounded-sm" ref={passwordValue} />
          </div>
          <button className="w-full py-[8px] bg-[#FFFFFF] mt-[20px] rounded-sm" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
