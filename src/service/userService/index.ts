import { get } from '@/utils/request';
import { ISgetuserinfoData } from './type';

export const getUserinfo = (): Promise<ISgetuserinfoData> =>
  get('/api/getUserinfo', {}, { handleRaw: true });
