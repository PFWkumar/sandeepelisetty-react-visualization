import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    paddingTop: 16,
  },
});

function AppContainer({ children }) {
  const styles = useStyles();
  return (
    <Container className={styles.root}>
      {children}
    </Container>
  )
}

export default AppContainer;
