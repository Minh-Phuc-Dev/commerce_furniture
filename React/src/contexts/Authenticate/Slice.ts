import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AUTHENTICATE_STATUS} from "contexts/Authenticate/Enum.ts";
import {loadCredential} from "contexts/Authenticate/Mindleware.ts";
import {AuthenticateState} from "contexts/Authenticate/Type.ts";
import {User} from "types/Authenticate";

const initialState: AuthenticateState = {
    status: AUTHENTICATE_STATUS.IDLE,
    message: "Idle.",
    user: undefined
}


const authenticateSlice = createSlice(
    {
        name: "authenticate",
        initialState,
        reducers: {
            clearCredential: (state): void => {
                state.status = AUTHENTICATE_STATUS.UNAUTHORIZED
                state.message = "Unauthorized."
                state.user = undefined
            },
            updateCredential: (state, action:PayloadAction<Partial<AuthenticateState>>): void => {
                const {payload} = action

                for (const key in payload) {
                    if (key in state) {
                        state[key] = payload[key]
                    }
                }
            }
        },

        extraReducers: (builder) => {
            builder.addCase(
                loadCredential.pending,
                (state) => {
                    state.status = AUTHENTICATE_STATUS.FETCHING
                    state.message = "Fetching."
                    state.user = undefined
                }
            ).addCase(
                loadCredential.rejected,
                (state) => {
                    state.status = AUTHENTICATE_STATUS.AUTHENTICATED
                    state.message = "Fetching abort."
                    state.user = undefined
                }
            ).addCase(
                loadCredential.fulfilled,
                (state, {payload: data}) => {
                    const {success, payload} = data
                    if (success) {
                        state.status = AUTHENTICATE_STATUS.AUTHENTICATED
                        state.message = "Authenticated."
                        state.user = payload as User
                        return
                    }

                    state.status = AUTHENTICATE_STATUS.UNAUTHORIZED
                    state.message = "Unauthorized."
                    state.user = undefined
                }
            )
        }
    }
)

const {
    actions: {
        clearCredential,
        updateCredential
    },
    reducer
} = authenticateSlice

export {clearCredential, updateCredential, reducer}