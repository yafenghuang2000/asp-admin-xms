// src/utils/loadComponent.ts

// 定义一个函数来动态加载组件
export const loadComponent = async (componentName: string): Promise<React.ComponentType> => {
  try {
    // 使用动态导入加载组件
    const component = await import(`@/components/${componentName}`);
    return component.default; // 返回默认导出
  } catch (error) {
    throw error; // 抛出错误以便处理
  }
};
