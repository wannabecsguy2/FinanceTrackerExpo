import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "react-query";
import RegisterScreen from "./screens/Register";
import { useFonts } from "expo-font";
import store from "./features/store";
import { Provider } from "react-redux";
import { useState } from "react";
import { AppLoader } from "./components/AppLoader";
import "./gesture-handler";
import { H6, Heading, Label, TamaguiProvider, Text } from "tamagui";
import config from "./tamagui.config";
import { ToastProvider } from "@tamagui/toast";
import LoginScreen from "./screens/Login";
import CounterPartyScreen from "./screens/CounterParty";
import { Icon, MD3DarkTheme, PaperProvider } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TransactionScreen from "./screens/Transaction";
import ProfileScreen from "./screens/Profile";
import {
    ArrowRightLeft,
    CircleUser,
    CircleUserRound,
    User,
    UserRoundSearch,
    UserSearch,
} from "@tamagui/lucide-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const AuthenticatedTabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveBackgroundColor: "black",
                tabBarInactiveBackgroundColor: "black",
                headerShown: false,
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                tabBarStyle: {
                    borderTopWidth: 0
                }
            })}
        >
            <Tab.Screen
                name="Transactions"
                component={TransactionScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => <ArrowRightLeft color={color} />,
                }}
            />
            <Tab.Screen
                name="CounterParty"
                component={CounterPartyScreen}
                options={{
                    tabBarIcon: ({focused, color, size}) => <UserSearch color={color} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ tabBarIcon: ({focused, color, size}) => <CircleUserRound color={color} /> }}
            />
        </Tab.Navigator>
    );
};

const UnauthenticatedTabScreens = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Register" component={RegisterScreen} />
        </Tab.Navigator>
    );
};
export default function App() {
    const [loadedFonts, error] = useFonts({
        Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    });

    // States
    const [isLoading, setIsLoading] = useState(false);

    if (!loadedFonts) {
        return <AppLoader />;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <PaperProvider theme={MD3DarkTheme}>
                <TamaguiProvider config={config} defaultTheme="dark">
                    <Provider store={store}>
                        <ToastProvider>
                            <StatusBar
                                animated={true}
                                barStyle="light-content"
                            />
                            <NavigationContainer>
                                <Stack.Navigator
                                    screenOptions={{ headerShown: false }}
                                >
                                    <Stack.Screen
                                        name="AuthenticatedTabScreens"
                                        component={AuthenticatedTabScreens}
                                    />
                                    <Stack.Screen
                                        name="UnauthenticatedTabScreens"
                                        component={UnauthenticatedTabScreens}
                                    />
                                </Stack.Navigator>
                            </NavigationContainer>
                        </ToastProvider>
                    </Provider>
                </TamaguiProvider>
            </PaperProvider>
        </QueryClientProvider>
    );
}

// TODO: Default Values for All Select
// TODO: Dark Mode for Date Picker
// TODO: Global Error Handling
// TODO: Add TanStack Query
// TODO: Add Loaders to relevant components
// TODO: Delete Transaction
// TODO: Authenticated Navigation
// TODO: Overview Screen with Graphs (Pie Chart of Tag Wise Data, Bar/Line Chart for All Transactions, Global Filters (Currency, Range etc))
// TODO: Transaction Search: By Keyword and By filter (Modal type setting)
// TODO: Option to Add Counter Party
// TODO: Improve edit and Add Card Forms
// TODO: Add Transaction By CounterParty Card
