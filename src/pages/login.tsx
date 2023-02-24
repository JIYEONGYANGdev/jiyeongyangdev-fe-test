import type { NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const LoginPage: NextPage = () => {
  return (
    <>
      <Header />
      <Form>
        <div>아이디</div>
        <TextInput type='text' />
        <div>비밀번호</div>
        <TextInput type='password' />
        <LoginButton disabled>로그인</LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const TextInput = styled.input`
  border: 1px solid #000;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
