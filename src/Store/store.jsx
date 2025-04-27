import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../features/authSlice';
import adminSlice from '../features/adminSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        admin: adminSlice,
    },
});

export default store;