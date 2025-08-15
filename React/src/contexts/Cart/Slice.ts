import {createSlice} from "@reduxjs/toolkit";


import {CART_STATUS} from "contexts/Cart/Enum";
import {loadCart} from "contexts/Cart/Mindleware";
import {CartState} from "contexts/Cart/Type";

const initialState: CartState = {
    status: CART_STATUS.IDLE,
    cart: []
}


const cartSlice = createSlice(
    {
        name: "cart",
        initialState,
        reducers: {
            clearCart: (state): void => {
                state.status = CART_STATUS.SUCCESS
                state.cart = []
            }
        },

        extraReducers: (builder) => {
            builder.addCase(
                loadCart.pending,
                (state) => {
                    state.status = CART_STATUS.FETCHING
                    state.cart = []
                }
            ).addCase(
                loadCart.rejected,
                (state) => {
                    state.status = CART_STATUS.ERROR
                    state.cart = []
                }
            ).addCase(
                loadCart.fulfilled,
                (state, {payload: data}) => {
                    const {success, payload} = data
                    if (success) {
                        state.status = CART_STATUS.SUCCESS
                        state.cart = payload ?? []
                        return
                    }

                    state.status = CART_STATUS.ERROR
                    state.cart = []
                }
            )
        }
    }
)

const {
    actions: {
        clearCart,
    },
    reducer
} = cartSlice

export {clearCart, reducer}