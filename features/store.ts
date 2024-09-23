import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer, { sliceKey as AuthSliceKey } from "./slices/AuthSlice";
import CounterPartyListReducer, { sliceKey as CounterPartyListSliceKey } from "./slices/CounterPartyListSlice";
import CounterPartyReducer, { sliceKey as CounterPartySliceKey } from "./slices/CounterPartySlice";
import CounterPartyTransactionListReducer, { sliceKey as CounterPartyTransactionListSliceKey } from "./slices/CounterPartyTransactionListSlice";
import CountryListReducer, { sliceKey as CountryListSliceKey } from "./slices/CountryListSlice";
import CurrenyListReducer, { sliceKey as CurrenyListSliceKey } from "./slices/CurrencyListSlice";
import OTPSlice, { sliceKey as OTPSliceKey } from "./slices/OTPSlice";
import RegistrationSlice, { sliceKey as RegistrationSliceKey } from "./slices/RegistrationSlice";
import TransactionSlice, {sliceKey as TransactionSliceKey } from "./slices/TransactionSlice";
import TransactionTagListSlice, {sliceKey as TransactionTagListSliceKey} from "./slices/TransactionTagListSlice";
import TransactionMethodListSlice, {sliceKey as TransactionMethodListSliceKey} from "./slices/TransactionMethodListSlice";
import TransactionSearchFilterSlice, {sliceKey as TransactionSearchFilterSliceKey} from "./slices/TransactionSearchFilterSlice";
import UserSlice, { sliceKey as UserSliceKey } from "./slices/UserSlice";

import { configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
    [AuthSliceKey]: AuthReducer,
    [CounterPartyListSliceKey]: CounterPartyListReducer,
    [CounterPartySliceKey]: CounterPartyReducer,
    [CounterPartyTransactionListSliceKey]: CounterPartyTransactionListReducer,
    [CountryListSliceKey]: CountryListReducer,
    [CurrenyListSliceKey]: CurrenyListReducer,
    [OTPSliceKey]: OTPSlice,
    [RegistrationSliceKey]: RegistrationSlice,
    [TransactionSliceKey]: TransactionSlice,
    [TransactionTagListSliceKey]: TransactionTagListSlice,
    [TransactionMethodListSliceKey]: TransactionMethodListSlice,
    [TransactionSearchFilterSliceKey]: TransactionSearchFilterSlice,
    [UserSliceKey]: UserSlice
});

const store = configureStore({
    reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;