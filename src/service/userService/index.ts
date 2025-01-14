import { post } from '@/utils/network';

import { ISgetuserinfoData, ISgetuserinfoParams } from './type';

export const getUserinfo = (
  params: ISgetuserinfoParams = { username: '' },
): Promise<ISgetuserinfoData> => post({ url: '/api/user/getuserinfo', params: { ...params } });
