import { createSlice } from "@reduxjs/toolkit"



export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },

    reducers: {

        updateProducts: (state, action) => {
            /* console.log(action)
            state.nif = action.payload.NIF
            state.name = action.payload.Nombre
            state.email = action.payload.Correo
            state.status = 'login' */
            state.products = [
                ...action.payload
            ]
        }
    }
})


export const { updateProducts } = productsSlice.actions
