import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

import { metricLabels } from '../../constants';

const useInputStyles = makeStyles({
  root: {
    border: '1px solid #ccc',
    borderRadius: '5px',
  }
})

const useStyles = makeStyles({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '0px 5px',
  },
})

function MetricSelect() {
  const [selection, setSelection] = useState([])
  const inputClasses = useInputStyles();
  const classes = useStyles();
  const metricOptions = useSelector(state => state.metrics.options)

  const handleChange = useCallback(event => {
    const { value } = event.target;
    setSelection(value);
  }, [setSelection]);

  const removeSelectedMetric = useCallback(metric => {
    setSelection(selection.filter(value => metric !== value))
  }, [selection])

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
