import { useState } from 'react'
import { range } from 'lodash'

interface PaginationState {
  currentPage: number
  startPage: number
  endPage: number
  nextPages: number
  goToPage: (page: number) => void
  jumpToNextPages: () => void
  jumpToPrevPages: () => void
}

export const usePagination = (
  totalCount: number,
  initialPage: number = 1,
  perPage = 5,
  itemSize = 10
): PaginationState => {
  const [currentPage, setCurrentPage] = useState(initialPage)

  let startPage = Math.floor(currentPage / perPage) * perPage
  if (currentPage % perPage === 0) {
    startPage = startPage - perPage
  }

  const totalPages = Math.ceil(totalCount / itemSize)
  const nextPages = startPage + perPage
  const endPage = nextPages > totalPages ? totalPages : nextPages

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  function jumpToNextPages() {
    if (currentPage + perPage < totalPages) {
      setCurrentPage(currentPage + perPage)
    } else {
      setCurrentPage(totalPages)
    }
  }

  function jumpToPrevPages() {
    if (currentPage > perPage) {
      setCurrentPage(currentPage - perPage)
    } else {
      setCurrentPage(startPage)
    }
  }

  return {
    currentPage,
    startPage,
    endPage,
    nextPages,
    goToPage,
    jumpToNextPages,
    jumpToPrevPages,
  }
}
