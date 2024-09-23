import { StyleSheet, View } from "react-native";
import { Spinner } from "tamagui";

type AppLoaderProps = {
    color?: string;
};
export const AppLoader = ({ color }: AppLoaderProps) => {
    return (
        <View pointerEvents="none" style={styles.container}>
            {/* <Spinner size="large" /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(52, 52, 52, 0.8)",
        paddingVertical: 20,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});
