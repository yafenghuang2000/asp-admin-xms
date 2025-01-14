import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import routers from '@/routers';
import './index.scss';

const Layout: React.FC = () => (
  <div className='xms-home'>
    <div className='xms-home-left'></div>
    <div className='xms-home-right'>
      <div className='xms-home-right-header'></div>
      <div className='xms-home-right-content'>
        <Suspense fallback={<div>...加载中</div>}>
          <RouterProvider router={routers} />
        </Suspense>
      </div>
    </div>
  </div>
);

export default Layout;
