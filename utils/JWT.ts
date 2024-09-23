import { jwtDecode } from "jwt-decode";
import { Role } from "../models/Role";

export interface CustomJWTPayload {
    exp: number;
    iat: number;
    id: string;
    roles: Role[];
    sub: string;
    username: string;
}

export const decode = (token: string): CustomJWTPayload => {
    return jwtDecode(token) as CustomJWTPayload;
};
