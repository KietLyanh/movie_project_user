import React from 'react'
import { useState } from 'react'

interface Props {
  classNameCustom?: string
  onChange?: () => void
}

const InputPassword = React.forwardRef(({ classNameCustom, onChange }: Props, ref: any) => {
  const [isHide, setIsHide] = useState<boolean>(true)

  return (
    <div
      className={`px-[10px] py-[5px] w-full flex items-center justify-between border-[1px] border-[#808080] ${classNameCustom}`}
    >
      <input
        id="password"
        name="password"
        ref={ref}
        type={isHide ? 'password' : 'text'}
        className="w-[90%] bg-transparent outline-none"
        onChange={onChange}
      />
      {isHide ? (
        <img src="/images/eye_close.svg" className="cursor-pointer" onClick={() => setIsHide(!isHide)} />
      ) : (
        <img src="/images/eye_open.svg" className="cursor-pointer" onClick={() => setIsHide(!isHide)} />
      )}
    </div>
  )
})

export default InputPassword
