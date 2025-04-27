import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
  adminName: null,
  adminEmail: null,
  adminPermissions: {
    READ: false,
    WRITE: false,
    DELETE: false,
    UPDATE: false,
  },
  adminId: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    signin: (state, action) => {
      state.status = true;
      state.adminName = action.payload.adminName;
      state.adminEmail = action.payload.adminEmail;
      state.adminPermissions = action.payload.adminPermissions || state.adminPermissions;
      state.adminId = action.payload.adminId;
    },
    signout: (state) => {
      state.status = false;
      state.adminName = null;
      state.adminEmail = null;
      state.adminPermissions = {
        READ: false,
        WRITE: false,
        DELETE: false,
        UPDATE: false,
      };
      state.adminId = null;
    },
  },
});

export const { signin, signout } = adminSlice.actions;

export default adminSlice.reducer;