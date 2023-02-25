import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import styled from 'styled-components'
import useValidation from '../utilities/hooks/validation'

const HeaderSection = dynamic(() => import('../components/Header'))

const LoginPage: NextPage = () => {
  const [form, setForm] = useState({
    id: '',
    password: '',
  })
  const { errorText, isValidForm } = useValidation(form)

  return (
    <>
      <HeaderSection />
      <Form>
        <FormTitle>아이디</FormTitle>
        <TextInput
          type='text'
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />
        <ErrorText>{errorText.id}</ErrorText>
        <FormTitle>비밀번호</FormTitle>
        <TextInput
          type='password'
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <ErrorText>{errorText.password}</ErrorText>
        <LoginButton>로그인</LoginButton>
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
