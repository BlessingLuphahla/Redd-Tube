import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    videoFetchStart: (state) => {
      state.loading = true;
    },
    videoFetchSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    videoFetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { videoFetchStart, videoFetchSuccess, videoFetchFailure } =
  videoSlice.actions;
export default videoSlice.reducer;
