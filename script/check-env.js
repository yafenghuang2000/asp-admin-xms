/* eslint-disable no-console */
import fs from 'fs'; // 替换 require
import path from 'path'; // 替换 require

const requiredEnvFiles = ['.env.development', '.env.test', '.env.staging', '.env.production'];

const missingFiles = requiredEnvFiles.filter(
  (file) => !fs.existsSync(path.resolve(process.cwd(), file)),
);

if (missingFiles.length > 0) {
  console.error('错误: 缺少以下环境配置文件:');
  missingFiles.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

console.log('✅ 环境配置文件检查通过');
