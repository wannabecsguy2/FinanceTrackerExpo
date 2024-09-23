import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../../models/Transaction";
import { logoutAction, resetTransaction } from "../GlobalActions";
import { TransactionDirection } from "../../models/TransactionDirection";
import { TransactionTag } from "../../models/TransactionTag";
import { TransactionMethod } from "../../models/TransactionMethod";
import { Currency } from "../../models/Currency";
import { CounterParty } from "../../models/CounterParty";

export const sliceKey = "TransactionSlice";

const initialState = {} as Transaction;

const { reducer, actions } = createSlice({
    name: sliceKey,
    initialState,
    reducers: {
        setTransaction(state, { payload, type }: PayloadAction<Transaction>) {
            state.id = payload.id;
            state.createdBy = payload.createdBy;
            state.counterParty = payload.counterParty;
            state.direction = payload.direction;
            state.tag = payload.tag;
            state.method = payload.method;
            state.amount = payload.amount;
            state.currency = payload.currency;
            state.date = payload.date;
            state.note = payload.note;
            state.created = payload.created;
            state.updated = payload.updated;
        },
        setId(state, { payload, type }: PayloadAction<string>) {
            state.id = payload;
        },
        setCreatedBy(state, { payload, type }: PayloadAction<string>) {
            state.createdBy = payload;
        },
        setCounterParty(state, { payload, type }: PayloadAction<CounterParty>) {
            state.counterParty = payload;
        },
        setDirection(
            state,
            { payload, type }: PayloadAction<TransactionDirection>
        ) {
            state.direction = payload;
        },
        setTag(state, { payload, type }: PayloadAction<TransactionTag>) {
            state.tag = payload;
        },
        setMethod(state, { payload, type }: PayloadAction<TransactionMethod>) {
            state.method = payload;
        },
        setAmount(state, { payload, type }: PayloadAction<number>) {
            state.amount = payload;
        },
        setCurrency(state, { payload, type }: PayloadAction<Currency>) {
            state.currency = payload;
        },
        setDate(state, { payload, type }: PayloadAction<string>) {
            state.date = payload;
        },
        setNote(state, { payload, type }: PayloadAction<string>) {
            state.note = payload;
        },
        setCreated(state, { payload, type }: PayloadAction<Date>) {
            state.created = payload;
        },
        setUpdated(state, { payload, type }: PayloadAction<Date>) {
            state.updated = payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(logoutAction, (state, action) => {
            state = initialState;
        });
        builder.addCase(resetTransaction, (state, action) => {
            state = initialState;
        });
    },
});
export default reducer;
export const {
    setTransaction,
    setId,
    setCreatedBy,
    setCounterParty,
    setDirection,
    setTag,
    setMethod,
    setAmount,
    setCurrency,
    setDate,
    setNote,
    setCreated,
    setUpdated,
} = actions;
