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

axios.interceptors.response.use(
  (response: AxiosResponse) => parse(response),
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

const parse = (res: AxiosResponse) => {
  const { status } = res;

  switch (status) {
    case 200:
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

export const get = async ({ url, params }: IRequestConfingType): Promise<unknown> => {
  const queryValues = getQueryString(params);
  const res: AxiosResponse = await axios.get(queryValues ? `${url}?${queryValues}` : url);
  return res;
};

export const post = async ({ url, params }: IRequestConfingType): Promise<unknown> => {
  const res: AxiosResponse = await axios.post(url, params);
  return res;
};
