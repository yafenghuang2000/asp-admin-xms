import { notification } from 'antd';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { cookieUtils } from '../Cookies';

import { IParamsType, IRequestConfingType } from './types';

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = cookieUtils.get('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

const getQueryString = (params: IParamsType) => {
  if (!params) return '';
  const result: string[] = [];
  Object.keys(params).forEach((keys) => {
    const value = params[keys];
    if (Array.isArray(value)) {
      result.push(`${keys}=${encodeURIComponent(value.join(','))}`);
    } else {
      result.push(`${keys}=${encodeURIComponent(String(value))}`);
    }
  });

  return result.join('&');
};

const parse = (res: AxiosResponse, params: { handleRaw?: boolean } = {}) => {
  const { status } = res;
  const { handleRaw } = params;

  switch (status) {
    case 200:
      if (handleRaw) {
        return res.data;
      }
      if (res.data.code === 0) {
        return res.data.data;
      } else if (res.data.code === 401) {
        notification.open({
          type: 'warning',
          message: '提示',
          description: '登陆超时,请你重新登陆',
          placement: 'bottomRight',
        });
        window.location.reload();
        return;
      } else {
        notification.open({
          type: 'error',
          message: '提示',
          description: res.data.data.message || '系统异常',
          placement: 'bottomRight',
        });
        return;
      }
    case 401:
      notification.open({
        type: 'warning',
        message: '提示',
        description: '登陆超时,请你重新登陆',
        placement: 'bottomRight',
      });
      window.location.reload();
      return;
  }

  return null;
};

export const get = async <T>({ url, data, params }: IRequestConfingType): Promise<T> => {
  const queryValues = getQueryString(data);
  const res = await axios.get(queryValues ? `${url}?${queryValues}` : url);
  return parse(res, params);
};

export const post = async <T>({ url, data, params }: IRequestConfingType): Promise<T> => {
  const res = await axios.post(url, data);
  return parse(res, params);
};
