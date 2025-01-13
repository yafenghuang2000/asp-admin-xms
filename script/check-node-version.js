/* eslint-disable no-console */
import { satisfies } from 'semver';

async function loadPackageJson() {
  return await import('../package.json', { assert: { type: 'json' } });
}

(async () => {
  try {
    const packageJson = await loadPackageJson();
    const { engines, packageManager } = packageJson.default;

    // 检查 Node 版本
    const requiredNodeVersion = engines?.node;
    if (requiredNodeVersion && !satisfies(process.version, requiredNodeVersion)) {
      console.error('\x1b[31m%s\x1b[0m', '错误: Node.js 版本不匹配');
      console.error('\x1b[33m%s\x1b[0m', `当前版本: ${process.version}`);
      console.error('\x1b[33m%s\x1b[0m', `要求版本: ${requiredNodeVersion}`);
      console.error('\x1b[36m%s\x1b[0m', '请使用 nvm 安装或切换到正确的 Node 版本:');
      console.error('\x1b[36m%s\x1b[0m', `  nvm install ${requiredNodeVersion}`);
      console.error('\x1b[36m%s\x1b[0m', `  nvm use ${requiredNodeVersion}`);
      process.exit(1);
    }

    // 检查包管理器
    if (packageManager) {
      const userAgent = process.env.npm_config_user_agent || '';
      const currentPackageManager = userAgent.split('/')[0];
      const requiredPackageManager = packageManager.split('@')[0];

      if (currentPackageManager && currentPackageManager !== requiredPackageManager) {
        console.error('\x1b[31m%s\x1b[0m', `错误: 请使用 ${requiredPackageManager} 作为包管理器`);
        console.error('\x1b[33m%s\x1b[0m', `当前使用: ${currentPackageManager}`);
        console.error('\x1b[36m%s\x1b[0m', `请运行: ${requiredPackageManager} install`);
        process.exit(1);
      }
    } else {
      console.warn('\x1b[33m%s\x1b[0m', '警告: package.json 中未定义 packageManager 字段');
    }
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '加载 package.json 失败:', error.message);
    process.exit(1);
  }
})();
