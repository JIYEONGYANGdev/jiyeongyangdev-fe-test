import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useGetUserInfo } from '../service/useLoginService'

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({
    id: '',
    name: '',
  })

  const router = useRouter()
  const isLoginPage = useMemo(() => router.asPath === '/login', [router])

  function handleLogout() {
    sessionStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  useEffect(() => {
    const storedLoginStatus = sessionStorage.getItem('isLoggedIn')
    const storedUserId = sessionStorage.getItem('userId')
    const storedUserName = sessionStorage.getItem('userName')
    setIsLoggedIn(storedLoginStatus === 'true')
    setUserData((prev) => ({
      ...(prev || {}),
      id: storedUserId || '',
      name: storedUserName || '',
    }))
  }, [])

  return (
    <HeaderWrapper>
      <Link href='/'>
        <TitleButton>HAUS</TitleButton>
      </Link>
      <LoginBtnWrapper>
        {isLoggedIn && <div>{userData.name}</div>}
        {!isLoginPage && (
          <Link href={isLoggedIn ? '/' : '/login'}>
            <LoginButton onClick={isLoggedIn ? handleLogout : () => {}}>
              {isLoggedIn ? 'logout' : 'login'}
            </LoginButton>
          </Link>
        )}
      </LoginBtnWrapper>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`

const LoginBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TitleButton = styled.button`
  font-size: 48px;
  cursor: pointer;
`

const LoginButton = styled.button`
  border: 0;
  cursor: pointer;
`
export default Header
