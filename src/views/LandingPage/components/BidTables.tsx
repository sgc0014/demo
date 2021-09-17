/* eslint-disable react/no-array-index-key */
import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Card,
  CardHeader,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import Grid from "@material-ui/core/Grid";
import { formatDate, decimal2digit, addComma } from "src/common/utils";
import { IAuth, ISpacrun } from "src/interface/";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "0px",
  },
  header: {
    backgroundColor: "#013c6c",
    color: "white",
    display: "flex",
    justifyContent: "center",
  },
  subHeader: {
    fontSize: 14,
    color: "white",
    display: "flex",
    justifyContent: "center",
  },
  name: {
    color: "#4787ed",
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      color: "#154782",
    },
  },
  numberAlign: {
    textAlign: "right",
  },
  fontBold: {
    fontWeight: 500,
  },
  gainers: {
    color: "green",
  },
  losers: {
    color: "red",
  },
  tabRoot: {
    width: 80,
    margin: 0,
  },
  selected: {
    width: 70,
    color: "#ffffff",
    background: "#013c6c",
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
      {parseFloat(changeValue) >= 0 ? (
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
interface ITableProps {
  auth: IAuth;
  title: string;
  headCells: any[];
  rows?: any[];
  date: string | null | undefined;
  updateDate: string | null | undefined;
  weekHeadCells: any[];
  monthlyHeadCells: any[];
  weeklyRows: any[] | undefined;
  monthlyRows: any[] | undefined;
  volume?: any;
}
function TableCard(props: ITableProps) {
  const classes = useStyles();
  const {
    auth: { isAuthenticated },
    title,
    headCells,
    rows = [],
    date,
    updateDate,
    weekHeadCells,
    monthlyHeadCells,
    weeklyRows = [],
    monthlyRows = [],
    volume,
  } = props;
  const [tabValue, setTabValue] = React.useState("1");
  const [lastUpdatedDate, setLastUpdatedDate] = React.useState<string>("");

  const handleChange = (event: any, newTab: string) => {
    setTabValue(newTab);
  };

  React.useEffect(() => {
    if (parseInt(tabValue) === 1) {
      date && setLastUpdatedDate(date);
    } else {
      updateDate && setLastUpdatedDate(updateDate);
    }
  }, [date, tabValue]);

  return (
    <Card className={classes.root}>
      <CardHeader
        title={title}
        subheader={
          lastUpdatedDate ? `Last Updated: ${formatDate(lastUpdatedDate)}` : ""
        }
        classes={{
          root: classes.header,
          title: classes.header,
          subheader: classes.subHeader,
        }}
        titleTypographyProps={{
          display: "inline",
        }}
        subheaderTypographyProps={{
          display: "inline",
        }}
      />
      <TabContext value={tabValue}>
        <AppBar position="static" color="default">
          <TabList
            onChange={handleChange}
            aria-label="top-spac-list"
            style={{ marginTop: 8 }}
          >
            <Tab
              label="Daily"
              value="1"
              classes={{ root: classes.tabRoot, selected: classes.selected }}
            />
            {volume ? (
              <Tab
                label="Volume Spike"
                value="2"
                classes={{ root: classes.tabRoot, selected: classes.selected }}
              />
            ) : (
              <Tab
                label="Weekly"
                value="2"
                classes={{ root: classes.tabRoot, selected: classes.selected }}
              />
            )}
            {volume ? (
              <Tab
                label="Average Volume"
                value="3"
                classes={{ root: classes.tabRoot, selected: classes.selected }}
              />
            ) : (
              <Tab
                label="Monthly"
                value="3"
                classes={{ root: classes.tabRoot, selected: classes.selected }}
              />
            )}
          </TabList>
        </AppBar>
        <TabPanel value="1" style={{ padding: 0 }}>
          <TableContainer
            component={Paper}
            style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={`header-${headCell.id}`}
                      align={headCell.numeric ? "right" : "left"}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, idx) => (
                  <TableRow key={`${row.symbol}-${idx}`} hover>
                    <TableCell component="th" scope="row">
                      {isAuthenticated ? (
                        <Link href={`/view/${row.symbol}`}>
                          <Typography className={classes.name}>
                            {row.symbol}
                          </Typography>
                        </Link>
                      ) : (
                        <div>{row.symbol}</div>
                      )}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        "numberAlign",
                        classes.fontBold,
                        classes.numberAlign
                      )}
                    >
                      ${decimal2digit(row.lastPrice)}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        "numberAlign",
                        classes.fontBold,
                        classes.numberAlign
                      )}
                    >
                      <GainerLoser changeValue={row.change} prefixSymbol="$" />
                    </TableCell>
                    <TableCell
                      className={clsx(
                        "numberAlign",
                        classes.fontBold,
                        classes.numberAlign
                      )}
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value="2" style={{ padding: 0 }}>
          <TableContainer
            component={Paper}
            style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {weekHeadCells.map((headCell) => (
                    <TableCell
                      key={`header-${headCell.id}`}
                      align={headCell.numeric ? "right" : "left"}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {weeklyRows.map((row, idx) => (
                  <TableRow key={`${row.symbol}-${idx}`} hover>
                    <TableCell component="th" scope="row">
                      {isAuthenticated ? (
                        <Link href={`/view/${row.symbol}`}>
                          <Typography className={classes.name}>
                            {row.symbol}
                          </Typography>
                        </Link>
                      ) : (
                        <div>{row.symbol}</div>
                      )}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        "numberAlign",
                        classes.fontBold,
                        classes.numberAlign
                      )}
                    >
                      ${decimal2digit(row.lastPrice)}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        "numberAlign",
                        classes.fontBold,
                        classes.numberAlign
                      )}
                    >
                      <GainerLoser changeValue={row.change} prefixSymbol="$" />
                    </TableCell>
                    <TableCell
                      className={clsx(
                        "numberAlign",
                        classes.fontBold,
                        classes.numberAlign
                      )}
                    >
                      <GainerLoser
                        changeValue={row.changePercent}
                        suffixSymbol="%"
                      />
                    </TableCell>
                    <TableCell
                      className={clsx("numberAlign", classes.numberAlign)}
                    >
                      {volume
                        ? `${addComma(row.volSpike)}x`
                        : addComma(row.volume)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value="3" style={{ padding: 0 }}>
          <TableContainer
            component={Paper}
            style={{ borderTopLeftRadius: "0px", borderTopRightRadius: "0px" }}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {monthlyHeadCells.map((headCell) => (
                    <TableCell
                      key={`header-${headCell.id}`}
                      align={headCell.numeric ? "right" : "left"}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {monthlyRows.map((row, idx) => (
                  <TableRow key={`${row.symbol}-${idx}`} hover>
                    <TableCell component="th" scope="row">
                      {isAuthenticated ? (
                        <Link href={`/view/${row.symbol}`}>
                          <Typography className={classes.name}>
                            {row.symbol}
                          </Typography>
                        </Link>
                      ) : (
                        <div>{row.symbol}</div>
                      )}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        "numberAlign",
                        classes.fontBold,
                        classes.numberAlign
                      )}
                    >
                      ${decimal2digit(row.lastPrice)}
                    </TableCell>
                    <TableCell
                      className={clsx(
                        "numberAlign",
                        classes.fontBold,
                        classes.numberAlign
                      )}
                    >
                      <GainerLoser changeValue={row.change} prefixSymbol="$" />
                    </TableCell>
                    <TableCell
                      className={clsx(
                        "numberAlign",
                        classes.fontBold,
                        classes.numberAlign
                      )}
                    >
                      <GainerLoser
                        changeValue={row.changePercent}
                        suffixSymbol="%"
                      />
                    </TableCell>
                    <TableCell
                      className={clsx("numberAlign", classes.numberAlign)}
                    >
                      {volume ? addComma(row.avgVolume) : addComma(row.volume)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </TabContext>
    </Card>
  );
}

interface IBidTableProps {
  auth: IAuth;
  spacrunState: ISpacrun;
}
const BidTables = (props: IBidTableProps) => {
  const classes = useStyles();
  const {
    spacrunState: {
      date,
      updateDate,
      gainers,
      losers,
      volumeLeaders,
      weeklyGainers,
      weeklyLosers,
      monthlyGainers,
      monthlyLosers,
      averageVolume,
      volumeSpike,
    },
  } = props;

  const headCells = [
    { id: "symbol", numeric: false, disablePadding: false, label: "Symbol" },
    { id: "price", numeric: true, disablePadding: false, label: "Price" },
    { id: "change", numeric: true, disablePadding: false, label: "Change" },
    {
      id: "perChange",
      numeric: true,
      disablePadding: false,
      label: "% Change",
    },
    { id: "volume", numeric: true, disablePadding: false, label: "Volume" },
  ];

  const weekHeadCells = [
    { id: "symbol", numeric: false, disablePadding: false, label: "Symbol" },
    { id: "price", numeric: true, disablePadding: false, label: "Price" },
    {
      id: "change",
      numeric: true,
      disablePadding: false,
      label: "Weekly Change",
    },
    {
      id: "perChange",
      numeric: true,
      disablePadding: false,
      label: "% Change",
    },
    { id: "volume", numeric: true, disablePadding: false, label: "Volume" },
  ];

  const monthlyHeadCells = [
    { id: "symbol", numeric: false, disablePadding: false, label: "Symbol" },
    { id: "price", numeric: true, disablePadding: false, label: "Price" },
    {
      id: "change",
      numeric: true,
      disablePadding: false,
      label: "Monthly Change",
    },
    {
      id: "perChange",
      numeric: true,
      disablePadding: false,
      label: "% Change",
    },
    { id: "volume", numeric: true, disablePadding: false, label: "Volume" },
  ];

  const volumeSpikesHeadCells = [
    { id: "symbol", numeric: false, disablePadding: false, label: "Symbol" },
    { id: "price", numeric: true, disablePadding: false, label: "Price" },
    {
      id: "change",
      numeric: true,
      disablePadding: false,
      label: "Daily Change",
    },
    {
      id: "perChange",
      numeric: true,
      disablePadding: false,
      label: "% Change",
    },
    {
      id: "volume",
      numeric: true,
      disablePadding: false,
      label: "Daily Vol/Avg Vol",
    },
  ];

  const averageVolumeHeadCells = [
    { id: "symbol", numeric: false, disablePadding: false, label: "Symbol" },
    { id: "price", numeric: true, disablePadding: false, label: "Price" },
    {
      id: "change",
      numeric: true,
      disablePadding: false,
      label: "Daily Change",
    },
    {
      id: "perChange",
      numeric: true,
      disablePadding: false,
      label: "% Change",
    },
    {
      id: "volume",
      numeric: true,
      disablePadding: false,
      label: "Average Volume",
    },
  ];

  return (
    <Container id="features-blog" style={{ maxWidth: 1350 }}>
      <Grid
        container
        spacing={4}
        className={classes.root}
        justify="space-evenly"
      >
        <Grid item md={4} xs={12} style={{ padding: 5 }}>
          <TableCard
            title="Top 10 Gainers"
            // subtitle={date ? `${formatDate(date)}` : ''}
            date={date}
            updateDate={updateDate}
            headCells={headCells}
            weekHeadCells={weekHeadCells}
            monthlyHeadCells={monthlyHeadCells}
            rows={gainers}
            weeklyRows={weeklyGainers}
            monthlyRows={monthlyGainers}
            {...props}
          />
        </Grid>
        <Grid item md={4} xs={12} style={{ padding: 5 }}>
          <TableCard
            title="Top 10 Losers"
            // subtitle={date ? `${formatDate(date)}` : ''}
            date={date}
            updateDate={updateDate}
            headCells={headCells}
            weekHeadCells={weekHeadCells}
            monthlyHeadCells={monthlyHeadCells}
            rows={losers}
            weeklyRows={weeklyLosers}
            monthlyRows={monthlyLosers}
            {...props}
          />
        </Grid>
        <Grid item md={4} xs={12} style={{ padding: 5 }}>
          <TableCard
            title="Volume Leaders"
            volume={true}
            // subtitle={date ? `${formatDate(date)}` : ''}
            date={date}
            updateDate={date}
            headCells={headCells}
            weekHeadCells={volumeSpikesHeadCells}
            monthlyHeadCells={averageVolumeHeadCells}
            rows={volumeLeaders}
            weeklyRows={volumeSpike}
            monthlyRows={averageVolume}
            {...props}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BidTables;
