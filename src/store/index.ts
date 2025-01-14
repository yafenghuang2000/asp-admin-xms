import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认使用 localStorage
import { thunk } from 'redux-thunk';

import rootReducer from '@/models';
import { IStoreProps } from '@/models/tyeps';

// 明确指定 transform 的泛型参数为 Partial<IStoreProps>
const transform = createTransform<Partial<IStoreProps>, Partial<IStoreProps>, Partial<IStoreProps>>(
  (inboundState) => inboundState, // 序列化
  (outboundState: Partial<IStoreProps>) => outboundState, // 反序列化
);

// 配置持久化
const persistConfig: PersistConfig<Partial<IStoreProps>> = {
  key: 'root',
  storage,
  transforms: [transform], // 使用转换
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistedReducer = persistReducer(persistConfig as any, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// 创建持久化存储
const persistor = persistStore(store);

export { store, persistor };
