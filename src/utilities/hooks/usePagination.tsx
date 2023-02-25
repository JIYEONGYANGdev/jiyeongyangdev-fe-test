import { useState } from 'react'

interface PaginationState {
  currentPage: number
  startPage: number
  endPage: number
  nextPages: number
  goToPage: (page: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  jumpToNextPages: () => void
  jumpToPrevPages: () => void
  goToFirstPage: () => void
  goToLastPage: () => void
}

export const usePagination = (
  totalPages: number,
  initialPage: number = 1,
  perPage = 5
): PaginationState => {
  const [currentPage, setCurrentPage] = useState(initialPage)

  let startPage = Math.floor(currentPage / perPage) * perPage
  if (currentPage % perPage === 0) {
    startPage = startPage - perPage
  }

  const nextPages = startPage + perPage
  const endPage = nextPages > totalPages ? totalPages : nextPages

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  function jumpToNextPages() {
    if (currentPage + perPage < totalPages) {
      setCurrentPage(currentPage + perPage)
    }
  }

  function jumpToPrevPages() {
    if (currentPage > perPage) {
      setCurrentPage(currentPage - perPage)
    } else {
      setCurrentPage(startPage)
    }
  }

  function goToFirstPage() {
    setCurrentPage(1)
  }

  function goToLastPage() {
    setCurrentPage(totalPages)
  }

  return {
    currentPage,
    startPage,
    endPage,
    nextPages,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    jumpToNextPages,
    jumpToPrevPages,
    goToFirstPage,
    goToLastPage,
  }
}
