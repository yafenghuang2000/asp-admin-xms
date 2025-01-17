import React, { useState } from 'react';
import { Button, Progress, message } from 'antd';
import { uploadonUploadProgress } from '@/utils/request';

const FileUpload: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      await uploadonUploadProgress<{ url: string }>(
        '/api/upload', // 你的上传接口地址
        file,
        {
          onProgress: (progress) => {
            setUploadProgress(progress);
          },
        },
      );

      message.success('文件上传成功！');
    } catch (error) {
      message.error(`上传失败：${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <input type='file' onChange={handleFileUpload} style={{ display: 'none' }} id='fileInput' />
      <Button onClick={() => document.getElementById('fileInput')?.click()} loading={isUploading}>
        选择文件上传
      </Button>

      {isUploading && (
        <div style={{ marginTop: '20px', width: '200px' }}>
          <Progress percent={uploadProgress} />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
