import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

function Header() {
  return (
    <HeaderWrapper>
      <Link href='/'>
        <Title>HAUS</Title>
      </Link>
      <Link href='/login'>login</Link>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

export default Header;
