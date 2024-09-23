import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionMethod } from "../../models/TransactionMethod";

export const sliceKey = "TransactionMethodListSlice";

const initialState = {
    transactionMethodList: [] as TransactionMethod[]
}

const {actions, reducer} = createSlice({
    name: sliceKey,
    initialState,
    reducers: {
        setTransactionMethodList: (state, {payload, type}: PayloadAction<TransactionMethod[]>) => {
            state.transactionMethodList = payload
        }
    }
});

export default reducer;

export const {setTransactionMethodList} = actions;