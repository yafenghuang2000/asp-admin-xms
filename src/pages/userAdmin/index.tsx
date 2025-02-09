import { FC } from 'react';
import { Button } from 'antd';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import XmsHeader from '@/components/xms-header';
import PagesTable from '@/components/pagesTable';
import './index.scss';

const UserAdmin: FC = () => {
  return (
    <div className='useradmin'>
      <div className='useradmin-header'>
        <XmsHeader
          title='用户管理'
          actionButtons={[
            <Button key='add' type='primary' icon={<PlusOutlined />}>
              添加用户
            </Button>,
            <Button key='export' type='default' icon={<DownloadOutlined />}>
              导出用户
            </Button>,
          ]}
        />
      </div>
      <div className='useradmin-content'>
        <div className='useradmin-content-body'>
          <PagesTable />
        </div>
      </div>
    </div>
  );
};

export default UserAdmin;
