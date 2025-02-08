import React from 'react';
import { createHashRouter, redirect } from 'react-router-dom';
import { getCookie } from '@/utils/cookies';

const LayoutHome = React.lazy(() => import('@/Layout'));
const Login = React.lazy(() => import('@/pages/Login'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));
const Home = React.lazy(() => import('@/pages/Home'));
const ApiLogs = React.lazy(() => import('@/pages/apiLogs'));
const DataDict = React.lazy(() => import('@/pages/dataDict'));
const RoleAdmin = React.lazy(() => import('@/pages/roleAdmin'));
const MenuList = React.lazy(() => import('@/pages/menuList'));
const UserAdmin = React.lazy(() => import('@/pages/userAdmin'));
const AuthList = React.lazy(() => import('@/pages/authList'));

const isUserAuthenticated = () => {
  const user = getCookie('username');
  if (!user) {
    return redirect('/login');
  }
  return null;
};

const routers = createHashRouter([
  {
    path: '/',
    element: <LayoutHome />,
    loader: isUserAuthenticated,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/systemManagement/apiLogs',
        element: <ApiLogs />,
      },
      {
        path: '/systemManagement/dataDict',
        element: <DataDict />,
      },
      {
        path: '/authMenu/roleAdmin',
        element: <RoleAdmin />,
      },
      {
        path: '/authMenu/menuList',
        element: <MenuList />,
      },
      {
        path: '/authMenu/userAdmin',
        element: <UserAdmin />,
      },
      {
        path: '/authMenu/authList',
        element: <AuthList />,
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
