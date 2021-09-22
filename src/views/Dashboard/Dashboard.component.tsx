import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { Money as MoneyIcon } from "@material-ui/icons";
import { CardBox, TableCard, ChartBox } from "./components";
import { addComma } from "src/common/utils";
import container from "./Dashboard.container";
import { IAuth, IUserHistoryState, ISpacrun } from "src/interface/";

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
      minHeight: 600,
      padding: "35px 0px",
      background: theme.palette.white,
      [theme.breakpoints.down("sm")]: {
        padding: "50px 0px 30px 0px",
      },
    },
    card: {
      padding: "16px 0px",
    },
    loading: {
      width: "100%",
      marginTop: "3em",
      marginBottom: "3em",
    },
    Headlink: {
      textTransform: "none",
      margin: 0,
      fontSize: 20,
      [theme.breakpoints.down("sm")]: {
        fontSize: 18,
      },
    },
    link: {
      color: "rgb(24 142 251)",
      textDecoration: "none",
      cursor: "pointer",
      "&:hover": {
        color: "#154782",
      },
    },
  })
);

// const instance = axios.create({
//   baseURL: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock',
//   // timeout: 5000,
//   headers: {
//     'x-rapidapi-key': '7bb052124cmsh2cea613cc4c90bap1842aejsn9eb4800f1c60',
//     'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
//     // 'useQueryString': true
//   }
// });
interface IDashboardProps {
  authState: IAuth;
  userHistoryState: IUserHistoryState;
  spacrunState: ISpacrun;
  onFetchHistoricalStart: (symbol: string) => void;
  onShowNotification: (status: string, message: string) => void;
  onFollow: (value: string) => void;
  onUnFollow: (value: string) => void;
}
interface IPriceData {
  price: string;
  percentage: string;
}
interface IPriceState {
  isFetching?: boolean;
  currencySymbol?: string;
  latestPrice?: null | string;
  lastPrice?: null | string;
  latestPriceChange?: null | string;
  latestPriceChangePer?: null | string;
  latestVolume?: null | number;
  lastVolume?: null | string;
  symbol?: null | string;
  longName?: null | string;
}
const Dashboard = (props: IDashboardProps) => {
  const classes = useStyles();

  const {
    authState: { isAuthenticated },
    userHistoryState: { follows },
    spacrunState: { spac, historicalLoading, spacHistory },
    onFetchHistoricalStart,
    onShowNotification,
  } = props;
  
  const [price, setPrice] = useState<IPriceState>({
    isFetching: false,
    currencySymbol: "",
    latestPrice: null,
    lastPrice: null,
    latestPriceChange: null,
    latestPriceChangePer: null,
    latestVolume: null,
    lastVolume: null,
  });
  let symbol =
    typeof document !== "undefined" &&
    document.location.pathname.split("/").slice(2, 3).toString();
 
  if (!symbol) {
    // eslint-disable-next-line prefer-destructuring
    symbol = follows[0] || "PSTH";
  }
  let historicalData: any = { name: "", candleData: null };
  if (symbol && spacHistory[symbol]) {
    historicalData = spacHistory[symbol];
  }
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setPrice({ isFetching: true });
        const item = symbol && spac[symbol];

        if (item) {
          setPrice({
            isFetching: false,
            symbol: item.symbol,
            longName: item.name || "",
            currencySymbol: "$",
            latestPrice: item.lastPrice,
            lastPrice: item.lastPrice,
            latestPriceChange: item.change,
            latestPriceChangePer: item.changePercent,
            latestVolume: item.volume,
            lastVolume: null,
          });
        }
      } catch (e) {
        console.log("FETCH PRICE ERROR: ", e);
        setPrice({ isFetching: false });
      }
    };
    if (symbol) {
      fetchPrice();
      if (!spacHistory[symbol]) {
        onFetchHistoricalStart(symbol);
      }
    }
  }, [symbol, spac, spacHistory, onFetchHistoricalStart]);

  let priceData: IPriceData | undefined;
  let priceChangeData: IPriceData | undefined;
  let priceChangePerData: IPriceData | undefined;
  let volumeData: IPriceData | undefined;

  if (
    price.latestPrice &&
    price.latestPriceChange &&
    price.latestPriceChangePer
  ) {
    priceData = {
      price: parseFloat(price.latestPrice).toFixed(2),
      percentage: "N/A",
    };
    priceChangeData = {
      price: parseFloat(price.latestPriceChange).toFixed(2),
      percentage: "N/A",
    };
    priceChangePerData = {
      price: parseFloat(price.latestPriceChangePer).toFixed(2),
      percentage: "N/A",
    };
    if (price.latestVolume) {
      volumeData = {
        price: addComma(price.latestVolume),
        percentage: "N/A",
      };
    }
  }

  const headCells = [
    { id: "date", numeric: false, disablePadding: false, label: "Date" },
    { id: "open", numeric: true, disablePadding: false, label: "Open" },
    { id: "high", numeric: true, disablePadding: false, label: "High" },
    { id: "low", numeric: true, disablePadding: false, label: "Low" },
    { id: "close", numeric: true, disablePadding: false, label: "Close" },
    {
      id: "adjClose",
      numeric: true,
      disablePadding: false,
      label: "Adj Close**",
    },
    {
      id: "perChange",
      numeric: true,
      disablePadding: false,
      label: "Price Change",
    },
    { id: "volume", numeric: true, disablePadding: false, label: "Volume" },
  ];

  const followHandler = async (value: string) => {
    if (isAuthenticated) {
      props.onFollow(value);
      onShowNotification("success", `${value} followed successfully.`);
    }
  };

  const unFollowHandler = async (value: string) => {
    if (isAuthenticated) {
      props.onUnFollow(value);
      onShowNotification("success", `${value} unfollowed successfully.`);
    }
  };

  return (
    <div className={classes.root}>
      <Container style={{ maxWidth: 1400 }}>
        <Grid style={{ margin: "2% 0" }}>
          <Typography variant="h4" className={classes.Headlink} gutterBottom>
            {price.symbol &&
              price.longName &&
              `${price.symbol} - ${price.longName}`}
          </Typography>
          <Grid container spacing={3} className={classes.card}>
            {!price.isFetching && priceData && priceChangePerData && (
              <Grid item xs={6} md={4}>
                <CardBox
                  name="Latest Price"
                  preSymbol={price.currencySymbol}
                  data={priceData}
                  change={priceChangePerData}
                />
              </Grid>
            )}
            {!price.isFetching && priceChangeData && (
              <Grid item xs={6} md={4}>
                <CardBox
                  name="Latest Price Change"
                  preSymbol="$"
                  // postSymbol="%"
                  data={priceChangeData}
                  changeType
                />
              </Grid>
            )}
            {!price.isFetching && volumeData && (
              <Grid item xs={6} md={4}>
                <CardBox name="Latest Volume" data={volumeData} />
              </Grid>
            )}
          </Grid>
          <Grid>
            {historicalData.candleData && (
              <ChartBox
                symbol={historicalData.name}
                historical={historicalData.candleData}
                follows={follows}
                onFollow={followHandler}
                onUnfollow={unFollowHandler}
              />
            )}
          </Grid>
          <Grid>
            {historicalLoading ? (
              <div className={classes.loading}>
                <CircularProgress color="primary" />
              </div>
            ) : (
              <TableCard
                title="Performance Report"
                headCells={headCells}
                rows={historicalData.historical}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default container(Dashboard);
