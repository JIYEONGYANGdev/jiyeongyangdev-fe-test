import React from 'react'
import { useMutation } from 'react-query'
import { GET_PRODUCT_LIST } from './keys'

interface ProductReqParams {
  page: string | number
  size: number
}

export const useGetProductList = () =>
  useMutation([GET_PRODUCT_LIST], async (params: ProductReqParams) => {
    const { page, size } = params

    const response = await fetch(`https://api.sixshop.com/products?page=${page}&size=${size || 10}`)
    const data = await response.json()

    return data.data
  })
