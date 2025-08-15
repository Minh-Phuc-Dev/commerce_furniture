import {createAsyncThunk} from "@reduxjs/toolkit";
import OrderService from "services/OrderService";
import {Order} from "types/Order";
import {Product} from "types/Product";

export const loadOrder = createAsyncThunk(
    "order/loadOrder",
    async () => await OrderService.get<Order<Product>[]>()
)