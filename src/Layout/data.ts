import React from 'react';
import { IRouterResponse } from '@/service/userService/userServiceType.ts';
export interface IMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: IMenuItem[];
}

export const convertToMenuItems = (items: IRouterResponse[]): IMenuItem[] =>
  items.map((item) => {
    return {
      id: item.id,
      label: item.label,
      path: item.path,
      children: item.children ? convertToMenuItems(item.children) : undefined,
    };
  });
