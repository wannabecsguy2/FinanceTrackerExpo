import {
    AuthRoutes,
    CounterPartyRoutes,
    CountryRoutes,
    CurrencyRoutes,
    TransactionMethodRoutes,
    TransactionRoutes,
    TransactionTagRoutes,
} from "../constants/Routes";
import axios from "axios";
import { RegisterRequest } from "../payloads/RegisterRequest";
import { LoginPasswordRequest } from "../payloads/LoginPasswordRequest";
import { LoginPhoneOTPRequest } from "../payloads/LoginPhoneOTPRequest";
import { AddTransactionRequest } from "../payloads/AddTransactionRequest";
import { TransactionFetchFilter } from "../payloads/TransactionFetchFilter";
import { CounterParty } from "../models/CounterParty";
import { UpdateTransactionRequest } from "../payloads/UpdateTransactionRequest";

export const publicAxiosInstance = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const authenticatedAxiosInstance = (token: string) =>
    axios.create({
        baseURL: process.env.EXPO_PUBLIC_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        validateStatus: function (status) {
            return status >= 200 && status < 500;
        },
    });

export const AuthController = {
    register: (request: RegisterRequest) => {
        return publicAxiosInstance.post(AuthRoutes.register, request);
    },
    loginPassword: (request: LoginPasswordRequest) => {
        return publicAxiosInstance.post(AuthRoutes.loginPassword, request);
    },
    loginPhoneOtp: (request: LoginPhoneOTPRequest) => {
        return publicAxiosInstance.post(AuthRoutes.loginPhoneOtp, request);
    },
    isUsernameTaken: (username: string) => {
        return publicAxiosInstance.get(AuthRoutes.isUsernameTaken, {
            params: { username },
        });
    },
};

export const CountryController = {
    fetchAll: () => {
        return publicAxiosInstance.get(CountryRoutes.fetchAll);
    },
};

export const TransactionController = {
    add: (request: AddTransactionRequest, token: string) => {
        return authenticatedAxiosInstance(token).post(
            TransactionRoutes.add,
            request
        );
    },
    fetch: (request: TransactionFetchFilter, token: string, PageNumber: number, PageSize: number=5) => {
        return authenticatedAxiosInstance(token).post(
            TransactionRoutes.fetch,
            request,
            {
                params: {
                    PageNumber: PageNumber,
                    PageSize: PageSize
                }
            }
        );
    },
    update: (request: UpdateTransactionRequest, token: string) => {
        return authenticatedAxiosInstance(token).post(
            TransactionRoutes.update,
            request,
        );
    }
};

export const CounterPartyController = {
    fetchAll: (token: string) => {
        return authenticatedAxiosInstance(token).get(CounterPartyRoutes.fetchAll);
    },
    fetch: (id: string, token: string) => {
        return authenticatedAxiosInstance(token).get(
            CounterPartyRoutes.fetch,
            {
                params: {
                    id: id
                }
            }
        );
    },
    update: (counterParty: CounterParty, token: string) => {
        return authenticatedAxiosInstance(token).post(
            CounterPartyRoutes.update,
            counterParty
        )
    }
};

export const CurrencyController = {
    fetchAll: () => {
        return publicAxiosInstance.get(CurrencyRoutes.fetchAll);
    },
};

export const TransactionMethodController = {
    fetchAll: () => {
        return publicAxiosInstance.get(TransactionMethodRoutes.fetchAll);
    }
}

export const TransactionTagController = {
    fetchAll: () => {
        return publicAxiosInstance.get(TransactionTagRoutes.fetchAll);
    }
}
