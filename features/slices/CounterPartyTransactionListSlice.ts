import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CounterParty } from "../../models/CounterParty";
import { Transaction } from "../../models/Transaction";

export const sliceKey = "CounteryPartyTransactionListSlice";

const initialState = {
    transactions: [] as Transaction[],
}

const { reducer, actions } = createSlice({
    name: sliceKey,
    initialState,
    reducers: {
        setCounterPartyTransactions(
            state,
            { payload, type }: PayloadAction<Transaction[]>
        ) {
            state.transactions = payload;
        },
    },
});

export default reducer;
export const { setCounterPartyTransactions } = actions;
