import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ScrollView } from "tamagui";

function ProfileScreen() {
    return (
        <GestureHandlerRootView>
            <ScrollView
                backgroundColor={"$background"}
                fullscreen
                contentContainerStyle={{ flex: 1 }}
            >

            </ScrollView>
        </GestureHandlerRootView>
    )
}

export default ProfileScreen;