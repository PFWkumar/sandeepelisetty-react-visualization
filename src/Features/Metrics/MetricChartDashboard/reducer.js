import { createSlice } from "redux-starter-kit";
import { chartTypes } from "../constants";

const subtractTimeInMinutes = (minutes = 0) => new Date().getTime() - (minutes * 60 * 1000);

const slice = createSlice({
  name: 'chartDashboard',
  initialState: {
    selectedMetrics: [],
    chartType: chartTypes.M30,
    realTimeDataPoints: [],
    historicalDataPoints: [],
    after: subtractTimeInMinutes(30),
    before: subtractTimeInMinutes(),
  },
  reducers: {
    setSelectedMetrics: (state, action) => {
      state.selectedMetrics = action.payload;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
      if (state.chartType !== chartTypes.RealTime) {
        state.after = subtractTimeInMinutes(state.chartType === chartTypes.M30 ? 30 : 60);
        state.before = subtractTimeInMinutes();
      }
    },
    addRealTimeDataPoint: (state, action) => {
      state.realTimeDataPoints.push(action.payload);
      // todo:
      // if (state.realTimeDataPoints.length > 300) {
      //   state.realTimeDataPoints = state.realTimeDataPoints.slice(-1, -20);
      // }
    },
    addHistoricalDataPoints: (state, action) => {
      state.historicalDataPoints = action.payload;
    },
    resetEverything: (state, _) => {
      state.realTimeDataPoints = [];
      state.historicalDataPoints = [];
    }
  }
});

export const actions = slice.actions;
export const reducer = slice.reducer;
