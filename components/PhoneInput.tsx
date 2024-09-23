import { Adapt, Input, Label, Select, Sheet, XStack } from "tamagui";
import { Country } from "../models/Country";
import { Check, ChevronDown } from "@tamagui/lucide-icons";
import { setUserPhoneGlobal } from "../features/GlobalActions";
import { Dispatch } from "@reduxjs/toolkit";

export type PhoneInputProps = {
    country: Country | undefined;
    handleCountryChange: (country: string) => void;
    mobile: string,
    setMobile: (mobile: string) => void;
    countryList: Country[],
    userPhoneInput: boolean,
    dispatch: Dispatch
};

export const PhoneInput = ({country, handleCountryChange, mobile, setMobile, countryList, userPhoneInput, dispatch}: PhoneInputProps) => {
    // Redux
    return (
        <>
            <Select
                value={country === undefined ? "" : country.name}
                onValueChange={handleCountryChange}
            >
                <Select.Trigger iconAfter={ChevronDown} color={"$color"}>
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
                            {countryList.map((item, index: number) => {
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
                                            <Check size={"$1"} />
                                        </Select.ItemIndicator>
                                    </Select.Item>
                                );
                            })}
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
                        if (userPhoneInput) {
                            dispatch(setUserPhoneGlobal(country === undefined ? mobile : country.extension! + "-" + mobile));
                        }
                    }}
                    autoComplete="tel"
                    flex={1}
                />
            </XStack>
        </>
    );
};
