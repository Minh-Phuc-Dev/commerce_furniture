import { createAsyncThunk } from "@reduxjs/toolkit";
import ChatService from "services/ChatbotService";

export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    ChatService.chat
)