import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './menuSlice';
import tableReducer from './tableSlice';
import authReducer from './api/auth_slice_api';
import orderReducer from './orderSlice';
import appReducer from './appSlice';
// import itemReducer from './itemsSlice.test';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    table: tableReducer,
    order: orderReducer,
    app: appReducer,
    // item: itemReducer,
  },
});
