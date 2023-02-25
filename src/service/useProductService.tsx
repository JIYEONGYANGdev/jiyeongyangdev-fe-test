import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { Product } from '../types/product'
import { convertedPriceString } from '../utilities'
import { GET_PRODUCT_DETAIL, GET_PRODUCT_LIST } from './keys'
import axios from 'axios'

interface ProductReqParams {
  page: string | number
  size: number
}

export const useGetProductList = () =>
  useMutation([GET_PRODUCT_LIST], async (params: ProductReqParams) => {
    const { page, size } = params

    const response = await fetch(`https://api.sixshop.com/products?page=${page}&size=${size || 10}`)
    const data = await response.json()

    const { products, totalCount } = data.data
    return {
      products: products.map((prdouct: Product) => {
        return {
          ...prdouct,
          price: convertedPriceString(prdouct.price),
        }
      }),
      totalCount,
    }
  })

// export const useGetProductDetail = (params: { id: string | number }) =>
//   useQuery([GET_PRODUCT_DETAIL], async () => {
//     const { id } = params

//     const response = await axios.get(`https://api.sixshop.com/products/${id}`)

//     return response.data
//   })

export const useGetProductDetail = () =>
  useMutation([GET_PRODUCT_DETAIL], async (params: { id: string | number }) => {
    const { id } = params

    const response = await axios.get(`https://api.sixshop.com/products/${id}`)

    return response.data
  })
