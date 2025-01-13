import React from 'react';
import { RouterProvider } from 'react-router-dom';

import routers from './routers';

const App: React.FC = () => (
  <div>
    <RouterProvider router={routers} />
  </div>
);

export default App;
