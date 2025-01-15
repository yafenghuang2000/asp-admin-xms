import { get } from '@/utils/network';

import { ISgetuserinfoData } from './type';

// export const getUserinfo = (
//   params: ISgetuserinfoParams = { username: '' },
// ): Promise<ISgetuserinfoData> => post({ url: '/api/user/getuserinfo', params: { ...params } });

export const getUserinfo = (): Promise<ISgetuserinfoData> =>
  get({ url: '/api/getUserinfo', data: {} });
