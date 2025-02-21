import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  video: null, // Current video being viewed
  videos: [], // Array of all videos (or trending videos)
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    // Fetch a single video
    videoFetchStart: (state) => {
      state.loading = true;
    },
    videoFetchSuccess: (state, action) => {
      state.video = {
        ...action.payload,
        likes: action.payload.likes || [], // Ensure likes is initialized
        dislikes: action.payload.dislikes || [], // Ensure dislikes is initialized
      };
      state.loading = false;
    },
    videoFetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    // Fetch all videos (or trending videos)
    videosFetchStart: (state) => {
      state.loading = true;
    },
    videosFetchSuccess: (state, action) => {
      state.videos = action.payload;
      state.loading = false;
    },
    videosFetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    // Like a video
    like: (state, action) => {
      const userId = action.payload;

      // Add the user's ID to the likes array if it doesn't already exist
      if (!state.video.likes.includes(userId)) {
        state.video.likes.push(userId);
      }

      // Remove the user's ID from the dislikes array if it exists
      state.video.dislikes = state.video.dislikes.filter((id) => id !== userId);
    },

    // Dislike a video
    dislike: (state, action) => {
      const userId = action.payload;

      // Add the user's ID to the dislikes array if it doesn't already exist
      if (!state.video.dislikes.includes(userId)) {
        state.video.dislikes.push(userId);
      }

      // Remove the user's ID from the likes array if it exists
      state.video.likes = state.video.likes.filter((id) => id !== userId);
    },
  },
});

export const {
  videoFetchStart,
  videoFetchSuccess,
  videoFetchFailure,
  videosFetchStart,
  videosFetchSuccess,
  videosFetchFailure,
  like,
  dislike,
} = videoSlice.actions;

export default videoSlice.reducer;