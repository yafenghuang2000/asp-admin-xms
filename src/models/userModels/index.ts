import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userinfo',
  initialState: {
    userinfo: {},
  },
  reducers: {
    setUserinfo: (state) => ({ ...state, name: 'admin-xms' }),
  },
});

export const { setUserinfo } = userSlice.actions;
export default userSlice.reducer;
