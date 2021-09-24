import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

interface TablePaginationActionsProps {
  count: number;
  onPageChange: (event: any, value: number) => void;
  page: number;
  rowsPerPage: number;
}
const TablePaginationActions = (props: TablePaginationActionsProps) => {
  const theme = useTheme();
  let { count, page, rowsPerPage, onPageChange } = props;
  const pages = Math.ceil(count / rowsPerPage);

  const handlePageButtonClick = (event: any, value: number) => {
    onPageChange(event, value - 1);
  };

  return (
    <div style={{ flexShrink: 0, marginLeft: theme.spacing(2.5) }}>
      <Pagination
        count={pages}
        page={page + 1}
        onChange={handlePageButtonClick}
      />
    </div>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default TablePaginationActions;
