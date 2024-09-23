import { CounterParty } from "./CounterParty";
import { Currency } from "./Currency";
import { TransactionDirection } from "./TransactionDirection";
import { TransactionMethod } from "./TransactionMethod";
import { TransactionTag } from "./TransactionTag";

export interface Transaction {
    id?: string;
    createdBy?: string;
    counterParty?: CounterParty;
    direction?: TransactionDirection;
    tag?: TransactionTag;
    method?: TransactionMethod;
    amount?: number;
    currency?: Currency;
    date?: string;
    note?: string;
    created?: Date;
    updated?: Date;
}
