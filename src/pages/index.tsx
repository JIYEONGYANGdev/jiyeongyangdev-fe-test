import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Pagination from '../components/Pagination'
import ProductList from '../components/ProductList'
import { useGetProductList } from '../service/useGetProductLIst'

const HomePage: NextPage = () => {
  const router = useRouter()
  const pageQuery = useMemo(() => (router.query.page as string) || 1, [router.query])

  const { mutate: getProductList, data } = useGetProductList()
  const { products = [], totalCount } = data || {}

  useEffect(function onInitProductList() {
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
  }, [])

  return (
    <>
      <Header />
      <Container>
        <ProductList products={products} />
        <Pagination currentPage={pageQuery} totalCount={totalCount} />
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
