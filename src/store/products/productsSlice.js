import { createSlice } from "@reduxjs/toolkit"



export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },

    reducers: {

        updateProducts: (state, action) => {
            state.products = [
                ...action.payload.update_products
            ]
        }
    }
})


export const { updateProducts } = productsSlice.actions
