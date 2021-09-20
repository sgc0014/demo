import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  TableSortLabel,
  TablePagination,
} from "@material-ui/core";
import Link from "next/link";
import { decimal2digit, addComma } from "src/common/utils";
import { TableChart } from "./index";
import TablePaginationActions from "src/components/TablePaginationActions";

const useStyles = makeStyles((theme: any) => ({
  root: {
    minHeight: 600,
    padding: "0px",
    background: theme.palette.white,
    [theme.breakpoints.down("sm")]: {
      padding: "50px 0px 30px 0px",
    },
  },
  typography: {
    fontSize: 25,
    textTransform: "none",
  },
  card: {
    padding: "16px 0px",
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
  name: {
    color: "rgb(1 60 108);",
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      color: "#154782",
    },
  },
  followed: {
    color: "#ccc",
  },
  tableHeader: {
    color: "rgb(255 255 255)",
    backgroundColor: "rgb(1 60 108);",
    // backgroundColor: '#cccccc87',
    marginTop: 30,
    borderRadius: "5px 5px 0 0",
  },
  fontBold: {
    fontWeight: 500,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  numberAlign: {
    textAlign: "right",
  },
  gainers: {
    color: "green",
    fontWeight: 500,
  },
  losers: {
    color: "red",
    fontWeight: 500,
  },
  caption: {
    display: "none",
  },
}));

interface IGainerLoserProps {
  changeValue: string;
  prefixSymbol?: string;
  suffixSymbol?: string;
}
const GainerLoser = (props: IGainerLoserProps) => {
  const classes = useStyles();
  const { changeValue, prefixSymbol, suffixSymbol } = props;
  return (
    <>
      {parseFloat(changeValue) > 0 ? (
        <span className={classes.gainers}>
          {prefixSymbol}
          {decimal2digit(changeValue)}
          {suffixSymbol}
        </span>
      ) : (
        <span className={classes.losers}>
          -{prefixSymbol}
          {decimal2digit(changeValue).replace("-", "")}
          {suffixSymbol}
        </span>
      )}
    </>
  );
};

function descendingComparator(a: any, b: any, orderBy: string) {
  let valueone = null;
  let valuetwo = null;
  if (orderBy === "name" || orderBy === "symbol") {
    valueone = a[orderBy];
    valuetwo = b[orderBy];
  } else {
    const aValue = parseFloat(a[orderBy]);
    const bValue = parseFloat(b[orderBy]);
    if (!isNaN(aValue)) {
      valueone = aValue;
    }
    if (!isNaN(bValue)) {
      valuetwo = bValue;
    }
  }
  if (valueone && valuetwo && valuetwo < valueone) {
    return -1;
  }
  if (valueone && valuetwo && valuetwo > valueone) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  console.log("sort with: ", orderBy, order);
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function stableSort(
  array: any[],
  comparator: (order: string, orderBy: string) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const orderValue = comparator(a[0], b[0]);
    if (orderValue !== 0) return orderValue;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface IEnhancedTableHeadProps {
  classes: any;
  order: string;
  orderBy: string;
  onRequestSort: (event: any, property: any) => void;
  headCells: any[];
}
const EnhancedTableHead = (props: IEnhancedTableHeadProps) => {
  const { classes, order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={
              orderBy === headCell.id
                ? order === "asc"
                  ? "asc"
                  : order === "desc"
                  ? "desc"
                  : undefined
                : undefined
            }
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? "desc" : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Chart</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

interface ITableCard {
  title: string;
  headCells: any[];
  rows?: any;
  loading: boolean;
  followList: string[];
  handleFollow: (value: string) => void;
  handleUnFollow: (value: string) => void;
}
const TableCard = (props: ITableCard) => {
  const classes = useStyles();
  const {
    title,
    headCells,
    rows = {},
    loading,
    followList,
    handleFollow,
    handleUnFollow,
  } = props;
  const list = Object.values(rows);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("marketCap");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

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
        <Grid style={{ margin: "2% 0" }}>
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
          <TableContainer component={Paper}>
            <Table aria-labelledby="tableTitle" aria-label="enhanced table">
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(list, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    return (
                      <TableRow hover tabIndex={-1} key={row.symbol}>
                        <TableCell>{row.symbol}</TableCell>
                        <TableCell>
                          <Link href={`/view/${row.symbol}`}>
                            <Typography className={classes.name}>
                              {row.name}
                            </Typography>
                          </Link>
                        </TableCell>
                        <TableCell
                          className={clsx(
                            "numberAlign",
                            classes.numberAlign,
                            classes.fontBold
                          )}
                        >
                          ${decimal2digit(row.lastPrice)}
                        </TableCell>
                        <TableCell
                          className={clsx("numberAlign", classes.numberAlign)}
                        >
                          <GainerLoser
                            changeValue={row.change}
                            prefixSymbol="$"
                          />
                        </TableCell>
                        <TableCell
                          className={clsx("numberAlign", classes.numberAlign)}
                        >
                          <GainerLoser
                            changeValue={row.changePercent}
                            suffixSymbol="%"
                          />
                        </TableCell>
                        <TableCell
                          className={clsx("numberAlign", classes.numberAlign)}
                        >
                          {addComma(row.volume)}
                        </TableCell>
                        <TableCell
                          className={clsx("numberAlign", classes.numberAlign)}
                        >
                          {addComma(row.avgVolume)}
                        </TableCell>
                        <TableCell
                          className={clsx("numberAlign", classes.numberAlign)}
                        >
                          {row.marketCap !== "None"
                            ? `$${addComma(row.marketCap)}`
                            : row.marketCap}
                        </TableCell>
                        <TableCell style={{ padding: 0 }}>
                          <TableChart mini={row.mini} />
                        </TableCell>
                        <TableCell style={{ width: "15%" }}>
                          <Link href={`/view/${row.symbol}`}>
                            <Button className={classes.name}>Analyze</Button>
                          </Link>
                          <Follow
                            name={row.symbol}
                            loading={loading}
                            followList={followList}
                            follow={handleFollow}
                            unFollow={handleUnFollow}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[50, 100, 150]}
            component="div"
            count={list.length}
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
        </Grid>
      </Container>
    </div>
  );
};

interface IFollowProps {
  follow: (value: string) => void;
  unFollow: (value: string) => void;
  followList: any[];
  loading: boolean;
  name: string;
}
const Follow = (props: IFollowProps) => {
  const classes = useStyles();
  const { loading, follow, unFollow, followList, name } = props;

  const followHandler = () => {
    follow(name);
  };

  const unFollowHandler = () => {
    unFollow(name);
  };

  // eslint-disable-next-line react/destructuring-assignment
  const followed = followList.some((x: any) => x === name);

  return (
    <>
      {loading ? (
        <Button className={classes.name} disabled>
          Loading
        </Button>
      ) : followed ? (
        <Button className={classes.name} onClick={() => unFollowHandler()}>
          Unfollow
        </Button>
      ) : (
        <Button className={classes.name} onClick={() => followHandler()}>
          Follow
        </Button>
      )}
    </>
  );
};

export default TableCard;
