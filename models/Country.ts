import { Currency } from "./Currency";

export interface Country {
    id?: number;
    name?: string;
    code?: string;
    extension?: string;
    currency?: Currency;
}