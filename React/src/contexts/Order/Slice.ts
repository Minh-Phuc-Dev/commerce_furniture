import {createSlice} from "@reduxjs/toolkit";

import {ORDER_STATUS} from "contexts/Order/Enum";
import {loadOrder} from "contexts/Order/Mindleware";

import {OrderState} from "contexts/Order/Type";

const initialState: OrderState = {
    status: ORDER_STATUS.IDLE,
    order: []
}

const orderSlice = createSlice(
    {
        name: "cart",
        initialState,
        reducers: {
            clearOrder: (state): void => {
                state.status = ORDER_STATUS.SUCCESS
                state.order = []
            }
        },

        extraReducers: (builder) => {
            builder.addCase(
                loadOrder.pending,
                (state) => {
                    state.status = ORDER_STATUS.FETCHING
                    state.order = []
                }
            ).addCase(
                loadOrder.rejected,
                (state) => {
                    state.status = ORDER_STATUS.ERROR
                    state.order = []
                }
            ).addCase(
                loadOrder.fulfilled,
                (state, {payload: data}) => {
                    const {success, payload} = data
                    if (success) {
                        state.status = ORDER_STATUS.SUCCESS
                        state.order = payload ?? []
                        return
                    }

                    state.status = ORDER_STATUS.ERROR
                    state.order = []
                }
            )
        }
    }
)

const {
    actions: {
        clearOrder
    },
    reducer
} = orderSlice

export {clearOrder, reducer}