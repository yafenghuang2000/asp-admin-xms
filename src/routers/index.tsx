import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';

import { cookieUtils } from '@/utils/Cookies';

const Home = React.lazy(() => import('@/pages/Home'));
const Login = React.lazy(() => import('@/pages/Login'));

const isUserAuthenticated = () => {
  const user = cookieUtils.get('user');
  if (!user) {
    return redirect('/login');
  }
  return null;
};

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    loader: isUserAuthenticated,
    children: [],
  },
  {
    path: '/login', // 登录页面
    element: <Login />,
    children: [],
  },
  {
    path: '*',
    element: <div>404页面</div>,
  },
]);

export default routers;
