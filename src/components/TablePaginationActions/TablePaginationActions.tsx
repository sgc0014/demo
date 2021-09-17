import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const TablePaginationActions = (props:any) => {
  const theme = useTheme();
  let { count, page, rowsPerPage, onChangePage } = props;
  const pages = Math.ceil(count/rowsPerPage);

  const handlePageButtonClick = (event:any, value:number) => {
    onChangePage(event, value - 1);
  };

  return (
    <div style={{ flexShrink: 0, marginLeft: theme.spacing(2.5), }}>
      <Pagination count={pages} page={page + 1} onChange={handlePageButtonClick} />
    </div>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default TablePaginationActions;
