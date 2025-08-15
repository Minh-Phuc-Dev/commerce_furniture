import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthenticateService from "services/AuthenticateService.ts";

export const loadCredential = createAsyncThunk(
    "authenticate/loadCredential",
    async () => await AuthenticateService.getCredential()
)