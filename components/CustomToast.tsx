import { Toast, useToastState } from "@tamagui/toast";
import { YStack } from "tamagui";

export const CustomToast = () => {
    const currentToast = useToastState();

    return (
        <Toast
            duration={currentToast?.duration}
            viewportName={currentToast?.viewportName}
            opacity={1}
            backgroundColor={currentToast?.type === "success" ? "green" : "red"}
        >
            <YStack>
                <Toast.Title>{currentToast?.title}</Toast.Title>
                {!!currentToast?.message && (
                    <Toast.Description>
                        {currentToast?.message}
                    </Toast.Description>
                )}
            </YStack>
        </Toast>
    );
};
