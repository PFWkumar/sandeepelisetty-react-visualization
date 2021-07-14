import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'urql';
import Box from '@material-ui/core/Box';
import MetricCardDashboard from './MetricCardDashboard';
import MetricToggle from './MetricToggle';
import { actions as metricActions } from './reducer';
import MetricChartDashboard from './MetricChartDashboard';

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
    const { data } = availableMetricsResponse;
    if (data) {
      dispatch(metricActions.metricsReceived(data));
    }
  }, [availableMetricsResponse, dispatch]);
  return (
    <Box>
      <MetricToggle value={toggle} onToggle={setToggle} />
      {toggle === 'dashboard' ? <MetricCardDashboard /> : <MetricChartDashboard />}
    </Box>
  )
}

export default MetricsHome;
