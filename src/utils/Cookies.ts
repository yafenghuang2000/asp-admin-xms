import Cookies from 'js-cookie';

interface ISetCookieType {
  key: string;
  value: string;
  options: Cookies.CookieAttributes;
}

export const cookieUtils = {
  // 设置cookie
  set: ({ key, value, options }: ISetCookieType): void => {
    Cookies.set(key, value, options);
  },

  // 获取cookie
  get: (key: string): string | undefined => Cookies.get(key),

  // 删除cookie
  remove: (key: string): void => {
    Cookies.remove(key);
  },
};
