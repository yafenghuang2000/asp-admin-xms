import { createSlice } from '@reduxjs/toolkit';
import dataItemsNenus from '@/models/routerModels/mockData';

const routersSlice = createSlice({
  name: 'routers',
  initialState: {
    routers: [...dataItemsNenus],
  },
  reducers: {},
});

export const {} = routersSlice.actions;
export default routersSlice.reducer;
