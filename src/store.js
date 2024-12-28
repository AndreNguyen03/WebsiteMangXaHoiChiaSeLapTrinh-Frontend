import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/Auth/Auth';
import tempTagsReducer from './features/TempTags/TempTags';
import { comment } from 'postcss';
import commentReducer from './features/Comment/commentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tempTags: tempTagsReducer,
    comment: commentReducer,
  },
});