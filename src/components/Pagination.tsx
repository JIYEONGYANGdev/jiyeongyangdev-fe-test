import React, { useMemo } from 'react'
import styled from 'styled-components'
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc'
import { usePagination } from '../utilities/hooks/usePagination'
import range from 'lodash/range'
import Router from 'next/router'

interface PaginationProps {
  currentPage?: number | string
  totalCount: number
}

const Pagination = ({ totalCount }: PaginationProps) => {
  const { currentPage, startPage, endPage, nextPages, goToPage, jumpToNextPages, jumpToPrevPages } =
    usePagination(totalCount)

  const pagingItems = useMemo(() => range(startPage + 1, endPage + 1), [startPage, endPage])

  const onGoToPage = (page: number) => {
    // Router.push()
    goToPage(page)
    console.log(page)
  }

  return (
    <PaginationContainer>
      <PageArrowButton disabled={startPage === 0} onClick={jumpToPrevPages}>
        <VscChevronLeft />
      </PageArrowButton>
      <PageWrapper>
        {pagingItems?.map((page) => (
          <PageButton
            key={page}
            selected={page === currentPage}
            disabled={page === 1}
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
