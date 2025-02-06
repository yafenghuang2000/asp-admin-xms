import { createSlice } from '@reduxjs/toolkit';

const routersSlice = createSlice({
  name: 'xms/router',
  initialState: {
    routers: [],
  },
  reducers: {},
});

export const {} = routersSlice.actions;
export default routersSlice.reducer;
