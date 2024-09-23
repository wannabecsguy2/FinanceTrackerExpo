import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Heading,
    Input,
    ScrollView,
    Text,
    ToggleGroup,
    View,
} from "tamagui";
import { RootState } from "../features/store";
import {
    setPassword,
    setPhone,
    setRoles,
    setUsername,
} from "../features/slices/UserSlice";
import { PhoneInput } from "../components/PhoneInput";
import { AuthController, CountryController } from "../utils/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { GenericResponseObject } from "../payloads/GenericResponseObject";
import { Country } from "../models/Country";
import { setCountries } from "../features/slices/CountryListSlice";
import { OTPVerification } from "../components/OTPVerification";
import { LoginPasswordRequest } from "../payloads/LoginPasswordRequest";
import * as SecureStore from "../utils/SecureStore";
import { LoginPhoneOTPRequestType } from "../payloads/LoginPhoneOTPRequestType";
import { decode } from "../utils/JWT";
import { loginAction } from "../features/GlobalActions";

function LoginScreen() {
    // Hooks
    const dispatch = useDispatch();

    // useEffects
    useEffect(() => {
        if (countryList === undefined || countryList.length === 0) {
            CountryController.fetchAll()
                .then(
                    (
                        response: AxiosResponse<
                            GenericResponseObject<Country[]>
                        >
                    ) => {
                        dispatch(setCountries(response.data.data!));
                    }
                )
                .catch((error: AxiosError) => {
                    console.log(error);
                });
        }
    }, []);

    // States
    const [loginType, setLoginType] = useState<"password" | "otp">("otp");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [mobile, setMobile] = useState("");
    const [country, setCountry] = useState<Country>();
    const [loginOtpRequestType, setLoginOtpRequestType] =
        useState<LoginPhoneOTPRequestType>(LoginPhoneOTPRequestType.SEND);

    // Redux
    const UserDetails = useSelector((state: RootState) => state.UserSlice);
    const countryList = useSelector(
        (state: RootState) => state.CountryListSlice.countries
    );
    const otp = useSelector((state: RootState) => state.OTPSlice.otp);

    // Handlers
    const handleCountryChange = (value: string) => {
        countryList.forEach((country) => {
            if (country.id!.toString() === value) {
                setCountry(country);
                dispatch(setPhone(country.extension + "-" + mobile));
            }
        });
    };

    const handleSubmit = () => {
        if (loginType === "password") {
            AuthController.loginPassword({
                username: UserDetails.username,
                password: UserDetails.password,
            } as LoginPasswordRequest)
                .then(
                    (
                        response: AxiosResponse<GenericResponseObject<string>>
                    ) => {
                        if (response.data.success) {
                            // TODO: Handle JWT Parse and Store
                            SecureStore.setItem(
                                "token",
                                response.data.data!
                            ).then(() => {
                                const jwtPayload = decode(response.data.data!);
                                dispatch(setUsername(jwtPayload.username));
                                dispatch(setRoles(jwtPayload.roles));

                                // TODO: Handle Clearing States
                                dispatch(setPassword(""));

                                // TODO: Handle Navigation
                            });
                        }
                    }
                )
                .catch((error: AxiosError) => {
                    console.log(error);
                });
        } else {
            if (loginOtpRequestType === LoginPhoneOTPRequestType.SEND) {
                AuthController.loginPhoneOtp({
                    phone: country!.extension + "-" + mobile,
                    type: loginOtpRequestType,
                })
                    .then(
                        (
                            response: AxiosResponse<GenericResponseObject<any>>
                        ) => {
                            console.log(response);
                            if (response.data.success) {
                                setLoginOtpRequestType(
                                    LoginPhoneOTPRequestType.VERIFY
                                );
                            } else {
                                // TODO: Handle Error
                            }
                        }
                    )
                    .catch((error: AxiosError) => {
                        console.log(error.toJSON());
                    });
            } else {
                AuthController.loginPhoneOtp({
                    phone: UserDetails.phone,
                    type: loginOtpRequestType,
                    otp: otp,
                }).then(
                    (response: AxiosResponse<GenericResponseObject<any>>) => {
                        if (response.data.success) {
                            SecureStore.setItem(
                                "token",
                                response.data.data!
                            ).then(() => {
                                const jwtPayload = decode(response.data.data!);
                                dispatch(setUsername(jwtPayload.username));
                                dispatch(setRoles(jwtPayload.roles));

                                // TODO: Handle Clearing States
                                dispatch(setPassword(""));
                                dispatch(loginAction())
                                // TODO: Handle Navigation
                            });
                        }
                    }
                ).catch((error: AxiosError) => {
                    console.log(error.toJSON());
                });
            }
        }
    };

    return (
        <ScrollView
            backgroundColor={"$background"}
            fullscreen
            contentContainerStyle={{ flex: 1 }}
        >
            <View margin={"$5"} flex={1}>
                <Heading size={"$9"} marginBottom={"$2"}>
                    Welcome Back!
                </Heading>
                <Heading size={"$2"} marginBottom={"$5"}>
                    Proceed to Login
                </Heading>
                {/* @ts-ignore */}
                <ToggleGroup
                    orientation="horizontal"
                    type="single"
                    flexDirection="row"
                    onValueChange={(value: "otp" | "password") => {
                        setLoginType(value);
                    }}
                    value={loginType}
                    marginBottom={"$5"}
                >
                    <ToggleGroup.Item value="otp" flex={1}>
                        <Text>OTP</Text>
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value="password" flex={1}>
                        <Text>Password</Text>
                    </ToggleGroup.Item>
                </ToggleGroup>
                {loginType === "password" && (
                    <>
                        <Input
                            placeholder="Username"
                            keyboardType="default"
                            value={UserDetails.username}
                            onChangeText={(text) => {
                                dispatch(setUsername(text));
                            }}
                            autoComplete="username-new"
                            marginBottom={"$3"}
                        />
                        <Input
                            placeholder="Password"
                            keyboardType="default"
                            value={UserDetails.password}
                            onChangeText={(text) => {
                                dispatch(setPassword(text));
                            }}
                            autoComplete="password"
                            secureTextEntry={secureTextEntry}
                        />
                    </>
                )}
                {loginType === "otp" && (
                    <>
                        <PhoneInput
                            country={country}
                            handleCountryChange={handleCountryChange}
                            mobile={mobile}
                            setMobile={setMobile}
                            countryList={countryList}
                            dispatch={dispatch}
                            userPhoneInput={true}
                        />
                        {loginOtpRequestType ===
                            LoginPhoneOTPRequestType.VERIFY && (
                            <OTPVerification
                                fieldLength={6}
                                heading={"Login Verification"}
                                subHeading={`Enter the Verification Code Sent to your Phone ${UserDetails.phone}`}
                                sheetOpen={
                                    loginOtpRequestType ===
                                    LoginPhoneOTPRequestType.VERIFY
                                }
                                dispatch={dispatch}
                                handleSubmit={handleSubmit}
                            />
                        )}
                    </>
                )}
                <View flex={1} justifyContent="flex-end">
                    <Button onPress={handleSubmit}>Proceed</Button>
                </View>
            </View>
        </ScrollView>
    );
}

export default LoginScreen;
