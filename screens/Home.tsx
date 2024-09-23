import { useNavigation } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

function HomeScreen() {
    // Hooks
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigation = useNavigation<any>();

    // Styles
    const containerStyle = {
        backgroundColor: theme.colors.background,
        flex: 1,
    };
    return (
        <SafeAreaView style={[containerStyle]}>
            <ScrollView
                style={{ margin: 10 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;