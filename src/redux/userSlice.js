import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Login actions
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = false;
    },

    // Subscription actions
    subStart: (state) => {
      state.loading = true;
    },
    subSuccess: (state, action) => {
      if (!state.user.subscribedUsers.includes(action.payload)) {
        state.user.subscribedUsers.push(action.payload); // Add the channel owner's ID to subscribedUsers
      }
      state.loading = false;
    },
    subFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    unsubStart: (state) => {
      state.loading = true;
    },
    unsubSuccess: (state, action) => {
      const { userId } = action.payload; // userId of the channel owner
      state.user.subscribedUsers = state.user.subscribedUsers.filter(
        (id) => id !== userId
      ); // Remove the channel owner's ID from subscribedUsers
      state.loading = false;
    },
    unsubFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  subStart,
  subSuccess,
  subFailure,
  unsubStart,
  unsubSuccess,
  unsubFailure,
} = userSlice.actions;

export default userSlice.reducer;
