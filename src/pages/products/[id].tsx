import { dehydrate } from '@tanstack/react-query'
import type { GetServerSidePropsContext, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { GET_PRODUCT_DETAIL } from '../../service/keys'
import { getProductDetail, useGetProductDetail } from '../../service/useProductService'
import queryClient from '../../utilities/queryClient'

const HeaderSection = dynamic(() => import('../../components/Header'), { ssr: false })

const ProductDetailPage: NextPage = () => {
  const router = useRouter()
  const productId = useMemo(() => router.query.id as string, [router.query])

  const { refetch, data } = useGetProductDetail({ id: productId })
  const { product } = data || {}
  const { thumbnail, name, price } = product || {}

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

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const pageId = query.id as string
  await queryClient.prefetchQuery([GET_PRODUCT_DETAIL], () => getProductDetail({ id: pageId }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
