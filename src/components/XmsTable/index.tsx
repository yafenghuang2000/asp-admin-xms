import React from 'react';
import { Table } from 'antd';
import './index.scss';
interface IXmsTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: Array<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<any>;
}

const XmsTable: React.FC<IXmsTableProps> = (props) => {
  const { columns, data } = props;
  return (
    <div className='xms-table'>
      <div className='xms-table-content'>
        <Table columns={columns} dataSource={data} />;
      </div>
      <div className='xms-table-footer'></div>
    </div>
  );
};

export default XmsTable;
