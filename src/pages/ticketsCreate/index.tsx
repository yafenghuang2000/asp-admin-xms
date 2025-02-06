import React, { useEffect, useState } from 'react';

const TicketsCreate: React.FC = () => {
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    setTitle('Tickets Create');
  }, []);
  return <div>{title}</div>;
};

export default TicketsCreate;
