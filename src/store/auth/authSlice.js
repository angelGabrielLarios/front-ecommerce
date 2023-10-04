import { createSlice } from "@reduxjs/toolkit"



export const authSlice = createSlice({
    name: 'auth',
    initialState: {},

    reducers: {

        login: (state, action) => {
            state.nif = action.payload.nif;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.status = 'login';
        }
    }
})


export const { login } = authSlice.actions
