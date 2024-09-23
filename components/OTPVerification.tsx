import { Dispatch } from "@reduxjs/toolkit";
import { OtpInput } from "react-native-otp-entry";
import { Button, Heading, Sheet, View } from "tamagui";
import { setOtpGlobal } from "../features/GlobalActions";

export type OTPVerificationProps = {
    fieldLength: number;
    heading: string;
    subHeading: string;
    sheetOpen: boolean;
    dispatch: Dispatch<any>;
    handleSubmit: () => void;
};

export const OTPVerification = ({
    fieldLength,
    heading,
    subHeading,
    sheetOpen,
    dispatch,
    handleSubmit,
}: OTPVerificationProps) => {
    return (
        <Sheet
            forceRemoveScrollEnabled={sheetOpen}
            modal={true}
            open={sheetOpen}
            onOpenChange={() => {
                console.log("Sheet Closed");
            }}
            snapPoints={[80]}
            animationConfig={{
                type: "spring",
                damping: 200,
                mass: 1.2,
                stiffness: 250,
            }}
        >
            <Sheet.Overlay
                animation="lazy"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
            />
            <Sheet.Handle />
            <Sheet.Frame>
                <Heading size={"$8"} margin={"$5"}>
                    {heading}
                </Heading>
                <Heading size={"$2"} marginRight={"$5"} marginLeft={"$5"}>
                    {subHeading}
                </Heading>
                <View
                    marginLeft={"$5"}
                    marginRight={"$5"}
                    marginTop={"$10"}
                    flex={1}
                >
                    <OtpInput
                        numberOfDigits={fieldLength}
                        onTextChange={(text) => {
                            dispatch(setOtpGlobal(text));
                        }}
                        textInputProps={{
                            keyboardType: "name-phone-pad",
                            autoComplete: "one-time-code",
                            autoCapitalize: "characters",
                        }}
                        type="alphanumeric"
                        theme={{
                            pinCodeTextStyle: {
                                color: "white",
                            },
                        }}
                        blurOnFilled
                        onFilled={(text) => {
                            dispatch(setOtpGlobal(text));
                        }}
                    />
                </View>
                <View margin={"$5"} justifyContent="flex-end" flex={1}>
                    <Button marginTop={"$3"} onPress={handleSubmit}>
                        Submit
                    </Button>
                </View>
            </Sheet.Frame>
        </Sheet>
    );
};
