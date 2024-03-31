import st from './Pagination.module.scss';
import React from 'react';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
  totalGames: number;
  pageSize: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
  totalGames,
  pageSize,
}) => {
  const totalPages = Math.ceil(totalGames / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      className={st.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={6}
      pageCount={totalPages}
      forcePage={currentPage - 1}
    />
  );
};
