import React from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Product } from '../types/product'
import { convertedPriceString } from '../utilities'
import { GET_PRODUCT_DETAIL, GET_PRODUCT_LIST } from './keys'
import axios from 'axios'

interface ProductReqParams {
  page: string | number
  size?: number
}

export const useGetProductList = () => useMutation([GET_PRODUCT_LIST], getProductList)

export const useQueryGetProductList = (params: ProductReqParams) =>
  useQuery([GET_PRODUCT_LIST, params], async () => {
    const { page = 1, size = 10 } = params

    const response = await fetch(`https://api.sixshop.com/products?page=${page}&size=${size}`)
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

export const useGetProductDetail = (params: { id: string | number }) =>
  useQuery([GET_PRODUCT_DETAIL], async () => {
    const { id } = params

    const response = await axios.get(`https://api.sixshop.com/products/${id}`)

    return response.data
  })

// export const useGetProductDetail = () =>
//   useMutation([GET_PRODUCT_DETAIL], async (params: { id: string | number }) => {
//     const { id } = params

//     const response = await axios.get(`https://api.sixshop.com/products/${id}`)

//     return response.data
//   })

export const getProductList = async (params: { page: number; size?: number }) => {
  const { page = 1, size = 10 } = params

  const response = await fetch(`https://api.sixshop.com/products?page=${page}&size=${size}`)
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
}
