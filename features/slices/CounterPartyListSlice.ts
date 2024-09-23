import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CounterParty } from "../../models/CounterParty";

export const sliceKey = "CounterPartyListSlice";

const initialState = {
    counterPartyList: [] as CounterParty[],
}

const {actions, reducer} = createSlice({
    name: sliceKey,
    initialState,
    reducers: {
        setCounterPartyList: (state, {payload, type}: PayloadAction<CounterParty[]>) => {
            state.counterPartyList = payload;
        }
    }
});

export default reducer;
export const { setCounterPartyList } = actions;