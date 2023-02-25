import dynamic from 'next/dynamic'
import React from 'react'
import styled from 'styled-components'

const HeaderSection = dynamic(() => import('../components/Header'))

function Custom404() {
  return (
    <>
      <HeaderSection />
      <ErrorMessage>404 - Page Not Found</ErrorMessage>
    </>
  )
}

export default Custom404

const ErrorMessage = styled.h1`
  text-align: center;
`
