import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    writeFilter(state, action) {
      return (state = action.payload);
    },
  },
});

export const { writeFilter } = filterSlice.actions;
