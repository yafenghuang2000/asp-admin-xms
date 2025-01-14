import { createBrowserRouter } from 'react-router-dom';

// import Home from '@/pages/Home';
import Login from '@/pages/Login';

const routers = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    children: [],
  },
  {
    path: '*',
    element: <div>404页面</div>,
  },
]);

export default routers;
