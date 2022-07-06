import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tableData: 
    [
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
        ['', 'true', 'false', 'true', 'false', 'true', 'false', 'true'],
    ]
}

export const scheduleSlice = createSlice({
 name: 'schedule',
 initialState: {
    counter: 10
 },
 reducers: {
    increment: (state, /* action */ ) => {
        state.counter += 1;
    },
 }
});

// Action creators are generated for each case reducer function
export const { increment } = scheduleSlice.actions;