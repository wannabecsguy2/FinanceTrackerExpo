import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Country } from "../../models/Country";

export const sliceKey = "CountryListSlice";

const initialState = {
    countries: [] as Country[]
}

const {actions, reducer} = createSlice({
    name: sliceKey,
    initialState,
    reducers: {
        setCountries: (state, {payload, type}: PayloadAction<Country[]>) => {
            state.countries = payload;
        }
    }
});

export default reducer;
export const {
    setCountries
} = actions;