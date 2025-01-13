# 项目环境配置指南

## 环境文件说明

项目包含以下环境配置文件：

- `.env.development` - 开发环境配置
- `.env.test` - 测试环境配置
- `.env.staging` - 预发环境配置
- `.env.production` - 生产环境配置

## 环境变量配置

每个环境配置文件必须包含对应环境的 API 基础路径配置：

```bash
# 生产环境 (.env.production)
VITE_APP_BASE_API_PRODUCTION=你的生产环境API地址

# 预发环境 (.env.staging)
VITE_APP_BASE_API_STAGING=你的预发环境API地址

# 测试环境 (.env.test)
VITE_APP_BASE_API_TEST=你的测试环境API地址

# 开发环境 (.env.development)
VITE_APP_BASE_API_DEVELOPMENT=你的开发环境API地址
```

## 部署指南

### 生产环境

```bash
# 1. 确保 .env.production 文件存在并包含必要的环境变量
# 2. 构建镜像
docker build -t my-react-app --build-arg NODE_ENV=production .

# 3. 启动服务（确保在项目根目录下执行）
docker-compose -f docker-compose.yml -f docker-compose.production.yml --env-file .env.production up -d
```

### 预发环境

```bash
# 1. 确保 .env.staging 文件存在并包含必要的环境变量
# 2. 构建镜像
docker build -t my-react-app --build-arg NODE_ENV=staging .

# 3. 启动服务
docker-compose -f docker-compose.yml -f docker-compose.staging.yml --env-file .env.staging up -d
```

### 测试环境

```bash
# 1. 确保 .env.test 文件存在并包含必要的环境变量
# 2. 构建镜像
docker build -t my-react-app --build-arg NODE_ENV=test .

# 3. 启动服务
docker-compose -f docker-compose.yml -f docker-compose.test.yml --env-file .env.test up -d
```

### 开发环境

```bash
# 1. 确保 .env.development 文件存在并包含必要的环境变量
# 2. 启动服务
docker-compose --env-file .env.development up
```

## 常见问题解决

### 环境变量未设置错误

如果遇到类似以下错误：

```bash
WARN[0000] The "VITE_APP_BASE_API_STAGING" variable is not set. Defaulting to a blank string.
services.env_file must be a mapping
```

解决步骤：

1. 检查对应环境的 `.env` 文件是否存在
2. 确保环境文件中包含所需的环境变量
3. 确保环境变量名称正确（注意大小写）

示例 `.env.production` 文件内容：

```bash
VITE_APP_BASE_API_PRODUCTION=https://api.production.example.com
```

## 注意事项

1. 所有环境变量文件 (`.env.*`) 都应该添加到 `.gitignore` 中
2. 在部署前，务必检查对应环境的环境变量是否配置完整
3. 不同环境使用不同的 API 地址，确保配置正确的环境变量
4. 环境变量的命名必须与代码中的引用保持一致
