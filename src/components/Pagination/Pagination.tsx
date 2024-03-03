import React, { memo } from 'react';

interface IPaginationProps {
  pagination: { totalItems: number; itemsPerPage: number; currentPage: number };
  data: {
    startPage: number;
    endPage: number;
    totalPage: number;
  };
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<IPaginationProps> = ({ onPageChange, pagination, data }) => {
  return (
    <div className='flex items-center space-x-2'>
      <button
        onClick={() => onPageChange(1)}
        disabled={pagination.currentPage === 1}
        className='px-4 py-2 mx-1 my-2 text-sm font-medium text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Первая
      </button>
      <button
        onClick={() => onPageChange(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
        className='px-4 py-2 mx-1 my-2 text-sm font-medium text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Назад
      </button>
      {Array.from({ length: data.endPage - data.startPage + 1 }).map((_, i) => {
        const page = data.startPage + i;
        return (
          <button
            key={page}
            disabled={pagination.currentPage === page}
            onClick={() => onPageChange(page)}
            className='px-4 py-2 mx-1 my-2 text-sm font-medium text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => onPageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === data.totalPage}
        className='px-4 py-2 mx-1 my-2 text-sm font-medium text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Вперед
      </button>
      <button
        onClick={() => onPageChange(data.totalPage)}
        disabled={pagination.currentPage === data.totalPage}
        className='px-4 py-2 mx-1 my-2 text-sm font-medium text-gray-600 bg-white rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Последняя
      </button>
    </div>
  );
};

export const Pagination = memo(PaginationComponent);
Pagination.displayName = 'Pagination';
