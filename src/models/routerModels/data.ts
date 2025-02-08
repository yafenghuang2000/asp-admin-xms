export const list = [
  {
    id: '1',
    label: '首页',
    path: '/',
  },
  {
    id: '2',
    label: '工单管理',
    children: [
      {
        id: '2-1',
        label: '新建工单',
        path: '/tickets/create',
      },
      {
        id: '2-2',
        label: '工单列表',
        path: '/tickets/list',
      },
    ],
  },
  {
    id: '3',
    label: '客户管理',
    children: [
      {
        id: '3-1',
        label: '客户列表',
        path: '/customers',
      },
      {
        id: '3-2',
        label: '服务记录',
        path: '/service-records',
      },
    ],
  },
];
