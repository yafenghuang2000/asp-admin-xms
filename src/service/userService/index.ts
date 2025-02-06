import { post, get } from '@/utils/request';
import { IRouterResponse, IUserinfoResponse, IUuserParams } from './userServiceType.ts';

export const login = (data: IUuserParams): Promise<IUserinfoResponse> =>
  post({ url: '/login', data: data || {} });

export const getUserInfo = (): Promise<IUserinfoResponse> => get({ url: '/api/user' });

export const getRouters = (): Promise<IRouterResponse[]> => post({ url: '/api/router' });
