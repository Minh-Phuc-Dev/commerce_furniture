import {createAsyncThunk} from "@reduxjs/toolkit";
import CartService from "services/CartService";

export const loadCart = createAsyncThunk(
    "cart/loadCart",
    async () => await CartService.get()
)