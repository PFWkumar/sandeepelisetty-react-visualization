import React from 'react';
import { useSelector } from 'react-redux';
import Select from '@material-ui/core/Select';

function MetricChartDashboard() {
  const metricOptions = useSelector(state => state.metrics.options)
  return (
    <div>
      <Select autoWidth placeholder="Select Metric or Metrics" multiple />
    </div>
  )
}

export default MetricChartDashboard;
