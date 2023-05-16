import React from 'react'
import { usePagination } from 'src/hooks/usePagination'

export type Props = {
  totalRecord: number
  totalPages: number
  pageSize?: number
  currentPage: number
  onChange: (page: number) => void
}

const DOTS = '...'

export const Pagination = ({ totalRecord, totalPages, pageSize = 10, currentPage, onChange }: Props) => {
  const { paginationRange } = usePagination(totalRecord, pageSize, 1, currentPage)

  const onClickPage = (page: string | number) => {
    if (page !== DOTS) {
      onChange(Number(page))
    }
  }

  return (
    <div className="flex justify-center items-stretch gap-2 select-none w-fit">
      <button className="btn btn-sm" disabled={currentPage === 1} onClick={() => onChange(currentPage - 1)}>
        Prev
      </button>
      <div className="items-center hidden md:flex">
        {paginationRange?.map((element: any, index: number) => (
          <span
            key={index}
            onClick={() => onClickPage(element)}
            className={`text-shadow-2 h-full flex justify-center items-center px-4
            ${currentPage === element ? 'text-white bg-black' : 'text-[#6E8B9D]'}
            ${
              currentPage !== element && element !== DOTS
                ? 'active:bg-[#253040] hover:bg-[#2530409f] hover:text-white'
                : ''
            }
            ${element !== DOTS ? 'cursor-pointer' : ''}`}
          >
            {element}
          </span>
        ))}
      </div>
      <div className="items-center md:hidden flex">
        <span className="text-black">
          {currentPage} / {totalPages}
        </span>
      </div>
      <button className="btn btn-sm" disabled={currentPage >= totalPages} onClick={() => onChange(currentPage + 1)}>
        Next
      </button>
    </div>
  )
}
