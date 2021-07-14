import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSubscription as _useSubscription, useQuery } from 'urql';
import MetricCard from '../MetricCard';
import { actions as metricsActions } from '../reducer';

const MetricsQuery = `
  subscription MessageSub {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`
const AvailableMetricsQuery = `
  query MetricsQuery {
    getMetrics
  }
`

function useSubscription({ query }) {
  const dispatch = useDispatch();
  const [response] = _useSubscription({ query })

  useEffect(() => {
    if (response.error) {
      dispatch(metricsActions.metricError(response.error))
    } else if (response.data) {
      dispatch(metricsActions.metricReceived(response.data.newMeasurement));
    }
  }, [response, dispatch]);

}

function MetricsDashboard() {
  const dispatch = useDispatch();
  useSubscription({ query: MetricsQuery });
  const [availableMetricsResponse] = useQuery({ query: AvailableMetricsQuery });

  useEffect(() => {
    const { data, error } = availableMetricsResponse;
    if (error) {
      dispatch(metricsActions.metricError(error));
    } else if (data) {
      dispatch(metricsActions.availableOptions(data));
    }
  }, [availableMetricsResponse, dispatch]);

  const metrics = useSelector(state => state.metrics.availableOptions);

  return (
    <Grid container spacing={2}>
      {metrics.map(metric => (
        <Grid item xs={12} sm={6} md={4} key={metric}>
          <MetricCard metricName={metric}></MetricCard>
        </Grid>
      ))}
    </Grid>
  )
}

export default MetricsDashboard;
