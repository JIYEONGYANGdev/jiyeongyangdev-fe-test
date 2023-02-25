import { useRouter } from 'next/router'
import { useMemo } from 'react'
import styled from 'styled-components'
import { useQueryGetProductList } from '../service/useProductService'

import { Product } from '../types/product'
import ProductItem from './ProductItem'

type ProductListProps = {
  products: Product[]
}

const ProductList = () => {
  const router = useRouter()
  const pageQuery = useMemo(() => (router.query.page as string) || 1, [router.query])

  const { data } = useQueryGetProductList({ page: pageQuery })
  const { products = [] } = data || {}

  return (
    <Container>
      {products?.map((product: Product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Container>
  )
}

export default ProductList

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`
