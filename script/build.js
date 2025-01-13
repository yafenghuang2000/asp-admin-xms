/* eslint-disable no-console */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// 获取命令行参数中的环境
const environment = process.argv[2] || 'production';

// 验证环境是否有效
const validEnvs = ['development', 'test', 'staging', 'production'];
if (!validEnvs.includes(environment)) {
  console.error(`错误: 无效的环境 "${environment}". 有效的环境包括: ${validEnvs.join(', ')}`);
  process.exit(1);
}

// 加载对应的环境文件
const envFile = path.resolve(process.cwd(), `.env.${environment}`);
if (!fs.existsSync(envFile)) {
  console.error(`错误: 环境配置文件不存在: ${envFile}`);
  process.exit(1);
}

console.log(`正在使用 ${environment} 环境进行构建...`);

try {
  // 执行构建命令
  execSync(`pnpm build:${environment}`, { stdio: 'inherit' });
  console.log(`✨ ${environment} 环境构建成功！`);
} catch (error) {
  console.error(`❌ 构建失败：${error.message}`);
  process.exit(1);
}
