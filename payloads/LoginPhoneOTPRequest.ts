import { LoginPhoneOTPRequestType } from "./LoginPhoneOTPRequestType";

export interface LoginPhoneOTPRequest {
    phone?: string;
    otp?: string;
    type?: LoginPhoneOTPRequestType;
}