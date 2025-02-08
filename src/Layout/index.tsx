import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Input, Layout, Menu } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userImg from '@/assets/useer.svg';
import xmsImg from '@/assets/xmsImg.svg';
import { IStoreProps } from '@/models/types';
import { convertToMenuItems, IMenuItem } from './data.ts';

import './index.scss';

const { Header, Content, Sider } = Layout;

const formatMenuItems = (items: IMenuItem[]): MenuProps['items'] => {
  if (!items || items.length === 0) return [];
  return items.map((item) => {
    return {
      key: item.id,
      label: item.path ? <Link to={item.path}>{item.label}</Link> : item.label,
      icon: item.icon,
      children: item.children ? formatMenuItems(item.children) : undefined,
    };
  });
};

const Home: React.FC = () => {
  const location = useLocation();
  const routersData = useSelector((state: IStoreProps) => state.routersData);
  const userinfo = useSelector((state: IStoreProps) => state.userinfo);

  const [searchText, setSearchText] = useState<string>('');
  const [menuData, setmenuData] = useState<IMenuItem[]>([]);

  const getMenuData = async () => {
    setmenuData(convertToMenuItems(routersData?.routerList || []));
  };

  useEffect(() => {
    getMenuData();
  }, []);

  // 根据搜索文本过滤菜单
  const filterMenu = (items: IMenuItem[]): IMenuItem[] => {
    if (items.length === 0 || !items) return [];
    return items.filter((item) => {
      const match = item.label.toLowerCase().includes(searchText.toLowerCase());
      if (item.children) {
        const childMatch = filterMenu(item.children);
        return childMatch.length > 0 || match;
      }
      return match;
    });
  };

  const getSelectedKeys = () =>
    menuData
      .flatMap(getAllPaths)
      .filter((p) => p.path === location.pathname)
      .map((p) => p.id);

  // 递归获取所有路径
  const getAllPaths = (item: IMenuItem): Array<{ id: string; path: string }> => {
    if (item.path) return [{ id: item.id, path: item.path }];
    return item.children?.flatMap(getAllPaths) || [];
  };

  return (
    <div className='asp-comprehension-home'>
      <Layout style={{ height: '100%', width: '100%' }}>
        <Sider collapsedWidth='0' width={220} theme='light'>
          <div className='asp-comprehension-home-menu'>
            <div className='asp-comprehension-home-menu-logo'>
              <img src={xmsImg} alt='' />
              <span className='asp-comprehension-home-menu-logo-title'>售后管理系统</span>
            </div>
            <div className='asp-comprehension-home-menu-search'>
              <Input
                variant='filled'
                placeholder='搜索'
                allowClear
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className='asp-comprehension-home-menu-content'>
              <Menu
                theme='light'
                mode='inline'
                selectedKeys={getSelectedKeys()}
                items={formatMenuItems(filterMenu(menuData))}
                defaultOpenKeys={menuData.map((item) => item.id)}
              />
            </div>
          </div>
        </Sider>

        <Layout>
          <Header className='asp-comprehension-home-header'>
            <div className='asp-comprehension-home-header-content'>
              <div className='asp-comprehension-home-header-content-user'>
                <img src={userImg} alt='' />
                <div>{userinfo.name}</div>
              </div>
            </div>
          </Header>
          <Content>
            <div className='asp-comprehension-home-content'>
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Home;
