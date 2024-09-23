import { createSlice } from "@reduxjs/toolkit";
import { loginAction, logoutAction } from "../GlobalActions";

export const sliceKey = "AuthSlice";

const initialState = {
    loggedIn: false,
};

const { actions, reducer } = createSlice({
    name: sliceKey,
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(loginAction, (state) => {
            state.loggedIn = true;
        }),
        builder.addCase(logoutAction, (state) => {
            state.loggedIn = false;
        });
    },
});

export default reducer;
