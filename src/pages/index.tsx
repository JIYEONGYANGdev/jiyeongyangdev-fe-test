import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Pagination from '../components/Pagination'
import ProductList from '../components/ProductList'
import { useGetProductList } from '../service/useGetProductLIst'
import { useGetUserInfo } from '../service/useLoginService'

const HeaderSection = dynamic(() => import('../components/Header'), { ssr: false })

const HomePage: NextPage = () => {
  const router = useRouter()
  const pageQuery = useMemo(() => (router.query.page as string) || 1, [router.query])

  const { mutate: getProductList, data } = useGetProductList()
  const { products = [], totalCount } = data || {}

  function onPageClick(page: number) {
    router.push({
      query: {
        page,
      },
    })
  }

  useEffect(
    function onInitProductList() {
      getProductList(
        { page: pageQuery, size: 10 },
        {
          onSuccess: (res) => {
            console.log(res)
          },
          onError: (error) => {
            console.log(error)
          },
        }
      )
    },
    [pageQuery]
  )

  return (
    <>
      <HeaderSection />
      <Container>
        <ProductList products={products} />
        <Pagination totalCount={totalCount} />
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
