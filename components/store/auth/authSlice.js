import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //not-authenticated '', 'authenticated'
        uid:null,
        email:null,
        diaplayName:null,
        photoURL:null,
        errorMessage:null,
    },
    reducers: {
        login: (state, {payload} ) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.diaplayName = payload.diaplayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout:(state, {payload}) => {
            state.status='not-authenticated';
            state.uid=null;
            state.email=null;
            state.diaplayName=null;
            state.photoURL=null;
            state.errorMessage=payload?.errorMessage;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
    }
});

// Action creators are generated for each case reducer function
export const { login, logout, register, checkingCredentials } = authSlice.actions;