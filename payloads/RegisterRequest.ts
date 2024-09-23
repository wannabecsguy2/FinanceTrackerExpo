import { RegistrationStep } from "../models/RegistrationStep";

export interface RegisterRequest {
    phone?: string; // Format: {Extension}-{Number}
    email?: string;
    password?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    defaultCountryId?: number;
    registrationStep: RegistrationStep;
    otp?: string;
}