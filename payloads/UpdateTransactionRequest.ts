import { TransactionDirection } from "../models/TransactionDirection";

export interface UpdateTransactionRequest {
    id: string
    counterPartyId: string;
    direction: TransactionDirection;
    tagId: number;
    methodId: number;
    amount: number;
    date: string;
    currencyId: string;
    note?: string
}