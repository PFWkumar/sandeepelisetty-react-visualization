import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import { chartTypes } from '../../constants';

const useStyles = makeStyles({
  container: {
    margin: '16px 0',
  },
});

const data = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 2400
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 2210
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 2290
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 2000
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 2181
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 2500
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 2100
  }
]

function formatXAxis(tickItem) {
  const date = new Date(tickItem)
  return `${date.getHours()}:${date.getMinutes()}`;
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div>
        <Typography variant="h5" color="textSecondary" component="span">
          {payload[0].value}
        </Typography>
        <Typography variant="h6" component="span">
          {' '}{payload[0].payload.unit}
        </Typography>
      </div>
    );
  }
  return null;
}

function MetricLineChart({ metricName }) {
  const styles = useStyles();
  const data = useSelector(state => {
    const isRealTime = state.chartDashboard.chartType === chartTypes.RealTime;
    if (isRealTime) {
      return state.chartDashboard.realTimeDataPoints[metricName] || [];
    }
    return state.chartDashboard.historicalDataPoints[metricName] || [];
  })
  return (
    <ResponsiveContainer width="100%" maxHeight="500px" className={styles.container}>
      <LineChart data={data}>
        <XAxis dataKey="at" tickFormatter={formatXAxis} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Line dataKey="value" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default MetricLineChart;
