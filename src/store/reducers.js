import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricDashboardReducer } from '../Features/Metrics/MetricCardDashboard/reducer';
import { reducer as metricsReducer } from '../Features/Metrics/reducer';
import { reducer as metricChartReducer } from '../Features/Metrics/MetricChartDashboard/reducer';

export default {
  weather: weatherReducer,
  cardDashboard: metricDashboardReducer,
  metrics: metricsReducer,
  chartDashboard: metricChartReducer,
};
