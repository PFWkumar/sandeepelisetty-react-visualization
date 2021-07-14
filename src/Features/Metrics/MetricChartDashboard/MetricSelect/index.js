import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

import { actions as chartActions } from '../reducer';
import { metricLabels } from '../../constants';

const useInputStyles = makeStyles(theme => ({
  root: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    // marginBottom: theme.spacing(2),
    minHeight: 48,
  }
}))

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1) / 2,
  },
}))

function MetricSelect() {
  const dispatch = useDispatch();
  const inputClasses = useInputStyles();
  const classes = useStyles();

  const { selection, metricOptions } = useSelector(state => ({
    selection: state.chartDashboard.selectedMetrics,
    metricOptions: state.metrics.options
  }));

  const handleChange = useCallback(event => {
    const { value } = event.target;
    dispatch(chartActions.setSelectedMetrics(value));
  }, [dispatch]);

  const removeSelectedMetric = useCallback(metric => {
    dispatch(chartActions.setSelectedMetrics(selection.filter(value => metric !== value)));
  }, [selection, dispatch])

  function renderChip(selected) {
    return (
      <div className={classes.chips}>
        {selected.map(value =>
          <Chip
            key={value}
            color="secondary"
            label={metricLabels[value] || value}
            className={classes.chip}
            onDelete={() => removeSelectedMetric(value)} />
        )}
      </div>
    )
  }

  return (
    <Select
      multiple
      value={selection}
      onChange={handleChange}
      input={<Input fullWidth disableUnderline classes={inputClasses} component="div" placeholder="Metrics" />}
      variant="outlined"
      renderValue={renderChip}
    >
      {metricOptions.map(metric => (
        <MenuItem key={metric} value={metric}>
          <Checkbox checked={selection.includes(metric)} />
          <ListItemText primary={metricLabels[metric] || metric} />
        </MenuItem>
      ))}
    </Select>
  )
}

export default MetricSelect;
