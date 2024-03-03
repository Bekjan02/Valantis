import { IItem } from './types';

export const getPaginationData = ({
  currentPage,
  itemsPerPage,
  totalItems,
}: {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}) => {
  const totalPage = Math.ceil(totalItems / itemsPerPage);
  const maxPageNumberVisible = 5;
  let startPage, endPage;

  if (totalPage <= maxPageNumberVisible) {
    startPage = 1;
    endPage = totalPage;
  } else {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = maxPageNumberVisible;
    } else if (currentPage + 2 >= totalPage) {
      startPage = totalPage - 4;
      endPage = totalPage;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  return { startPage, endPage, totalPage };
};

export const getCurrentPaginationItems = ({
  currentPage,
  itemsPerPage,
  filteredItems,
  items,
}: {
  currentPage: number;
  itemsPerPage: number;
  filteredItems: IItem[];
  items: IItem[];
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return filteredItems.length
    ? filteredItems.slice(startIndex, startIndex + itemsPerPage)
    : items.slice(startIndex, startIndex + itemsPerPage);
};
