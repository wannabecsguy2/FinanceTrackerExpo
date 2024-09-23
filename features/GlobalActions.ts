import { createAction } from "@reduxjs/toolkit";

export const logoutAction = createAction("Logout", (token: string) => {
    return {
        payload: token,
    };
});
export const loginAction = createAction("Login");

// Reset Actions
export const resetTransaction = createAction("ResetTransaction");
export const resetCounterParty = createAction("ResetCounterParty");

// Common Fields Actions
export const setOtpGlobal = createAction("SetOtpGlobal", (otp: string) => {
    return {
        payload: otp,
    };
});
export const setUserPhoneGlobal = createAction(
    "SetUserPhoneGlobal",
    (phone: string) => {
        return {
            payload: phone,
        };
    }
);
