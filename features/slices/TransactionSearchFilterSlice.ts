import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionFetchFilter } from "../../payloads/TransactionFetchFilter";
import { TransactionDirection } from "../../models/TransactionDirection";
export const sliceKey = "TransactionSearchFilterSlice";

const initialState = {} as TransactionFetchFilter;

const { actions, reducer } = createSlice({
    name: sliceKey,
    initialState,
    reducers: {
        setCreatedBy: (state, { payload, type }: PayloadAction<string[]>) => {
            state.createdBy = payload;
        },
        setMinAmount: (state, { payload, type }: PayloadAction<number>) => {
            state.minAmount = payload;
        },
        setMaxAmount: (state, { payload, type }: PayloadAction<number>) => {
            state.maxAmount = payload;
        },
        setCounterPartyIds: (
            state,
            { payload, type }: PayloadAction<string[]>
        ) => {
            state.counterPartyIds = payload;
        },
        setDirections: (
            state,
            { payload, type }: PayloadAction<TransactionDirection[]>
        ) => {
            state.directions = payload;
        },
        setTagIds: (state, { payload, type }: PayloadAction<number[]>) => {
            state.tagIds = payload;
        },
        setMethodIds: (state, { payload, type }: PayloadAction<number[]>) => {
            state.methodIds = payload;
        },
        setCurrencyIds: (state, { payload, type }: PayloadAction<number[]>) => {
            state.currencyIds = payload;
        },
        setSortBy: (
            state,
            { payload, type }: PayloadAction<"created" | "amount" | "date">
        ) => {
            state.sortBy = payload;
        },
    },
});

export default reducer;
export const {
    setCreatedBy,
    setMinAmount,
    setMaxAmount,
    setCounterPartyIds,
    setDirections,
    setTagIds,
    setMethodIds,
    setCurrencyIds,
    setSortBy,
} = actions;
