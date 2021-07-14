import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { metricLabels } from '../constants';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  metricUnit: {
    marginLeft: '10px'
  }
});

function MetricCard({ metricName }) {
  const styles = useStyles();
  const metric = useSelector(state => state.metrics[metricName] || {})
  return (
    <Card className={styles.root}>
      <CardContent>
        <Typography color="textSecondary">
          {metricLabels[metricName] || metricName}
        </Typography>
        <Typography variant="h3" component="span">
          {metric.value}
          <Typography variant="h6" component="span" className={styles.metricUnit}>
            {metric.unit}
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default MetricCard;
