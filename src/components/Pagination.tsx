import { range } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc'
import styled from 'styled-components'
import { useQueryGetProductList } from '../service/useProductService'
import { usePagination } from '../utilities/hooks/usePagination'

interface PaginationProps {
  onPageClick: (page: number) => void
}

const Pagination = ({ onPageClick }: PaginationProps) => {
  const router = useRouter()
  const pageQuery = useMemo(() => (router.query.page as string) || 1, [router.query])

  const { data } = useQueryGetProductList({ page: pageQuery })
  const { totalCount } = data || {}

  const { currentPage, startPage, endPage, nextPages, goToPage, jumpToNextPages, jumpToPrevPages } =
    usePagination(totalCount)

  const pagingItems = useMemo(() => range(startPage + 1, endPage + 1), [startPage, endPage])

  function onGoToPage(page: number) {
    goToPage(page)
    onPageClick(page)
  }

  useEffect(() => {
    onGoToPage(currentPage)
  }, [currentPage])

  return (
    <PaginationContainer>
      <PageArrowButton disabled={startPage === 0} onClick={jumpToPrevPages}>
        <VscChevronLeft />
      </PageArrowButton>
      <PageWrapper>
        {pagingItems?.map((page) => (
          <PageButton
            key={`pagination-button-${page}`}
            selected={page === currentPage}
            disabled={page === 0}
            onClick={() => onGoToPage(page)}
          >
            {page}
          </PageButton>
        ))}
      </PageWrapper>
      <PageArrowButton disabled={nextPages >= totalCount} onClick={jumpToNextPages}>
        <VscChevronRight />
      </PageArrowButton>
    </PaginationContainer>
  )
}

export default Pagination

const PaginationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`

const PageArrowButton = styled.button`
  cursor: pointer;

  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`

type PageType = {
  selected: boolean
}

const PageButton = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;
  cursor: pointer;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`
