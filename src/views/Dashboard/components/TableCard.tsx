import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { formatDateTime, decimal2digit, addComma } from "src/common/utils";
import TablePaginationActions from "@components/TablePaginationActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: "3em",
  },
  header: {
    backgroundColor: "white",
    color: theme.palette.primary.dark,
  },
  title: {
    fontWeight: 500,
  },
  subHeader: {
    marginLeft: "20px",
    color: theme.palette.primary.dark,
  },
  tableHeader: {
    color: "rgb(255 255 255)",
    backgroundColor: "rgb(1 60 108);",
    // backgroundColor: '#cccccc87',
  },
  narrowCell: {
    [theme.breakpoints.down("xs")]: {
      width: "20%",
    },
  },
  numberAlign: {
    textAlign: "left",
  },
  gainers: {
    color: "green",
  },
  losers: {
    color: "red",
  },
  rowStyle: {
    boxShadow: "none",
  },
  caption: {
    display: "none",
  },
}));

interface IGainerLoserProps {
  changeValue: string;
  suffixSymbol: string;
}
const GainerLoser = (props: IGainerLoserProps) => {
  const classes = useStyles();
  const { changeValue, suffixSymbol } = props;
  return (
    <>
      {parseFloat(changeValue) >= 0 ? (
        <span className={classes.gainers}>
          {changeValue ? `${changeValue}${suffixSymbol}` : ""}
        </span>
      ) : (
        <span className={classes.losers}>
          {changeValue ? `${changeValue}${suffixSymbol}` : ""}
        </span>
      )}
    </>
  );
};

interface ITableCardProps {
  title: string;
  headCells: any;
  rows: any[];
}
const TableCard = (props: ITableCardProps) => {
  const classes = useStyles();
  const { title, headCells, rows = [] } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(60);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Container style={{ maxWidth: 1400 }}>
        <Card style={{ marginTop: "2%" }}>
          <CardHeader
            title={title}
            classes={{
              root: classes.header,
              title: classes.title,
              subheader: classes.subHeader,
            }}
            titleTypographyProps={{
              display: "inline",
            }}
            subheaderTypographyProps={{
              display: "inline",
            }}
            className={classes.tableHeader}
          />
          <TableContainer component={Paper} style={{ boxShadow: "none" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {headCells.map((headCell: any) => (
                    <TableCell
                      key={`header-${headCell.id}`}
                      // align={headCell.numeric ? 'right' : 'left'}
                      align={"left"}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index: any) => {
                      const prevData = rows[page * rowsPerPage + index + 1];
                      let percentChange = "0";
                      if (prevData) {
                        const { close } = row;
                        const prevClose = prevData.close;
                        const parse = String(
                          ((close - prevClose) / prevClose) * 100
                        );
                        percentChange = decimal2digit(parse);
                        // NaN value onn parse removed after GainerLoser
                      }
                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <TableRow hover key={`${row.symbol}-row-${index}`}>
                          <TableCell
                            className={clsx("numberAlign", classes.numberAlign)}
                            classes={{ body: classes.narrowCell }}
                            component="th"
                            scope="row"
                          >
                            {formatDateTime(row.date)}
                          </TableCell>
                          <TableCell
                            className={clsx("numberAlign", classes.numberAlign)}
                          >
                            ${decimal2digit(row.open)}
                          </TableCell>
                          <TableCell
                            className={clsx("numberAlign", classes.numberAlign)}
                          >
                            ${decimal2digit(row.high)}
                          </TableCell>
                          <TableCell
                            className={clsx("numberAlign", classes.numberAlign)}
                          >
                            ${decimal2digit(row.low)}
                          </TableCell>
                          <TableCell
                            className={clsx("numberAlign", classes.numberAlign)}
                          >
                            ${decimal2digit(row.close)}
                          </TableCell>
                          <TableCell
                            className={clsx("numberAlign", classes.numberAlign)}
                          >
                            ${decimal2digit(row.close)}
                          </TableCell>
                          <TableCell
                            className={clsx("numberAlign", classes.numberAlign)}
                          >
                            <GainerLoser
                              changeValue={percentChange}
                              suffixSymbol="%"
                            />
                          </TableCell>
                          <TableCell
                            className={clsx("numberAlign", classes.numberAlign)}
                          >
                            {addComma(row.volume)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <TablePagination
          rowsPerPageOptions={[60, 90, 120]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          classes={{
            caption: classes.caption,
            selectRoot: classes.caption,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Container>
    </div>
  );
};

export default TableCard;
