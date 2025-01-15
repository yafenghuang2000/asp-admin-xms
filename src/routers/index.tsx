import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { cookieUtils } from '@/utils/Cookies';

const Home = React.lazy(() => import('@/pages/Home'));
const Login = React.lazy(() => import('@/pages/Login'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));

const isUserAuthenticated = () => {
  const user = cookieUtils.get('user');
  if (user) {
    return redirect('/login');
  }
  return null;
};

const routers = createBrowserRouter([
  {
    path: '/',
    Component: Home,
    loader: isUserAuthenticated,
    children: [],
  },
  {
    path: '/login', // 登录页面
    Component: Login,
    children: [],
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
]);

export default routers;

//404页面
