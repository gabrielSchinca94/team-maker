import {createSlice, current} from '@reduxjs/toolkit';

const initialState = {
    players:[],
    active:null,
}



export const playersSlice = createSlice({
    name:'players',
    initialState,
    reducers:{
        makeActive:(state, action) => {
            state.active = state.players.find(p => p.id === action.payload.id);
        },
        update:(state, action) => {
            state.players=state.players.map((player) => 
                player.id === action.payload.id
                    ? action.payload
                    : player
            );
            state.active = null;
        },
        remove: (state, action) => {
            state.players = state.players.filter((player) => 
                player.id !== action.payload.id
            );
            state.active = null;
        },
        newEntry:(state, action) => {
            state.active = action.payload;
            state.players = [action.payload, ...state.players];
            state.isSaving = false;
        },
        setPlayers:(state, action) => {
            state.players = action.payload;
        },
        updateImage:(state, action) => {
            state.active.imageUrl = action.payload.url;
        },
        clearPlayersOnLogout:(state) => {
            state.players = [];
            state.active = null;
        },
    },
})



export const { update, remove, newEntry, setPlayers, updateImage, makeActive, clearPlayersOnLogout } = playersSlice.actions;