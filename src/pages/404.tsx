import dynamic from 'next/dynamic'
import styled from 'styled-components'

const HeaderSection = dynamic(() => import('../components/Header'))

function Custom404() {
  return (
    <>
      <HeaderSection />
      <ErrorMessage>존재하지 않는 페이지 입니다.</ErrorMessage>
    </>
  )
}

export default Custom404

const ErrorMessage = styled.h1`
  height: 100vh;
  padding: 50px 0;
  text-align: center;
`
