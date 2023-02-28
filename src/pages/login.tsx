import isNil from 'lodash/isNil'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { usePostLogin } from '../service/useLoginService'
import useValidation from '../utilities/hooks/useValidation'

const HeaderSection = dynamic(() => import('../components/Header'), { ssr: false })

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [loginForm, setLoginForm] = useState({
    id: '',
    password: '',
  })
  const { errorText, isValidForm } = useValidation(loginForm)
  const disabledLogin = useMemo(
    () =>
      Object.values(loginForm).some((val) => !val.length) ||
      Object.values(isValidForm).some((isValid) => !isValid),
    [isValidForm]
  )

  const { mutate: postLogin, data } = usePostLogin()

  function onSetLoginForm(key: 'id' | 'password', value: string) {
    setLoginForm((prev) => ({
      ...(prev || {}),
      [key]: value,
    }))
  }

  async function onClickLogin() {
    postLogin(
      { id: loginForm.id, password: loginForm.password },
      {
        onSuccess: (res) => {
          if (!isNil(res.data)) {
            console.log(res.data)
            const { id, name } = res.data.user
            sessionStorage.setItem('isLoggedIn', 'true')
            sessionStorage.setItem('userId', id)
            sessionStorage.setItem('userName', name)
            router.push('/')
          }
        },
      }
    )
  }

  return (
    <>
      <HeaderSection />
      <Form>
        <FormInnerWrapper>
          <FormTitle>아이디</FormTitle>
          <TextInput
            type='text'
            value={loginForm.id}
            onChange={(e) => onSetLoginForm('id', e.target.value)}
            isValid={isValidForm.id}
          />
          <ErrorText>{errorText.id}</ErrorText>
        </FormInnerWrapper>
        <FormInnerWrapper>
          <FormTitle>비밀번호</FormTitle>
          <TextInput
            type='password'
            value={loginForm.password}
            onChange={(e) => onSetLoginForm('password', e.target.value)}
            isValid={isValidForm.password}
          />
          <ErrorText>{errorText.password}</ErrorText>
        </FormInnerWrapper>
        <LoginButton disabled={disabledLogin} onClick={onClickLogin}>
          로그인
        </LoginButton>
      </Form>
    </>
  )
}

export default LoginPage

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`

const FormInnerWrapper = styled.div`
  width: 100%;

  &:last-of-type {
    margin-top: 16px;
  }
`

const FormTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: '#6c6c67d';
`

const TextInput = styled.input<{ isValid: boolean }>`
  width: 100%;

  border: ${({ isValid }) => `1px solid ${!isValid ? '#ed4e5c' : 'grey'}`};
  padding: 16px;
  color: '#f7f7fa';
  margin-top: 8px;
  border-radius: 12px;
  background-color: ${({ isValid }) => (!isValid ? '#fdedee' : '#fff')};
`

const ErrorText = styled.div`
  margin-top: 8px;
  font-size: 13px;
  font-weight: 400;
  color: #ed4e5c !important;
`

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`
function useQuery(arg0: any[], arg1: any): { data: any } {
  throw new Error('Function not implemented.')
}
