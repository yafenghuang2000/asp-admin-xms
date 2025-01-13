import { PayloadAction } from '@reduxjs/toolkit';
export const setUserinfo = (state: { userinfo: unknown }, action: PayloadAction): unknown =>
  (state.userinfo = action.payload);
