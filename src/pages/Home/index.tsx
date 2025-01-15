import React, { useState } from 'react';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { IStoreProps } from '@/models/tyeps';

import './index.scss';

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const state = useSelector((state: IStoreProps) => state);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className='xms-home'>
      <div className='xms-home-left'>
        <div className='xms-home-left-header'>
          <div onClick={toggleCollapsed}>管理系统</div>
          <div></div>
        </div>
        <div className='xms-home-left-content'>
          <Menu
            className='xms-home-left-content-menu'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            theme='dark'
            inlineCollapsed={collapsed}
            items={state.routersData?.routers || []}
          />
        </div>
      </div>
      <div className='xms-home-right'>
        <div className='xms-home-right-header'></div>
        <div className='xms-home-right-content'></div>
      </div>
    </div>
  );
};

export default Home;
