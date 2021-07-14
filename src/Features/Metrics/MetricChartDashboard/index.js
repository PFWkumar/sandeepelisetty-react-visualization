import React, { useCallback, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DynamicFeed from '@material-ui/icons/DynamicFeed';
import { useQuery, useSubscription } from 'urql';
import { useDispatch, useSelector } from 'react-redux';

import MetricSelect from './MetricSelect';
import MetricToggle from '../MetricToggle';
import { chartTypes, metricLabels } from '../constants';
import { MetricsQuery } from '../MetricCardDashboard';
import MetricLineChart from './MetricLineChart';
import { actions as chartActions } from './reducer';

const MeasurementQuery = `
  query MeasurementQuery($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric,
      measurements {
        at
        value
        unit
      }
    }
  }
`;

const useStyles = makeStyles(theme => ({
  container: {}
}))

function generateSpan(text) {
  return function TextSpan() {
    return <span>{text}</span>
  }
}

const options = [
  { value: chartTypes.RealTime, Icon: DynamicFeed },
  { value: chartTypes.M30, Icon: generateSpan('30M') },
  { value: chartTypes.M60, Icon: generateSpan('60M') }
]

function useMetricMeasurements() {
  const dispatch = useDispatch();
  const { chartType, metrics, realTimeData, historicData } = useSelector(state => {
    return {
      chartType: state.chartDashboard.chartType,
      metrics: state.chartDashboard.selectedMetrics.map(metric => ({
        metricName: metric,
        after: state.chartDashboard.after,
        before: state.chartDashboard.before,
      })),
      realTimeData: state.chartDashboard.realTimeDataPoints,
      historicData: state.chartDashboard.historicalDataPoints,
    };
  });

  const [realTimeMeasurements] = useSubscription({
    query: MetricsQuery,
    pause: chartType !== chartTypes.RealTime || metrics.length === 0
  });

  const [historicMeasurements] = useQuery({
    query: MeasurementQuery,
    pause: chartType === chartTypes.RealTime,
    variables: {
      input: metrics
    }
  });

  useEffect(() => {
    if (realTimeMeasurements.data) {
      dispatch(chartActions.addRealTimeDataPoint(realTimeMeasurements.data.newMeasurement));
    }
  }, [realTimeMeasurements.data, dispatch]);

  useEffect(() => {
    if (historicMeasurements.data && historicMeasurements.data.getMultipleMeasurements) {
      dispatch(chartActions.addHistoricalDataPoints(historicMeasurements.data.getMultipleMeasurements));
    }
  }, [historicMeasurements.data, dispatch]);

  return { realTimeData, historicData, dispatch, chartType, metrics };
}


function MetricChartDashboard() {
  // const classes = useStyles();
  const { dispatch, chartType, metrics } = useMetricMeasurements();

  const setChartType = useCallback(value => {
    if (value) {
      dispatch(chartActions.resetEverything());
      dispatch(chartActions.setChartType(value));
    }
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MetricSelect />
      </Grid>
      <Grid item xs={12}>
        <MetricToggle value={chartType} onToggle={setChartType} options={options} />
      </Grid>
      {metrics.length === 0 && <div>No Charts to display</div>}
      {metrics.map(metric => (
        <Grid item md={12} lg={6} key={metric.metricName}>
          <Typography color="textSecondary" variant="h5" component="div">
            {metricLabels[metric.metricName]}
          </Typography>
          <MetricLineChart metricName={metric.metricName} />
        </Grid>
      ))}
    </Grid>
  )
}

export default MetricChartDashboard;
