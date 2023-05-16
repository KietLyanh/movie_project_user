import { useCallback, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import debounce from 'lodash.debounce'
import { SearchIcon } from '../CustomIcons'
import { MenuHeader } from 'src/models/common'
import { MENU_HEADER } from 'src/utils/common'
import { useClickOutside } from 'src/hooks/useClickOutSide'
import { IUserInfo } from 'src/models/api/auth.interface'
import { USER_INFO } from 'src/utils/api/auth'

export const Header = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const contentRef = useRef() as any
  const childRef = useRef() as any
  useClickOutside(contentRef, childRef, (value: boolean) => setIsOpenMenu(value))

  const userInfo = useMemo(() => {
    return localStorage.getItem(USER_INFO) ? JSON.parse(localStorage.getItem(USER_INFO) ?? '{}') : undefined
  }, []) as IUserInfo

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>(searchParams.get('q') ?? '')

  const debounceKeyword = (keyword: string) => {
    setKeyword(keyword)
    navigate({
      pathname: '/search',
      search: `?&q=${keyword}`,
    })
  }

  const debounceInput = useCallback(
    debounce((keyword: string) => debounceKeyword(keyword), 1000),
    [],
  )

  const onChangeKeyword = (event: { target: { value: string } }) => {
    debounceInput(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href='/';
  };

  return (
    <div className="w-full fixed top-0 left-0 bg-[#000] z-100">
      <div
        className="w-[calc(100%-20px)] sm:container md:w-[1100px] flex justify-between mx-auto items-center h-[50px]"
        ref={contentRef}
      >
        <Link to={'/'} className="text-[#000] font-extrabold bg-yellow-500 px-[10px] py-[5px]">
          Movie
        </Link>
        <ul className="hidden md:flex text-[#FFFFFF] items-center w-fit gap-[30px] pr-28">
          <li className="rounded-md overflow-hidden bg-[#FFFFFF] flex gap-[10px] w-[400px]">
            <div className="flex flex-1 items-center px-[10px] border-l-[1px] border-[#808080]">
              <input
                placeholder="Search keyword"
                className="h-[35px] flex-1 outline-none border-none text-[#000] text-[14px]"
                onChange={onChangeKeyword}
                defaultValue={keyword}
              />
              <SearchIcon width={20} height={20} color="#000" />
            </div>
          </li>
          {MENU_HEADER.map((item: MenuHeader) => (
            <li key={`${item.name}_${item.id}`}>
              <NavLink to={item.path} replace>
                {item.name}
              </NavLink>
            </li>
          ))}
          {userInfo ? (
            <li className="flex gap-[6px] items-center">
              <img
                src={`http://127.0.0.1:8090/api/files/_pb_users_auth_/qbxkznqh7rnh95m/${userInfo.avatar}`}
                alt={userInfo.name}
                className="w-[30px] h-[30px] object-cover rounded-full overflow-hidden"
              />
              <div>{userInfo.name}</div>
              <button onClick={handleLogout} className="text-[#FFFFFF] py-[3px]">
                Logout
              </button>
            </li>
          ) : (
            <Link to={'/login'}>Login</Link>
          )}
        </ul>
      </div>
      {isOpenMenu && (
        <div className="absolute z-100 w-full top-[50px] bg-[#000] shadow-lg pb-[10px]" ref={childRef}>
          <ul className="w-[calc(100%-20px)] sm:container mx-auto mt-[10px]">
            <li className="rounded-md overflow-hidden bg-[#FFFFFF] flex gap-[10px] w-full">
              <div className="flex flex-1 items-center px-[10px] border-l-[1px] border-[#808080]">
                <input
                  placeholder="Search keyword"
                  className="h-[35px] flex-1 outline-none border-none text-[#000] text-[14px]"
                  onChange={onChangeKeyword}
                  defaultValue={keyword}
                />
                <SearchIcon width={20} height={20} color="#000" />
              </div>
            </li>
            {MENU_HEADER.map((item: MenuHeader) => (
              <li key={`${item.name}_${item.id}`} className="text-[#FFFFFF] py-[10px]">
                <NavLink to={item.path} replace>
                  {item.name}
                </NavLink>
              </li>
            ))}
            {userInfo ? (
              <li className="flex gap-[6px] items-center">
                <img
                  src={`http://127.0.0.1:8090/api/files/_pb_users_auth_/qbxkznqh7rnh95m/${userInfo.avatar}`}
                  alt={userInfo.name}
                  className="w-[30px] h-[30px] object-cover rounded-full overflow-hidden"
                />
                <div>{userInfo.name}</div>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Logout
                </button>
              </li>
            ) : (
              <Link to={'/login'} className="text-[#FFFFFF] py-[10px]">
                Login
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
