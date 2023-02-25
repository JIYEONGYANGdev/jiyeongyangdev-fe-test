import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import useValidation from '../utilities/hooks/validation'

const HeaderSection = dynamic(() => import('../components/Header'))

const LoginPage: NextPage = () => {
  const [loginForm, setLoginForm] = useState({
    id: '',
    password: '',
  })
  const { errorText, isValidForm } = useValidation(loginForm)
  const disabledLogin = useMemo(
    () => Object.values(isValidForm).some((isValid) => !isValid),
    [isValidForm]
  )

  function onSetLoginForm(key: 'id' | 'password', value: string) {
    setLoginForm((prev) => ({
      ...(prev || {}),
      [key]: value,
    }))
  }

  function onClickLogin() {}

  return (
    <>
      <HeaderSection />
      <Form>
        <FormTitle>아이디</FormTitle>
        <TextInput
          type='text'
          value={loginForm.id}
          onChange={(e) => onSetLoginForm('id', e.target.value)}
        />
        <ErrorText>{errorText.id}</ErrorText>
        <FormTitle>비밀번호</FormTitle>
        <TextInput
          type='password'
          value={loginForm.password}
          onChange={(e) => onSetLoginForm('password', e.target.value)}
        />
        <ErrorText>{errorText.password}</ErrorText>
        <LoginButton disabled={disabledLogin}>로그인</LoginButton>
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

const FormTitle = styled.div`
  font-weight: 700;
  font-size: 13px;
  color: '#6c6c67d';
`

const TextInput = styled.input`
  border: 1px solid #000;
  padding: 16px;
  color: '#f7f7fa';
  margin-top: 8px;
  border-radius: 12px;

  &:first-of-type {
    margin-bottom: 16px;
  }
`

const ErrorText = styled.div`
  color: red;
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
