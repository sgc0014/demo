import React from "react";
import clsx from "clsx";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import TabPanel from "@material-ui/lab/TabPanel";
import { ISpacrun } from "src/interface/";

if (typeof Highcharts === "object") {
  HighchartsMore(Highcharts);
}

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    marginTop: 30,
    borderRadius: 5,
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
  chartContainer: {
    height: 430,
    position: "relative",
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

interface IGainerLoserData {
  x: number;
  y: number;
  z: number;
  i: string;
  symbol: string;
  name: string;
  color: string;
}
interface IBubbleChartProps {
  spacrunState: ISpacrun;
  className?: string;
}
const BubbleChartBox = (props: IBubbleChartProps) => {
  const classes = useStyles();
  const {
    spacrunState: {
      gainers,
      losers,
      weeklyGainers,
      weeklyLosers,
      monthlyGainers,
      monthlyLosers,
    },
    className,
  } = props;
  const [tabValue, setTabValue] = React.useState("1");

  const handleChange = (event: any, newTab: string) => {
    setTabValue(newTab);
  };

  let gainerData: IGainerLoserData[] = [];
  let losersData: IGainerLoserData[] = [];
  let weeklyGainersData: IGainerLoserData[] = [];
  let weeklyLosersData: IGainerLoserData[] = [];
  let monthlyGainersData: IGainerLoserData[] = [];
  let monthlyLosersData: IGainerLoserData[] = [];
  gainers &&
    gainers.map((value) => {
      const price = parseFloat(value.lastPrice).toFixed(2);
      const changePer = parseFloat(value.changePercent).toFixed(2);
      const priceChange = `$${parseFloat(value.change).toFixed(2)}`;
      gainerData.push({
        x: parseInt(value.volume),
        y: parseFloat(changePer),
        z: parseFloat(price),
        i: priceChange,
        symbol: value.symbol,
        name: `${value.symbol} - ${value.name}`,
        color: "#3d8116",
      });
    });

  losers &&
    losers.map((value) => {
      const price = parseFloat(value.lastPrice).toFixed(2);
      const changePer = parseFloat(value.changePercent).toFixed(2);
      const priceChange = `-$${parseFloat(value.change)
        .toFixed(2)
        .replace("-", "")}`;
      losersData.push({
        x: parseInt(value.volume),
        y: parseFloat(changePer),
        z: parseFloat(price),
        i: priceChange,
        symbol: value.symbol,
        name: `${value.symbol} - ${value.name}`,
        color: "#ff0000",
      });
    });

  weeklyGainers &&
    weeklyGainers.map((value) => {
      const price = parseFloat(value.lastPrice).toFixed(2);
      const changePer = parseFloat(value.changePercent).toFixed(2);
      const priceChange = `$${parseFloat(value.change).toFixed(2)}`;
      weeklyGainersData.push({
        x: parseInt(value.volume),
        y: parseFloat(changePer),
        z: parseFloat(price),
        i: priceChange,
        symbol: value.symbol,
        name: `${value.symbol}`,
        color: "#3d8116",
      });
    });

  weeklyLosers &&
    weeklyLosers.map((value) => {
      const price = parseFloat(value.lastPrice).toFixed(2);
      const changePer = parseFloat(value.changePercent).toFixed(2);
      const priceChange = `-$${parseFloat(value.change)
        .toFixed(2)
        .replace("-", "")}`;
      weeklyLosersData.push({
        x: parseInt(value.volume),
        y: parseFloat(changePer),
        z: parseFloat(price),
        i: priceChange,
        symbol: value.symbol,
        name: `${value.symbol}`,
        color: "#ff0000",
      });
    });

  monthlyGainers &&
    monthlyGainers.map((value) => {
      const price = parseFloat(value.lastPrice).toFixed(2);
      const changePer = parseFloat(value.changePercent).toFixed(2);
      const priceChange = `$${parseFloat(value.change).toFixed(2)}`;
      monthlyGainersData.push({
        x: parseInt(value.volume),
        y: parseFloat(changePer),
        z: parseFloat(price),
        i: priceChange,
        symbol: value.symbol,
        name: `${value.symbol}`,
        color: "#3d8116",
      });
    });

  monthlyLosers &&
    monthlyLosers.map((value) => {
      const price = parseFloat(value.lastPrice).toFixed(2);
      const changePer = parseFloat(value.changePercent).toFixed(2);
      const priceChange = `-$${parseFloat(value.change)
        .toFixed(2)
        .replace("-", "")}`;
      monthlyLosersData.push({
        x: parseInt(value.volume),
        y: parseFloat(changePer),
        z: parseFloat(price),
        i: priceChange,
        symbol: value.symbol,
        name: `${value.symbol}`,
        color: "#ff0000",
      });
    });

  const options = {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
      zoomType: "xy",
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "",
    },
    accessibility: {
      point: {
        valueDescriptionFormat:
          "{index}. {point.name}, volume: {point.x}, Change Percent: {point.y}%, Price: ${point.z}.",
      },
    },
    xAxis: {
      gridLineWidth: 1,
      title: {
        text: "Volume",
      },
      labels: {
        // format: '{value}'
        formatter: function () {
          return this.axis.defaultLabelFormatter.call(this);
        },
      },
    },
    yAxis: {
      startOnTick: false,
      endOnTick: false,
      title: {
        text: "% Change",
      },
      labels: {
        format: "{value}%",
      },
      maxPadding: 0.2,
      plotLines: [
        {
          color: "black",
          dashStyle: "dot",
          width: 2,
          value: 0,
          zIndex: 3,
        },
      ],
    },
    tooltip: {
      useHTML: true,
      headerFormat: "<table>",
      pointFormat:
        '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
        "<tr><th>Price:</th><td>${point.z}</td></tr>" +
        "<tr><th>Price Change:</th><td>{point.i}</td></tr>" +
        "<tr><th>% Change:</th><td>{point.y}%</td></tr>" +
        "<tr><th>Volume:</th><td>{point.x}</td></tr>",
      footerFormat: "</table>",
      followPointer: true,
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.symbol}",
        },
      },
    },
    series: [
      {
        data: gainerData,
      },
      {
        data: losersData,
      },
    ],
  };

  const weeklyOptions = {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
      zoomType: "xy",
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "",
    },
    accessibility: {
      point: {
        valueDescriptionFormat:
          "{index}. {point.name}, volume: {point.x}, Change Percent: {point.y}%, Price: ${point.z}.",
      },
    },
    xAxis: {
      gridLineWidth: 1,
      title: {
        text: "Volume",
      },
      labels: {
        // format: '{value}'
        formatter: function () {
          return this.axis.defaultLabelFormatter.call(this);
        },
      },
    },
    yAxis: {
      startOnTick: false,
      endOnTick: false,
      title: {
        text: "% Change",
      },
      labels: {
        format: "{value}%",
      },
      maxPadding: 0.2,
      plotLines: [
        {
          color: "black",
          dashStyle: "dot",
          width: 2,
          value: 0,
          zIndex: 3,
        },
      ],
    },
    tooltip: {
      useHTML: true,
      headerFormat: "<table>",
      pointFormat:
        '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
        "<tr><th>Price:</th><td>${point.z}</td></tr>" +
        "<tr><th>Price Change:</th><td>{point.i}</td></tr>" +
        "<tr><th>% Change:</th><td>{point.y}%</td></tr>" +
        "<tr><th>Volume:</th><td>{point.x}</td></tr>",
      footerFormat: "</table>",
      followPointer: true,
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.symbol}",
        },
      },
    },
    series: [
      {
        data: weeklyGainersData,
      },
      {
        data: weeklyLosersData,
      },
    ],
  };

  const monthlyOptions = {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
      zoomType: "xy",
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    title: {
      text: "",
    },
    accessibility: {
      point: {
        valueDescriptionFormat:
          "{index}. {point.name}, volume: {point.x}, Change Percent: {point.y}%, Price: ${point.z}.",
      },
    },
    xAxis: {
      gridLineWidth: 1,
      title: {
        text: "Volume",
      },
      labels: {
        // format: '{value}'
        formatter: function (): any {
          return this.axis.defaultLabelFormatter.call(this);
        },
      },
    },
    yAxis: {
      startOnTick: false,
      endOnTick: false,
      title: {
        text: "% Change",
      },
      labels: {
        format: "{value}%",
      },
      maxPadding: 0.2,
      plotLines: [
        {
          color: "black",
          dashStyle: "dot",
          width: 2,
          value: 0,
          zIndex: 3,
        },
      ],
    },
    tooltip: {
      useHTML: true,
      headerFormat: "<table>",
      pointFormat:
        '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
        "<tr><th>Price:</th><td>${point.z}</td></tr>" +
        "<tr><th>Price Change:</th><td>{point.i}</td></tr>" +
        "<tr><th>% Change:</th><td>{point.y}%</td></tr>" +
        "<tr><th>Volume:</th><td>{point.x}</td></tr>",
      footerFormat: "</table>",
      followPointer: true,
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.symbol}",
        },
      },
    },
    series: [
      {
        data: monthlyGainersData,
      },
      {
        data: monthlyLosersData,
      },
    ],
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      style={{ border: "1px solid #ccc" }}
    >
      <CardHeader
        title="Top 10 Gainer/Losers"
        classes={{
          title: classes.title,
        }}
        className={classes.tableHeader}
      />
      <CardContent>
        <div className={classes.chartContainer}>
          <TabContext value={tabValue}>
            <AppBar
              position="static"
              color="default"
              style={{ boxShadow: "none", backgroundColor: "#fff" }}
            >
              <TabList
                onChange={handleChange}
                aria-label="top-spac-list"
                style={{ marginTop: 8 }}
              >
                <Tab
                  label="Daily"
                  value="1"
                  classes={{
                    root: classes.tabRoot,
                    selected: classes.selected,
                  }}
                />
                <Tab
                  label="Weekly"
                  value="2"
                  classes={{
                    root: classes.tabRoot,
                    selected: classes.selected,
                  }}
                />
                <Tab
                  label="Monthly"
                  value="3"
                  classes={{
                    root: classes.tabRoot,
                    selected: classes.selected,
                  }}
                />
              </TabList>
            </AppBar>
            <TabPanel value="1" style={{ padding: 0 }}>
              <HighchartsReact
                highcharts={Highcharts}
                // constructorType="chart"
                options={options}
              />
            </TabPanel>
            <TabPanel value="2" style={{ padding: 0 }}>
              <HighchartsReact
                highcharts={Highcharts}
                options={weeklyOptions}
              />
            </TabPanel>
            <TabPanel value="3" style={{ padding: 0 }}>
              <HighchartsReact
                highcharts={Highcharts}
                options={monthlyOptions}
              />
            </TabPanel>
          </TabContext>
        </div>
      </CardContent>
    </Card>
  );
};

export default BubbleChartBox;
