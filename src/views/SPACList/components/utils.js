import Highcharts from "highcharts/highstock";

export const returnHighChartDate = (highchartData) => {
  // eslint-disable-next-line react/no-this-in-sfc
  return `${Highcharts.dateFormat("%e %b %Y", new Date(highchartData.x))}<br/>${
    "$" + parseFloat(highchartData.point.y).toFixed(2)
  }`;
};

export const getHighChartColor = () => {
    return Highcharts.getOptions().colors[0]
}