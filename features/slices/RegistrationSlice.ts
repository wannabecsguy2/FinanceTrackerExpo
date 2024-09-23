import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterRequest } from "../../payloads/RegisterRequest";
import { RegistrationStep } from "../../models/RegistrationStep";
import { setOtpGlobal, setUserPhoneGlobal } from "../GlobalActions";

export const sliceKey = "RegistrationSlice";

const initialState = {} as RegisterRequest;

const { actions, reducer } = createSlice({
    name: sliceKey,
    initialState,
    reducers: {
        setForm: (state, { payload, type }: PayloadAction<RegisterRequest>) => {
            state = payload;
        },
        setPhone: (state, { payload, type }: PayloadAction<string>) => {
            state.phone = payload;
        },
        setPassword: (state, { payload, type }: PayloadAction<string>) => {
            state.password = payload;
        },
        setEmail: (state, { payload, type }: PayloadAction<string>) => {
            state.email = payload;
        },
        setFirstName: (state, { payload, type }: PayloadAction<string>) => {
            state.firstName = payload;
        },
        setLastName: (state, { payload, type }: PayloadAction<string>) => {
            state.lastName = payload;
        },
        setUsername: (state, { payload, type }: PayloadAction<string>) => {
            state.username = payload;
        },
        setBirthDate: (state, { payload, type }: PayloadAction<Date>) => {
            state.birthDate = payload;
        },
        setDefaultCountryId: (
            state,
            { payload, type }: PayloadAction<number>
        ) => {
            state.defaultCountryId = payload;
        },
        setOtp: (state, { payload, type }: PayloadAction<string>) => {
            state.otp = payload;
        },
        setRegistrationStep: (
            state,
            { payload, type }: PayloadAction<RegistrationStep>
        ) => {
            state.registrationStep = payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(
            setOtpGlobal,
            (state, { payload, type }: PayloadAction<string | undefined>) => {
                state.otp = payload;
            }
        );
        builder.addCase(
            setUserPhoneGlobal,
            (state, { payload, type }: PayloadAction<string | undefined>) => {
                state.phone = payload;
            }
        )
    },
});

export default reducer;
export const {
    setForm,
    setPhone,
    setPassword,
    setEmail,
    setFirstName,
    setLastName,
    setUsername,
    setBirthDate,
    setDefaultCountryId,
    setOtp,
    setRegistrationStep,
} = actions;
