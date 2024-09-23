import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setOtpGlobal } from "../GlobalActions";

export const sliceKey = "OTPSlice";
const initialState = {
    otp: "",
} as {otp?: string};

const {actions, reducer} = createSlice({
    name: sliceKey,
    initialState,
    reducers: {
        setOtpScreen: (state, {payload, type}: PayloadAction<string>) => {
            state.otp = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setOtpGlobal, (state, {payload, type}: PayloadAction<string | undefined>) => {
            state.otp = payload;
        })
    }
});

export default reducer;
export const {
    setOtpScreen
} = actions;

