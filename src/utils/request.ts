import { notification } from 'antd';
import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosProgressEvent } from 'axios';
import { cookieUtils } from './Cookies';

type ParamValue = string | number | null | undefined | boolean | Date;
interface IParamsType {
  [key: string]: ParamValue | ParamValue[] | IParamsType | IParamsType[];
}

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

const get = async <T>(
  url: string,
  data: IParamsType,
  params: { handleRaw?: boolean } = {},
): Promise<T> => {
  const queryValues = getQueryString(data);
  const res = await axios.get(queryValues ? `${url}?${queryValues}` : url);
  return parse(res, params);
};

const post = async <T>(
  url: string,
  data: IParamsType,
  params: { handleRaw?: boolean } = {},
): Promise<T> => {
  const res = await axios.post(url, data);
  return parse(res, params);
};

const put = async <T>(
  url: string,
  data: IParamsType,
  params: { handleRaw?: boolean } = {},
): Promise<T> => {
  const res = await axios.put(url, data);
  return parse(res, params);
};

const del = async <T>(
  url: string,
  data: IParamsType,
  params: { handleRaw?: boolean } = {},
): Promise<T> => {
  const res = await axios.delete(url, data);
  return parse(res, params);
};

const upload = async <T>(
  url: string,
  file: File | FormData,
  params: { handleRaw?: boolean; responseType?: 'blob' } = {},
): Promise<T> => {
  const formData = file instanceof FormData ? file : new FormData();

  if (file instanceof File) {
    formData.append('file', file);
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    responseType: params.responseType,
  };

  const res = await axios.post(url, formData, config);
  return parse(res, params);
};

const uploadonUploadProgress = async <T>(
  url: string,
  file: File | FormData,
  params: {
    handleRaw?: boolean;
    responseType?: 'blob';
    onProgress?: (progress: number) => void;
  } = {},
): Promise<T> => {
  try {
    const formData = file instanceof FormData ? file : new FormData();

    if (file instanceof File) {
      formData.append('file', file);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: params.responseType,
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (params.onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          params.onProgress(progress);
        }
      },
    };

    const res = await axios.post(url, formData, config);
    // 如果上传成功，返回100%进度
    params.onProgress?.(100);
    return parse(res, params);
  } catch (error) {
    // 发生错误时，抛出异常
    throw error;
  }
};

export { get, post, put, del, upload, uploadonUploadProgress };
