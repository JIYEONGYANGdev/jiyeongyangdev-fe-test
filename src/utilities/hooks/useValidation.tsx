import { useEffect, useState } from 'react'

const idPattern = /[A-Za-z0-9]{3,30}/
const passwordPattern = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,30}/

export default function useValidation(form: { id: string; password: string }) {
  const { id, password } = form

  const [errorText, setErrorText] = useState({
    id: '',
    password: '',
  })
  const [isValidForm, setIsValidForm] = useState({
    id: true,
    password: true,
  })

  function onSetValidForm(key: 'id' | 'password', value: boolean) {
    setIsValidForm((prev) => ({
      ...(prev || {}),
      [key]: value,
    }))
  }

  useEffect(() => {
    if (id.length >= 1) {
      if (!idPattern.test(id)) {
        onSetValidForm('id', false)
        setErrorText({
          ...errorText,
          id: '올바른 아이디 형식으로 입력해주세요.',
        })
      } else {
        setErrorText({
          ...errorText,
          id: '',
        })
        onSetValidForm('id', true)
      }
    }
  }, [id])

  useEffect(() => {
    if (password.length >= 1)
      if (!passwordPattern.test(password)) {
        onSetValidForm('password', false)
        setErrorText({
          ...errorText,
          password: '올바른 비밀번호 형식으로 입력해주세요.',
        })
      } else {
        setErrorText({
          ...errorText,
          password: '',
        })
        onSetValidForm('password', true)
      }
  }, [password])

  return {
    errorText,
    isValidForm,
  }
}
