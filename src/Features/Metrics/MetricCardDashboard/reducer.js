import { createSlice } from "redux-starter-kit";

const initialState = {}

const slice = createSlice({
  name: 'metricDashboard',
  initialState,
  reducers: {
    metricReceived: (state, action) => {
      const { metric, at, value, unit } = action.payload;
      state[metric] = { metric, at, value, unit };
    },
    metricError: (state, _) => state
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;