import React, { useCallback } from 'react';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  }
}));

function MetricToggle({ value, onToggle }) {
  const styles = useStyles();
  const onChange = useCallback((_, value) => {
    onToggle(value)
  }, [onToggle]);
  return (
    <ToggleButtonGroup value={value} onChange={onChange} exclusive classes={styles}>
      <ToggleButton value="dashboard">
        <DashboardIcon />
      </ToggleButton>
      <ToggleButton value="graphs">
        <InsertChartIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default MetricToggle;
