import React from 'react'
import type { NextPage } from 'next'
import styled from 'styled-components'
import products from '../../api/data/products.json'
import dynamic from 'next/dynamic'

const HeaderSection = dynamic(() => import('../../components/Header'), { ssr: false })

const ProductDetailPage: NextPage = () => {
  const product = products[0]

  return (
    <>
      <HeaderSection />
      <Thumbnail src={product.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} />
      <ProductInfoWrapper>
        <Name>{product.name}</Name>
        <Price>{product.price}원</Price>
      </ProductInfoWrapper>
    </>
  )
}

export default ProductDetailPage

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`
