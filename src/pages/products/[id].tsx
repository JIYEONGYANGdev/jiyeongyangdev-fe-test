import React, { useEffect, useMemo } from 'react'
import type { NextPage } from 'next'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import { useGetProductDetail } from '../../service/useProductService'
import { useRouter } from 'next/router'

const HeaderSection = dynamic(() => import('../../components/Header'), { ssr: false })

const ProductDetailPage: NextPage = () => {
  const router = useRouter()
  const productId = useMemo(() => router.query.id as string, [router.query])

  console.log(productId)
  const { mutate: getDetailMutate, data } = useGetProductDetail()
  const { product } = data || {}
  const { thumbnail, name, price } = product || {}

  useEffect(
    function onInitProductDetailPage() {
      if (productId) getDetailMutate({ id: productId })
    },
    [productId]
  )

  return (
    <>
      <HeaderSection />
      <Thumbnail src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} />
      <ProductInfoWrapper>
        <Name>{name}</Name>
        <Price>{price}원</Price>
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
