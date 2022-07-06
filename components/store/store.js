import { configureStore } from '@reduxjs/toolkit';

import { playersSlice } from './player/playersSlice';
import { authSlice } from './auth/authSlice';

export const store = configureStore({ 
    reducer: {
        players: playersSlice.reducer,
        auth:authSlice.reducer,
    }
});