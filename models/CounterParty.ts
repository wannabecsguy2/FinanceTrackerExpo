import { CounterPartyType } from "./CounterPartyType";

export interface CounterParty {
    id?: string;
    userId?: string;
    name?: string;
    email?: string;
    phone?: string;
    associatedUserId?: string;
    type?: CounterPartyType
}