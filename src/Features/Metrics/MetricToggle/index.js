import React, { useCallback } from 'react';
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

function MetricToggle({ value, onToggle, options }) {
  const styles = useStyles();
  const onChange = useCallback((_, value) => {
    onToggle(value)
  }, [onToggle]);
  return (
    <ToggleButtonGroup value={value} onChange={onChange} exclusive classes={styles}>
      {options.map(({ value, Icon }) => (
        <ToggleButton value={value} key={value}>
          <Icon />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}

export default MetricToggle;
