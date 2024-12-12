import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/Auth/Auth';
import tempTagsReducer from './features/TempTags/TempTags';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tempTags: tempTagsReducer,
  },
});