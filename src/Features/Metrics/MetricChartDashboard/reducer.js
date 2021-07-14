import { createSlice } from "redux-starter-kit";
import { chartTypes } from "../constants";

const subtractTimeInMinutes = (minutes = 0) => new Date().getTime() - (minutes * 60 * 1000);

const slice = createSlice({
  name: 'chartDashboard',
  initialState: {
    selectedMetrics: [],
    chartType: chartTypes.M30,
    realTimeDataPoints: {},
    historicalDataPoints: {},
    after: subtractTimeInMinutes(30),
    before: subtractTimeInMinutes(),
  },
  reducers: {
    setSelectedMetrics: (state, action) => {
      state.selectedMetrics = action.payload;
      state.realTimeDataPoints = {};
      state.historicalDataPoints = {};
      if (state.chartType !== chartTypes.RealTime) {
        state.after = subtractTimeInMinutes(state.chartType === chartTypes.M30 ? 30 : 60);
        state.before = subtractTimeInMinutes();
      }
      for (let index = 0; index < state.selectedMetrics.length; index++) {
        const metric = state.selectedMetrics[index];
        state.realTimeDataPoints[metric] = [];
        state.historicalDataPoints[metric] = [];
      }
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
      if (state.chartType !== chartTypes.RealTime) {
        state.after = subtractTimeInMinutes(state.chartType === chartTypes.M30 ? 30 : 60);
        state.before = subtractTimeInMinutes();       
      }
    },
    addRealTimeDataPoint: (state, action) => {
      const { metric } = action.payload;
      if (state.selectedMetrics.includes(metric)) {
        state.realTimeDataPoints[metric].push(action.payload);
      }
    },
    addHistoricalDataPoints: (state, action) => {
      action.payload.forEach(data => {
        state.historicalDataPoints[data.metric] = data.measurements
      })
    },
    resetEverything: (state, _) => {
      state.realTimeDataPoints = {};
      state.historicalDataPoints = {};
    }
  }
});

export const actions = slice.actions;
export const reducer = slice.reducer;
