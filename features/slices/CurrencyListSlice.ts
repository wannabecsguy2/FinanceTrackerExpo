import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "../../models/Currency";
import { logoutAction } from "../GlobalActions";

export const sliceKey = "CurrencyListSlice";

const initialState = {
    currencies: [] as Currency[],
}

const { reducer, actions } = createSlice({
    name: sliceKey,
    initialState,
    reducers: {
        setCurrencies(state, { payload, type }: PayloadAction<Currency[]>) {
            state.currencies = payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(logoutAction, (state) => {
            state = initialState;
        });
    },
});

export default reducer;
export const { setCurrencies } = actions;
