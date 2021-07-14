import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricDashboardReducer } from '../Features/Metrics/MetricCardDashboard/reducer';
import { reducer as metricsReducer } from '../Features/Metrics/reducer';

export default {
  weather: weatherReducer,
  metricDashboard: metricDashboardReducer,
  metrics: metricsReducer,
};
