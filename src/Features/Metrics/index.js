import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'urql';
import Box from '@material-ui/core/Box';
import MetricsCardDashboard from './MetricsCardDashboard';
import MetricToggle from './MetricToggle';
import { actions as metricsActions } from './reducer';
import MetricsChartDashboard from './MetricsChartDashboard';

const AvailableMetricsQuery = `
  query MetricsQuery {
    getMetrics
  }
`

function MetricsHome() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState('dashboard');
  const [availableMetricsResponse] = useQuery({ query: AvailableMetricsQuery });
  useEffect(() => {
    const { error, data } = availableMetricsResponse;
    if (error) {
      dispatch(metricsActions.metricError(error));
    } else if (data) {
      dispatch(metricsActions.availableOptions(data));
    }
  }, [availableMetricsResponse, dispatch]);
  return (
    <Box>
      <MetricToggle value={toggle} onToggle={setToggle} />
      {toggle === 'dashboard' ? <MetricsCardDashboard /> : <MetricsChartDashboard />}
    </Box>
  )
}

export default MetricsHome;
