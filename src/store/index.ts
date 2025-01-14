import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig, createTransform } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { thunk } from 'redux-thunk';

import rootReducer from '@/models';
import { IStoreProps } from '@/models/tyeps';

// 创建存储引擎
const createNoopStorage = () => ({
  getItem(): Promise<string | null> {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: unknown): Promise<unknown> {
    return Promise.resolve(value);
  },
  removeItem(): Promise<void> {
    return Promise.resolve();
  },
});

const webStorage =
  typeof window !== 'undefined' ? createWebStorage('session') : createNoopStorage();

const transform = createTransform<Partial<IStoreProps>, Partial<IStoreProps>, Partial<IStoreProps>>(
  (inboundState) => inboundState, // 序列化
  (outboundState) => outboundState, // 反序列化
);

// 配置持久化
const persistConfig: PersistConfig<Partial<IStoreProps>> = {
  key: 'asp-admin-xms',
  storage: webStorage,
  transforms: [transform], // 使用转换
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistedReducer = persistReducer(persistConfig as any, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }).concat(thunk),
});

// 创建持久化存储
const persistor = persistStore(store);

export { store, persistor };
