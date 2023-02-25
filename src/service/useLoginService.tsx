import axios from 'axios'
import { useQuery, useMutation } from 'react-query'
import { GET_USER_INFO, POST_LOGIN } from './keys'

export const usePostLogin = () =>
  useMutation([POST_LOGIN], async (params: { id: string; password: string }) => {
    const response = await axios.post(`https://api.sixshop.com/login`)

    return response.data
  })

export const useGetUserInfo = (params: { userId: string }) =>
  useQuery(
    [GET_USER_INFO, params],
    async () => {
      if (!params.userId) return null
      const response = await axios.get(`https://api.sixshop.com/users/${userId}`)

      return response.data?.data
    }
    // {
    //   enabled: false,
    // }
  )
