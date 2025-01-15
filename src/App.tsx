import React, { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import routers from '@/routers';

const App: React.FC = () => (
  <Suspense fallback={<div>...加载中</div>}>
    <RouterProvider router={routers} />
  </Suspense>
);
export default App;
