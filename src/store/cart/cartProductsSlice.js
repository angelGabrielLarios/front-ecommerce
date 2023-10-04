import { createSlice } from "@reduxjs/toolkit"



export const cartProductsSlice = createSlice({
    name: 'cartProducts',
    initialState: {
        cartProducts: [],
        priceTotalAll: 0
    },

    reducers: {

        changePriceTotalAll: (state, action) => {
            state.priceTotalAll = action.payload.priceTotalAllUpdate
        },
        updateCartProducts: (state, action) => {
            const { cart_product } = action.payload

            const existCartProduct = state.cartProducts.findIndex(product => product.codigo_producto === cart_product.codigo_producto)

            if (existCartProduct > -1) {
                state.cartProducts = state.cartProducts.map(product => {
                    if (product.codigo_producto === cart_product.codigo_producto) {
                        product.amount = product.amount + 1
                        return product
                    }

                    return product
                })
            }
            else {
                state.cartProducts = [
                    ...state.cartProducts,
                    { ...cart_product, amount: 1 }
                ]
            }
        },

        updateAmountCartProduct: (state, action) => {
            const { newAmount, codigo_producto } = action.payload
            console.log(newAmount, codigo_producto)

            state.cartProducts = state.cartProducts.map(product => {
                if (product.codigo_producto === codigo_producto) {
                    product.amount = newAmount
                    return product
                }
                return product
            })
        }
    }
})


export const { updateCartProducts, updateAmountCartProduct, changePriceTotalAll } = cartProductsSlice.actions
