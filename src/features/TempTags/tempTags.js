import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tempTags: [],
};

export const tempTagsSlice = createSlice({
  name: 'tempTags',
  initialState,
  reducers: {
    addTempTag: (state, action) => {
      state.tempTags.push(action.payload);
    },
    removeTempTag: (state, action) => {
      state.tempTags = state.tempTags.filter((tag) => tag.id!== action.payload);
    },
    clearTempTags: (state) => {
      state.tempTags = [];
    },
  },
});

export const { addTempTag, removeTempTag, clearTempTags } = tempTagsSlice.actions;
export default tempTagsSlice.reducer;