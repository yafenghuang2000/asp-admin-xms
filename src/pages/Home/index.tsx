import React from 'react';
import XmsTable from '@/components/XmsTable';
import './index.scss';

const Home: React.FC = () => (
  <div className='xms-home'>
    <XmsTable
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (text: string) => <a>{text}</a>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ]}
      data={[]}
    />
  </div>
);

export default Home;
