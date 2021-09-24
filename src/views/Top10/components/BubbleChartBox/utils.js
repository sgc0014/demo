export const returnBubbleChartHighChartDate = (highchartData) => {
  // eslint-disable-next-line react/no-this-in-sfc

  return highchartData.axis.defaultLabelFormatter.call(highchartData);
};
