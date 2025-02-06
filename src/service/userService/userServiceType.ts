export interface IUserinfoResponse {
  id: number;
  name: string;
  age: number;
}

export interface IUuserParams {
  username?: string;
}

export interface IRouterResponse {
  // 根据实际情况定义字段
  id: string;
  label: string;
  path?: string;
  children?: IRouterResponse[];
}
