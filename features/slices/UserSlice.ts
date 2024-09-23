import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import { UserProfile } from "../../models/UserProfile";
import { Role } from "../../models/Role";
import { Country } from "../../models/Country";
import { RegistrationStep } from "../../models/RegistrationStep";
import { loginAction, logoutAction, setUserPhoneGlobal } from "../GlobalActions";

export const sliceKey = "UserSlice";

const initialState = {} as User;

const { actions, reducer } = createSlice({
    name: sliceKey,
    initialState,
    reducers: {
        setUser(state, { payload, type }: PayloadAction<User>) {
            state = payload;
        },
        setEmail(state, { payload, type }: PayloadAction<string>) {
            state.email = payload;
        },
        setUsername(state, { payload, type }: PayloadAction<string>) {
            state.username = payload;
        },
        setPassword(state, { payload, type }: PayloadAction<string>) {
            state.password = payload;
        },
        setPhone(state, { payload, type }: PayloadAction<string>) {
            state.phone = payload;
        },
        toggleActive(state) {
            state.active = !state.active;
        },
        toggleEmailVerified(state) {
            state.emailVerified = !state.emailVerified;
        },
        togglePhoneVerified(state) {
            state.phoneVerified = !state.phoneVerified;
        },
        setCreated(state, { payload, type }: PayloadAction<Date>) {
            state.created = payload;
        },
        setUpdated(state, { payload, type }: PayloadAction<Date>) {
            state.updated = payload;
        },
        setUserProfile(state, { payload, type }: PayloadAction<UserProfile>) {
            state.userProfile = payload;
        },
        setRoles(state, { payload, type }: PayloadAction<Role[]>) {
            state.roles = payload;
        },
        setDefaultCountry(state, { payload, type }: PayloadAction<Country>) {
            state.defaultCountry = payload;
        },
        setRegistrationStep(
            state,
            { payload, type }: PayloadAction<RegistrationStep>
        ) {
            state.registrationStep = payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(logoutAction, (state) => {
            state = initialState;
        });
        builder.addCase(
            loginAction,
            (state, { payload, type }: PayloadAction<string | undefined>) => {
                // TODO: Load State from Token
            }
        );
        builder.addCase(
            setUserPhoneGlobal,
            (state, { payload, type }: PayloadAction<string>) => {
                state.phone = payload;
            }
        )
    },
});

export default reducer;
export const {
    setUser,
    setEmail,
    setUsername,
    setPassword,
    setPhone,
    toggleActive,
    toggleEmailVerified,
    togglePhoneVerified,
    setCreated,
    setUpdated,
    setUserProfile,
    setRoles,
    setDefaultCountry,
    setRegistrationStep,
} = actions;
