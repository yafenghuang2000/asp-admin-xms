import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { setUserinfo } from '@/models/userModels';

import routers from './routers';

const App: React.FC = () => {
  const dispatch = useDispatch();
  //初始化
  const getuserinfo = () => {
    const userinfo = 'admin';
    if (userinfo) {
      dispatch(setUserinfo(userinfo));
    }
  };
  useEffect(() => {
    getuserinfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <RouterProvider router={routers} />
    </div>
  );
};

export default App;
