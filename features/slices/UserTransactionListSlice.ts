import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../models/Transaction";

export const sliceKey = "UserTransactionListSlice";

const initialState = [{}] as Transaction[];

const { reducer, actions } = createSlice({
    name: sliceKey,
    initialState,
    reducers: {
        setUserTransactions(
            state,
            { payload, type }: PayloadAction<Transaction[]>
        ) {
            state = payload;
        },
    },
});

export default reducer;
export const { setUserTransactions } = actions;
