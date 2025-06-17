import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slice.ts";
import storage from 'redux-persist/lib/storage'; 
import { 
    persistStore, 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['orders'],
  };

const persistedReducer = persistReducer(persistConfig, orderReducer);
const store = configureStore({
    reducer: {
        orders: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch