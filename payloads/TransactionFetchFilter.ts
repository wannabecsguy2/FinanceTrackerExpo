import { TransactionDirection } from "../models/TransactionDirection";

export interface TransactionFetchFilter {
    keyword?: string;
    createdBy?: string[];
    minAmount?: number;
    maxAmount?: number;
    counterPartyIds?: string[];
    directions?: TransactionDirection[];
    tagIds?: number[];
    methodIds?: number[];
    currencyIds?: number[];
    sortBy?: string;
}
