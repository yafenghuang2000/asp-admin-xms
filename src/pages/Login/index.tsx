import React, { useEffect, useState } from 'react';
import { getUserinfo } from '@/service/userService';

const XMSlogin: React.FC = () => {
  const [user, setUser] = useState<{ username?: string }>({});
  const getUser = async () => {
    const res = await getUserinfo();
    setUser(res || {});
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <h1>Login</h1>
      <h2>{user?.username}</h2>
    </div>
  );
};

export default XMSlogin;
