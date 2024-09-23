import { Country } from "./Country";
import { RegistrationStep } from "./RegistrationStep";
import { Role } from "./Role";
import { UserProfile } from "./UserProfile";

export interface User {
    id?: string;
    email?: string;
    username?: string;
    phone?: string;
    password?: string;
    active?: boolean;
    emailVerified?: boolean;
    phoneVerified?: boolean;
    userProfile?: UserProfile;
    created?: Date;
    updated?: Date;
    roles?: Role[];
    defaultCountry?: Country;
    registrationStep?: RegistrationStep;
}
