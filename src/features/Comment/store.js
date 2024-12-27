import { configureStore } from "/node_modules/.vite/deps/@reduxjs_toolkit.js?v=ec022609";
import authReducer from "/src/features/Auth/Auth.js";
import tempTagsReducer from "/src/features/TempTags/tempTags.js";
import { comment } from "/node_modules/.vite/deps/postcss.js?v=ec022609";
import { fetchComments, addComment } from "../Comment/commentSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tempTags: tempTagsReducer,
    fetchComments: fetchComments,
    addComment: addComment,
    comment: comment,
  },
});