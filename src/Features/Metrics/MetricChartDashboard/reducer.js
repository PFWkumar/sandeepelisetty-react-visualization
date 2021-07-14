import { createSlice } from "redux-starter-kit";

const slice = createSlice({
  name: 'chartDashboard',
  initialState: {
    selectedMetrics: []
  },
  reducers: {
    setSelectedMetrics: (state, action) => {
      state.selectedMetrics = [...action.payload]
    }
  }
});

export const actions = slice.actions;
export const reducer = slice.reducer;
