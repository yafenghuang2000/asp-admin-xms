import fs from 'fs';

export const manualChunks = (id: string): string | null => {
  if (id.includes('node_modules')) {
    // 确保路径中没有空字节和查询参数
    const cleanId = id.replace(/\0/g, '').split('?')[0];
    // 获取文件大小（以字节为单位）
    const fileSize = fs.statSync(cleanId).size;
    const ONE_MB = 1024 * (1024 * 2);
    // 优先处理 react 和 antd 相关包
    if (cleanId.includes('react')) {
      return fileSize > ONE_MB ? 'react-vendor-large' : 'react-vendor';
    }
    if (cleanId.includes('@ant-design') || cleanId.includes('antd')) {
      return fileSize > ONE_MB ? 'antd-vendor-large' : 'antd-vendor';
    }
    // 处理其他包
    if (fileSize > ONE_MB) {
      const pkgName = cleanId.toString().split('node_modules/')[1].split('/')[0].toString();
      return `vendor-large-${pkgName.replace('@', '').replace('/', '_')}`;
    }
    return 'vendor';
  }

  return null;
};
