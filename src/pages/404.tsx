import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'

function Custom404() {
  return (
    <>
      <Header />
      <ErrorMessage>404 - Page Not Found</ErrorMessage>
    </>
  )
}

export default Custom404

const ErrorMessage = styled.h1`
  text-align: center;
`
