import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: false,
  theme: "dark",
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
      const { userId } = action.payload; // userId of the channel owner
      if (!state.user.subscribedUsers.includes(userId)) {
        state.user.subscribedUsers.push(userId); // Add the channel owner's ID to subscribedUsers
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

    // Update user settings actions
    updateSettingsStart: (state) => {
      state.loading = true;
    },
    updateSettingsSuccess: (state, action) => {
      state.user = { ...state.user, ...action.payload }; // Merge updated settings with existing user data
      state.loading = false;
    },
    updateSettingsFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    // Update profile picture actions
    updateProfilePicStart: (state) => {
      state.loading = true;
    },
    /**
     * Updates the user's profile picture URL in the state.
     * Sets loading to false after the update.
     *
     * @param {Object} state - The current state of the user slice.
     * @param {Object} action - The action object containing the new profile picture URL as payload.
     */

    updateProfilePicSuccess: (state, action) => {
      state.user.profilePic = action.payload; // Update profile picture URL
      state.loading = false;
    },
    updateProfilePicFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    // Theme actions
    /**
     * Updates the theme in the Redux store.
     *
     * @param {Object} state - The current state of the user slice.
     * @param {Object} action - The action object containing the new theme as payload.
     */
    setReduxTheme: (state, action) => {
      state.theme = action.payload; // Update theme in Redux store
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
  updateSettingsStart,
  updateSettingsSuccess,
  updateSettingsFailure,
  updateProfilePicStart,
  updateProfilePicSuccess,
  updateProfilePicFailure,
  setReduxTheme,
} = userSlice.actions;

export default userSlice.reducer;
