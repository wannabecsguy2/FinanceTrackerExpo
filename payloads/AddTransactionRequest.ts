import { TransactionDirection } from "../models/TransactionDirection";

export interface AddTransactionRequest {
    counterPartyId: string;
    direction: TransactionDirection;
    tagId: number;
    methodId: number;
    amount: number;
    date: string;
    currencyId: string;
    note?: string
}