import {configureStore} from '@reduxjs/toolkit';
import MessageReducer from './slice/messageSlice';
export const store = configureStore({
  reducer: {
    message: MessageReducer,
  }
});