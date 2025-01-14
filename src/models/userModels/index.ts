import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'userinfo',
  initialState: {
    userinfo: {
      name: 'admin',
    },
  },
  reducers: {
    setUserinfo: (state, actio) => ({ ...state, userinfo: actio.payload }),
  },
});

export const { setUserinfo } = userSlice.actions;
export default userSlice.reducer;
