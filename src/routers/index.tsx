import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Login = React.lazy(() => import('@/pages/Login'));

const routers = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    children: [],
  },
  {
    path: '*',
    element: <div>404页面</div>,
  },
]);

export default routers;
