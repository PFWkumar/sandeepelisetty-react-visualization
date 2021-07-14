import React from 'react';
import { useSubscription } from 'urql';

const newMetrics = `
  subscription MessageSub {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`

function handleSubscription(x, y) {
  // console.log(x, y);
  // return y;
}

function Dashboard() {

  const [res] = useSubscription({ query: newMetrics }, handleSubscription);  

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard;
