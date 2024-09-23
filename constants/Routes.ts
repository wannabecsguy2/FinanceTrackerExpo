export const AuthRoutes = {
    register: "/auth/register",
    loginPassword: "/auth/login-password",
    loginPhoneOtp: "/auth/login-phone-otp",
    isUsernameTaken: "/auth/is-username-taken",
}

export const CountryRoutes = {
    fetchAll: "/country/fetch-all"
}

export const TransactionRoutes = {
    add: "/transaction/add",
    update: "/transaction/update",
    delete: "/transaction/delete",
    batchDelete: "/transaction/batch-delete",
    fetch: "/transaction/fetch",
}

export const CounterPartyRoutes = {
    fetchAll: "/counter-party/fetch-all",
    fetch: "/counter-party/fetch",
    update: "/counter-party/update"
}

export const CurrencyRoutes = {
    fetchAll: "/currency/fetch-all"
}

export const TransactionMethodRoutes = {
    fetchAll: "/transaction-method/fetch-all"
}

export const TransactionTagRoutes = {
    fetchAll: "/transaction-tag/fetch-all"
}