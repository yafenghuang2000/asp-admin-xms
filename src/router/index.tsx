import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { getCookie } from '@/utils/cookies';

const Home = React.lazy(() => import('@/pages/Home'));
const Login = React.lazy(() => import('@/pages/Login'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));
const TicketsCreate = React.lazy(() => import('@/pages/ticketsCreate'));

const isUserAuthenticated = () => {
  const user = getCookie('username');

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
    children: [
      {
        path: '/',
        element: <div>首页</div>,
      },
      {
        path: '/tickets/create',
        element: <TicketsCreate />,
      },
      {
        path: '/tickets/list',
        element: <div>工单列表</div>,
      },
      {
        path: '/customers',
        element: <div>客户列表</div>,
      },
      {
        path: '/service-records',
        element: <div>客户记录</div>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default routers;
