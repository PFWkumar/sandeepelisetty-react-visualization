import { createSlice } from "redux-starter-kit";

const slice = createSlice({
  name: 'metrics',
  initialState: {
    options: []
  },
  reducers: {
    metricsReceived: (state, action) => {
      const { getMetrics } = action.payload;
      state.options = [...getMetrics];
    }
  }
});

export const reducer = slice.reducer;
export const actions = slice.actions;
