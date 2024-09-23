import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionTag } from "../../models/TransactionTag";
import { RootState } from "../store";

export const sliceKey = "TransactionTagListSlice";

const initialState = {
    transactionTagList: [] as TransactionTag[],
};

const { actions, reducer } = createSlice({
    name: sliceKey,
    initialState,
    reducers: {
        setTransactionTagList: (
            state,
            { payload, type }: PayloadAction<TransactionTag[]>
        ) => {
            state.transactionTagList = payload;
        },
    },
});

export default reducer;
export const { setTransactionTagList } = actions;
