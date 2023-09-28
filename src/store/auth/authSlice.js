import { createSlice } from "@reduxjs/toolkit"



export const authSlice = createSlice({
    name: 'auth',
    initialState: {},

    reducers: {

        login: (state, action) => {
            console.log(action)
            state.nif = action.payload.NIF
            state.name = action.payload.Nombre
            state.email = action.payload.Correo
            state.status = 'login'
        }
    }
})


export const { login } = authSlice.actions
