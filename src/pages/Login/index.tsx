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
      <div>{user?.username ?? 'react+typescript+vite6.0+node20'}</div>
    </div>
  );
};

export default XMSlogin;
