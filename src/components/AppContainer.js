import React from 'react';
import Container from '@material-ui/core/Container';

function AppContainer({ children }) {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default AppContainer;
