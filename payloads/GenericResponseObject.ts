import { ErrorCode } from "../models/ErrorCode";

export interface GenericResponseObject<T> {
    success?: boolean;
    message?: string;
    data?: T;
    errorCode?: ErrorCode;
}