// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  total: 0,
};

// Create a slice
const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

// Extract reducer and actions from the slice
export const { setTotal } = balanceSlice.actions;
export const balanceReducer = balanceSlice.reducer;

// Create Redux store
const store = configureStore({
  reducer: {
    balance: balanceReducer,
  },
});

export default store;
