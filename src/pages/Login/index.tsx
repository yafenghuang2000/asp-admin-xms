import React, { useEffect, useState } from 'react';

const XMSlogin: React.FC = () => {
  const [username, setusername] = useState<string>('');
  useEffect(() => {
    setusername('admin');
  }, []);
  return (
    <div>
      <h1>Login</h1>
      <h2>{username}</h2>
    </div>
  );
};

export default XMSlogin;
