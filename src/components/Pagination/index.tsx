import st from './Pagination.module.scss';
import React from 'react';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={st.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={6}
      pageCount={5}
      forcePage={currentPage - 1}
    />
  );
};
