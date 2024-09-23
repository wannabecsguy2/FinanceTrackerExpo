import { useEffect, useState } from "react";
import { Check, ChevronDown } from "@tamagui/lucide-icons";
import {
    Adapt,
    Button,
    Heading,
    Input,
    Label,
    ScrollView,
    Select,
    Sheet,
    Spinner,
    View,
    XStack,
    YStack,
} from "tamagui";
import { AuthController, CountryController } from "../utils/AxiosInstance";
import { AxiosError, AxiosResponse } from "axios";
import { GenericResponseObject } from "../payloads/GenericResponseObject";
import { Country } from "../models/Country";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";
import { setCountries } from "../features/slices/CountryListSlice";
import {
    setDefaultCountryId,
    setPassword,
    setPhone,
    setRegistrationStep,
    setUsername,
} from "../features/slices/RegistrationSlice";
import { RegistrationStep } from "../models/RegistrationStep";
import { useToastController } from "@tamagui/toast";
import { CustomToast } from "../components/CustomToast";
import { OTPVerification } from "../components/OTPVerification";

function RegisterScreen() {
    // Hooks
    const dispatch = useDispatch();
    const toast = useToastController();

    // Selectors
    const countryList = useSelector(
        (state: RootState) => state.CountryListSlice.countries
    );
    const registrationRequest = useSelector(
        (state: RootState) => state.RegistrationSlice
    );

    // useEffects
    useEffect(() => {
        setIsLoading(true);

        // Fetch countries for Extension Select
        CountryController.fetchAll()
            .then(
                (response: AxiosResponse<GenericResponseObject<Country[]>>) => {
                    dispatch(setCountries(response.data.data!));
                }
            )
            .catch((e) => {
                console.error(e);
                toast.show("Error fetching countries", {
                    type: "error",
                    message: "Error fetching countries",
                    duration: 5000,
                    placement: "bottom",
                    dismissOnSwipe: true,
                });
            });

        // Set default registration step
        // FIXME: Testing Purposes, change to RegistrationStep.PHONE_REGISTERED
        dispatch(setRegistrationStep(RegistrationStep.PHONE_REGISTERED));
        setIsLoading(false);
    }, []);

    // States
    const [country, setCountry] = useState<Country>(countryList[0]);
    const [mobile, setMobile] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true);
    const [sheetOpen, setSheetOpen] = useState<boolean>(true);

    // Handlers
    const handleCountryChange = (value: string) => {
        countryList.forEach((country) => {
            if (country.id!.toString() === value) {
                setCountry(country);
                dispatch(setDefaultCountryId(country.id!));
            }
        });
    };

    const handleValidation = () => {
        if (
            registrationRequest.registrationStep ===
            RegistrationStep.PHONE_REGISTERED
        ) {
        }
        return true;
    };

    const handleSubmit = () => {
        setIsLoading(true);

        if (!handleValidation()) {
            setIsLoading(false);
            return;
        }

        switch (registrationRequest.registrationStep) {
            case RegistrationStep.PHONE_REGISTERED: {
                dispatch(setPhone(country.extension! + "-" + mobile));

                // API
                AuthController.register(registrationRequest)
                    .then(
                        (
                            response: AxiosResponse<GenericResponseObject<any>>
                        ) => {
                            if (response.data.success) {
                                dispatch(
                                    setRegistrationStep(
                                        RegistrationStep.PHONE_VERIFIED
                                    )
                                );
                            }
                        }
                    )
                    .catch((e: AxiosError<GenericResponseObject<any>>) => {
                        console.error(e.response?.data.errorCode);
                        toast.show("Error Registering", {
                            type: "error",
                            message: "Error Registering",
                            placement: "bottom",
                            dismissOnSwipe: true,
                            native: true,
                        });
                    });

                break;
            }
            case RegistrationStep.PHONE_VERIFIED: {
                console.log(registrationRequest.otp);
                AuthController.register(registrationRequest)
                    .then(
                        (
                            response: AxiosResponse<GenericResponseObject<any>>
                        ) => {
                            if (response.data.success) {
                                dispatch(
                                    setRegistrationStep(
                                        RegistrationStep.USER_DETAILS_RECEIVED
                                    )
                                );
                            }
                        }
                    )
                    .catch((e: AxiosError<GenericResponseObject<any>>) => {
                        console.error(e.response?.data.errorCode);
                        toast.show("Error Registering", {
                            type: "error",
                            message: "Error Registering",
                            placement: "bottom",
                            dismissOnSwipe: true,
                            native: true,
                        });
                    });
                break;
            }
            case RegistrationStep.USER_DETAILS_RECEIVED: {
                AuthController.register(registrationRequest).then(
                    (response: AxiosResponse<GenericResponseObject<any>>) => {
                        if (response.data.success) {
                            dispatch(
                                setRegistrationStep(
                                    RegistrationStep.USER_VERIFIED
                                )
                            );
                            // TODO: Set States for the User and Auth State and Save Tokens
                        }
                    }
                );
                break;
            }
            default:
                break;
        }

        setIsLoading(false);
    };

    return (
        <ScrollView
            backgroundColor={"$background"}
            fullscreen
            contentContainerStyle={{ flex: 1 }}
        >
            {registrationRequest.registrationStep ===
                RegistrationStep.PHONE_REGISTERED && (
                <>
                    <Heading size={"$8"} margin={"$5"}>
                        Register
                    </Heading>
                    <YStack margin={"$5"}>
                        <Select
                            value={country === undefined ? "" : country.name}
                            onValueChange={handleCountryChange}
                        >
                            <Select.Trigger
                                iconAfter={ChevronDown}
                                color={"$color"}
                            >
                                <Select.Value placeholder="Countries" />
                            </Select.Trigger>

                            <Adapt when="sm" platform="touch">
                                <Sheet
                                    modal
                                    dismissOnSnapToBottom
                                    animationConfig={{
                                        type: "spring",
                                        damping: 200,
                                        mass: 1.2,
                                        stiffness: 250,
                                    }}
                                >
                                    <Sheet.Frame>
                                        <Sheet.ScrollView>
                                            <Adapt.Contents />
                                        </Sheet.ScrollView>
                                    </Sheet.Frame>
                                    <Sheet.Overlay
                                        animation="lazy"
                                        enterStyle={{ opacity: 0 }}
                                        exitStyle={{ opacity: 0 }}
                                    />
                                </Sheet>
                            </Adapt>

                            <Select.Content zIndex={200000}>
                                <Select.Viewport>
                                    <Select.Group>
                                        <Select.Label>Country</Select.Label>
                                        {countryList.map(
                                            (item, index: number) => {
                                                return (
                                                    <Select.Item
                                                        index={index}
                                                        key={index}
                                                        value={item.id!.toString()}
                                                    >
                                                        <Select.ItemText>
                                                            {item.name!}
                                                        </Select.ItemText>

                                                        <Select.ItemIndicator marginLeft="auto">
                                                            <Check
                                                                size={"$1"}
                                                            />
                                                        </Select.ItemIndicator>
                                                    </Select.Item>
                                                );
                                            }
                                        )}
                                    </Select.Group>
                                </Select.Viewport>
                            </Select.Content>
                        </Select>
                        <XStack alignItems={"center"} marginTop={"$3"}>
                            {country && (
                                <Label htmlFor={"phone"} marginRight={"$2"}>
                                    {country.extension}-
                                </Label>
                            )}
                            <Input
                                placeholder="Phone"
                                keyboardType="phone-pad"
                                value={mobile}
                                onChangeText={(text) => {
                                    setMobile(text);
                                    dispatch(setPhone(country.extension! + "-" + mobile));
                                }}
                                autoComplete="tel"
                                flex={1}
                            />
                        </XStack>
                    </YStack>
                </>
            )}
            {registrationRequest.registrationStep ===
                RegistrationStep.PHONE_VERIFIED && (
                <>
                    <OTPVerification
                        fieldLength={6}
                        heading={"Phone Verification"}
                        subHeading={`Enter the Verification Code Sent to your Phone ${registrationRequest.phone}`}
                        sheetOpen={sheetOpen}
                        dispatch={dispatch}
                        handleSubmit={handleSubmit}
                    />
                </>
            )}
            {registrationRequest.registrationStep ===
                RegistrationStep.USER_DETAILS_RECEIVED && (
                <View margin={"$5"}>
                    <Heading size={"$8"} marginBottom={"$2"}>
                        Final Step!
                    </Heading>
                    <Heading size={"$2"} marginBottom={"$5"}>
                        Username & Password
                    </Heading>
                    <Input
                        placeholder="Username"
                        keyboardType="default"
                        value={registrationRequest.username}
                        onChangeText={(text) => {
                            dispatch(setUsername(text));
                        }}
                        autoComplete="username-new"
                        marginBottom={"$2"}
                    />
                    <Input
                        placeholder="Password"
                        keyboardType="default"
                        value={registrationRequest.password}
                        onChangeText={(text) => {
                            dispatch(setPassword(text));
                        }}
                        autoComplete="password"
                        secureTextEntry={secureTextEntry}
                    />
                </View>
            )}
            {registrationRequest.registrationStep !=
                RegistrationStep.PHONE_VERIFIED && (
                <View margin={"$5"} justifyContent="flex-end" flex={1}>
                    <Button marginTop={"$3"} onPress={handleSubmit}>
                        {registrationRequest.registrationStep ===
                        RegistrationStep.PHONE_REGISTERED
                            ? "Register"
                            : "Let's Go!"}
                    </Button>
                </View>
            )}
            {isLoading && <Spinner color={"$accentColor"} size="large" />}
            <CustomToast />
        </ScrollView>
    );
}

export default RegisterScreen;
