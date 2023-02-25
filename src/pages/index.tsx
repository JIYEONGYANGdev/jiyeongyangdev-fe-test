import { dehydrate } from '@tanstack/react-query'
import type { GetServerSidePropsContext, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Pagination from '../components/Pagination'
import ProductList from '../components/ProductList'
import { GET_PRODUCT_LIST } from '../service/keys'
import { getProductList } from '../service/useProductService'
import queryClient from '../utilities/queryClient'
import toNumber from 'lodash/toNumber'

const HeaderSection = dynamic(() => import('../components/Header'), { ssr: false })

const HomePage: NextPage = () => {
  const router = useRouter()

  function onPageClick(page: number) {
    router.push({
      query: {
        page,
      },
    })
  }

  useEffect(function onRedirectToFirstPage() {
    onPageClick(1)
  }, [])

  return (
    <>
      <HeaderSection />
      <Container>
        <ProductList />
        <Pagination onPageClick={onPageClick} />
      </Container>
    </>
  )
}

export default HomePage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const pageQuery = query.page as string

  await queryClient.prefetchQuery([GET_PRODUCT_LIST], () => getProductList({ page: pageQuery }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
