import React, { useCallback, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DynamicFeed from '@material-ui/icons/DynamicFeed';
import SvgIcon from '@material-ui/core/SvgIcon';
import MetricSelect from './MetricSelect';
import MetricToggle from '../MetricToggle';
import { chartTypes } from '../constants';
import { useQuery, useSubscription } from 'urql';
import { MetricsQuery } from '../MetricCardDashboard';
import { actions as chartActions } from './reducer';
import { useDispatch, useSelector } from 'react-redux';

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
  const metricsRef = useRef([]);
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
    }
  });
  // useEffect(() => {
  //   if (JSON.stringify(metricsRef.current) !== JSON.stringify(metrics)) {
  //     metricsRef.current = JSON.parse(JSON.stringify(metrics));
  //   }
  // }, [metrics]);
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
  }, [realTimeMeasurements.data, dispatch])
  useEffect(() => {
    if (historicMeasurements.data && historicMeasurements.data.getMultipleMeasurements) {
      dispatch(chartActions.addHistoricalDataPoints(historicMeasurements.data.getMultipleMeasurements));
    }
  }, [historicMeasurements.data, dispatch]);
  return { realTimeData, historicData, dispatch, chartType };
}


function MetricChartDashboard() {
  // const classes = useStyles();
  const { dispatch, chartType } = useMetricMeasurements();

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
      <Grid item xs={12}>

      </Grid>
    </Grid>
  )
}

export default MetricChartDashboard;
