import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import {
  StarOutline as StarOutlineIcon,
  Star as StarIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginTop: 30,
    borderRadius: 5,
  },
  chartContainer: {
    height: 400,
    position: "relative",
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  tableHeader: {
    color: "rgb(255 255 255)",
    backgroundColor: "rgb(1 60 108);",
    // backgroundColor: '#cccccc87',
  },
}));
interface IChartbox {
  symbol: string;
  historical: any[];
  className?: string;
  follows:any;
  onFollow: (value:string) => void;
  onUnfollow:  (value:string) => void;
}
const ChartBox = (props: IChartbox) => {
  const classes = useStyles();
  const { symbol, historical, className } = props;

  const historicalData = [];
  const volume = [];
  const dataLength = historical.length;
  let i = 0;
  for (i; i < dataLength; i += 1) {
    historicalData.push([
      parseFloat(historical[i][0]), // the date
      historical[i][1], // open
      historical[i][2], // high
      historical[i][3], // low
      historical[i][4], // close
    ]);
    volume.push([
      parseFloat(historical[i][0]), // the date
      historical[i][5], // the volume
    ]);
  }

  const options = {
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    yAxis: [
      {
        labels: {
          align: "left",
        },
        height: "80%",
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: "left",
        },
        top: "80%",
        height: "20%",
        offset: 0,
      },
    ],
    xAxis: {
      type: "datetime",
      tickInterval: 24 * 3600 * 1000, // one day
      gridLineWidth: 1,
    },
    scrollbar: {
      enabled: true,
    },
    plotOptions: {
      candlestick: {
        // color: 'red',
      
        upColor: "green",
      
        lineColor: "red",
        upLineColor: "green",
      },
      column: {
        color: "rgb(124, 181, 236)",
      },
    },
    tooltip: {
      shape: "square",
      headerShape: "callout",
      borderWidth: 0,
      shadow: false,
      positioner(width: number, height: number, point: any) {
        // eslint-disable-next-line prefer-const
        let { chart }: any = this;
        let position;
        if (point.isHeader) {
          position = {
            x: Math.max(
              // Left side limit
              chart.plotLeft,
              Math.min(
                point.plotX + chart.plotLeft - width / 2,
                // Right side limit
                chart.chartWidth - width - chart.marginRight
              )
            ),
            y: point.plotY,
          };
        } else {
          position = {
            x: point.series.chart.plotLeft,
            y: point.series.yAxis.top - chart.plotTop,
          };
        }
        return position;
      },
    },
    rangeSelector: {
      buttons: [
        {
          type: "day",
          count: 1,
          text: "1d",
        },
        {
          type: "week",
          count: 1,
          text: "1w",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
        },
        {
          type: "year",
          count: 1,
          text: "1y",
        },
        {
          type: "all",
          text: "All",
        },
      ],
      selected: 1,
      inputEnabled: true,
    },
    stockTools: {
      gui: {
        enabled: false,
      },
    },
    series: [
      {
        type: "candlestick",
        name: `${symbol} Stock Price`,
        data: historicalData,
        tooltip: {
          valueDecimals: 2,
        },
      },
      {
        type: "column",
        id: "spac-volume",
        name: `${symbol} Volume`,
        data: volume,
        yAxis: 1,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 800,
          },
          chartOptions: {
            rangeSelector: {
              inputEnabled: false,
            },
          },
        },
      ],
    },
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      style={{ border: "1px solid #ccc" }}
    >
      <CardHeader
        title={<Title {...props} />}
        classes={{
          title: classes.title,
        }}
        className={classes.tableHeader}
      />
      <CardContent>
        <div className={classes.chartContainer}>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType="stockChart"
            options={options}
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface ITitle {
  symbol: string;
  follows: any;
  onFollow: (symbol: string) => void;
  onUnfollow: (symbol: string) => void;
}
const Title = (props: ITitle) => {
  const classes = useStyles();
  const { symbol, follows, onFollow, onUnfollow } = props;
  const isFollows = follows.some((x: any) => x === symbol);
  const follow = () => {
    onFollow(symbol);
  };
  const unFollow = () => {
    onUnfollow(symbol);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "inherit", minWidth: 200 }}>
        <Typography className={classes.title}>
          {symbol} - History Chart
        </Typography>
        <div style={{ paddingLeft: 8, cursor: "pointer" }}>
          {isFollows ? (
            <Tooltip title="Unfollow">
              <StarIcon onClick={unFollow} />
            </Tooltip>
          ) : (
            <Tooltip title="Follow">
              <StarOutlineIcon onClick={follow} />
            </Tooltip>
          )}
        </div>
      </div>
      <div style={{ fontSize: 14, fontWeight: 400, textAlign: "right" }}>
        Updated every 15 minutes
      </div>
    </div>
  );
};

ChartBox.propTypes = {
  className: PropTypes.string,
};

export default ChartBox;
