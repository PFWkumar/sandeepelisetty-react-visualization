import { createSlice } from "redux-starter-kit";

const initialState = {
  availableOptions: []
}

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    availableOptions: (state, action) => {
      const { getMetrics } = action.payload;
      state.availableOptions = [...getMetrics];
    },
    metricReceived: (state, action) => {
      const { metric, at, value, unit } = action.payload;
      state[metric] = { metric, at, value, unit };
    },
    metricError: (state, _) => state
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;