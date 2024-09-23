import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CounterParty } from "../../models/CounterParty";
import { CounterPartyType } from "../../models/CounterPartyType";
import { logoutAction } from "../GlobalActions";

export const sliceKey = "CounterPartySlice";

const initialState = {} as CounterParty;

const { reducer, actions } = createSlice({
    name: sliceKey,
    initialState,
    reducers: {
        setCounterParty(state, { payload, type }: PayloadAction<CounterParty>) {
            state.id = payload.id;
            state.userId = payload.userId;
            state.name = payload.name;
            state.email = payload.email;
            state.phone = payload.phone;
            state.associatedUserId = payload.associatedUserId;
            state.type = payload.type;
        },
        setId(state, { payload, type }: PayloadAction<string>) {
            state.id = payload;
        },
        setUserId(state, { payload, type }: PayloadAction<string>) {
            state.userId = payload;
        },
        setName(state, { payload, type }: PayloadAction<string>) {
            state.name = payload;
        },
        setEmail(state, { payload, type }: PayloadAction<string>) {
            state.email = payload;
        },
        setPhone(state, { payload, type }: PayloadAction<string>) {
            state.phone = payload;
        },
        setAssociatedUserId(state, { payload, type }: PayloadAction<string>) {
            state.associatedUserId = payload;
        },
        setType(state, { payload, type }: PayloadAction<CounterPartyType>) {
            state.type = payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(logoutAction, (state) => {
            state = initialState;
        });
    },
});

export default reducer;
export const {
    setCounterParty,
    setId,
    setUserId,
    setName,
    setEmail,
    setPhone,
    setAssociatedUserId,
    setType,
} = actions;
