import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as DashboardReducer } from '../Features/Dashboard/reducer';

export default {
  weather: weatherReducer,
  dashboard: DashboardReducer,
};
