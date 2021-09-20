import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { returnHighChartDate, getHighChartColor } from "./utils";
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    justifyContent: "center",
  },
  tableChart: {
    width: 120,
    height: 30,
  },
}));

interface ITableChartProps {
  mini: any;
  className?: string;
}

const TableChart = (props: ITableChartProps) => {
  const classes = useStyles();
  const { mini, className } = props;

  const options = {
    chart: {
      zoomType: "x",
      width: 100,
      height: 50,
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    yAxis: {
      visible: false,
    },
    xAxis: {
      type: "datetime",
      visible: false,
    },
    tooltip: {
      // enabled: false,
      backgroundColor: "none",
      borderWidth: 0,
      shadow: false,
      useHTML: true,
      padding: 0,
      formatter() {
       return returnHighChartDate(this);
      },
      positioner() {
        return { x: 0, y: 0 };
      },
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, getHighChartColor()],
            [
              1,
              Highcharts.color(getHighChartColor()).setOpacity(0).get("rgba"),
            ],
          ],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },
    series: [
      {
        type: "area",
        // name: '',
        showInLegend: false,
        data: mini,
      },
    ],
  };

  return (
    <div className={clsx("tableChart", classes.root, className)}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0)",
        }}
      />
    </div>
  );
};

export default TableChart;
