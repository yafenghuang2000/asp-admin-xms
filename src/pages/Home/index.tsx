import React from 'react';
import { useSelector } from 'react-redux';

import { IStoreProps } from '@/models/tyeps';

const Home: React.FC = () => {
  const userinfoStore = useSelector((state: IStoreProps) => state);

  return (
    <div>
      <h1>Home:{userinfoStore?.userinfo.userinfo.name}</h1>
    </div>
  );
};

export default Home;
