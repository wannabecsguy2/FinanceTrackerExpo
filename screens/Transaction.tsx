import {
    Filter,
    Plus,
} from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
    Button,
    Card,
    Heading,
    Input,
    Label,
    ScrollView,
    View,
    XStack,
} from "tamagui";
import { TransactionController } from "../utils/AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../features/store";
import * as SecureStore from "../utils/SecureStore";
import { AxiosError, AxiosResponse } from "axios";
import { GenericResponseObject } from "../payloads/GenericResponseObject";
import { Transaction } from "../models/Transaction";
import { PageableResponse } from "../payloads/PageableResponse";
import { TransactionDirection } from "../models/TransactionDirection";
import { NativeScrollEvent, RefreshControl } from "react-native";
import { Text } from "tamagui";
import { useIsFocused } from "@react-navigation/native";
import {
    setTransaction,
} from "../features/slices/TransactionSlice";
import { UpdateTransactionRequest } from "../payloads/UpdateTransactionRequest";
import TransactionDetailsSheet from "../components/TransactionDetailsSheet";
import { AddTransactionRequest } from "../payloads/AddTransactionRequest";
import { decode } from "../utils/JWT";
import { setSortBy } from "../features/slices/TransactionSearchFilterSlice";

function TransactionScreen() {
    // Constants
    const INITIAL_PAGE_NUMBER = 0;
    const DEFAULT_PAGE_SIZE = 10;

    // Functions
    const isCloseToBottom = ({
        layoutMeasurement,
        contentOffset,
        contentSize,
    }: NativeScrollEvent) => {
        const paddingToBottom = 20;
        return (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
        );
    };

    // Hooks
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    // Redux
    const transactionSearchFilterSlice = useSelector(
        (root: RootState) => root.TransactionSearchFilterSlice
    );
    const userSlice = useSelector((root: RootState) => root.UserSlice);
    const transaction = useSelector((root: RootState) => root.TransactionSlice);

    // States
    const [pageNumber, setPageNumber] = useState<number>(INITIAL_PAGE_NUMBER);
    const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [detailsSheetOpen, setDetailsSheetOpen] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [showDateTimePicker, setShowDateTimePicker] =
        useState<boolean>(false);
    const [transactionList, setTransactionList] = useState<Transaction[]>([]);
    const [createMode, setCreateMode] = useState<boolean>(false);

    // useEffects
    useEffect(() => {
        dispatch(setSortBy("date"))
    }, [])
    useEffect(() => {
        handleRefresh();
    }, [isFocused, detailsSheetOpen]); // TODO: Find a better way to handle this

    // Handlers
    const handleRefresh = () => {
        setRefresh(true);
        setPageNumber(INITIAL_PAGE_NUMBER);
        setPageSize(DEFAULT_PAGE_SIZE);
        SecureStore.getItem("token").then((token) => {
            TransactionController.fetch(
                transactionSearchFilterSlice,
                token!,
                pageNumber,
                pageSize
            )
                .then(
                    (
                        response: AxiosResponse<
                            GenericResponseObject<PageableResponse<Transaction>>
                        >
                    ) => {
                        setTransactionList(response.data.data?.content!);
                    }
                )
                .catch((e: AxiosError) => {
                    console.error(e.toJSON());
                });
        });
        setRefresh(false);
    };

    const handleEditSave = () => {
        SecureStore.getItem("token").then((token) => {
            TransactionController.update(
                {
                    id: transaction.id,
                    counterPartyId: transaction.counterParty?.id,
                    tagId: transaction.tag?.id,
                    methodId: transaction.method?.id,
                    amount: transaction.amount,
                    direction: transaction.direction,
                    currencyId: transaction.currency?.id,
                    date: transaction.date,
                    note: transaction.note,
                } as UpdateTransactionRequest,
                token!
            )
                .then(
                    (
                        response: AxiosResponse<
                            GenericResponseObject<Transaction>
                        >
                    ) => {
                        setDetailsSheetOpen(false);
                        setEditMode(false);
                        dispatch(setTransaction({} as Transaction));
                    }
                )
                .catch((e: AxiosError) => {
                    console.error(e.toJSON());
                });
        });
    };

    const handleSaveCreate = () => {
        SecureStore.getItem("token").then((token) => {
            const jwtPayload = decode(token!);
            TransactionController.add(
                {   createdBy: jwtPayload.id,
                    counterPartyId: transaction.counterParty?.id,
                    tagId: transaction.tag?.id,
                    methodId: transaction.method?.id,
                    amount: transaction.amount,
                    direction: transaction.direction,
                    currencyId: transaction.currency?.id,
                    date: transaction.date,
                    note: transaction.note,
                } as AddTransactionRequest,
                token!
            )
                .then(
                    (
                        response: AxiosResponse<
                            GenericResponseObject<Transaction>
                        >
                    ) => {
                        setDetailsSheetOpen(false);
                        setEditMode(false);
                        dispatch(setTransaction({} as Transaction));
                    }
                )
                .catch((e: AxiosError) => {
                    console.error(e.toJSON());
                });
        });
    };

    const handleCreate = () => {
        setCreateMode(true);
        setEditMode(true);
        dispatch(
            setTransaction({ date: new Date().toISOString() } as Transaction)
        );
        setDetailsSheetOpen(true);
    };
    return (
        <GestureHandlerRootView>
            <Button
                icon={<Plus size={"$2"} />}
                position="absolute"
                bottom={"$5"}
                right={"$5"}
                scale={1.3}
                zIndex={"$5"}
                borderRadius={"$12"}
                height={"$5"}
                width={"$5"}
                onPress={handleCreate}
            />
            <ScrollView
                backgroundColor={"$background"}
                fullscreen
                contentContainerStyle={{ flex: 1 }}
            >
                <View margin={"$5"}>
                    <Label htmlFor="search" marginBottom={"$1"}>
                        Transactions
                    </Label>
                    <XStack>
                        <Input
                            flex={1}
                            marginRight={"$2"}
                            placeholder="Counter Party, Method, etc."
                            inputMode="text"
                        />
                        <Button icon={Filter} />
                    </XStack>
                </View>
                <ScrollView
                    marginRight={"$3"}
                    marginLeft={"$3"}
                    flex={1}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={handleRefresh}
                        />
                    }
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            console.log("Is Close to bottom");
                        }
                    }}
                    scrollEventThrottle={50}
                >
                    {transactionList.map((eachTransaction) => {
                        return (
                            <Card
                                key={eachTransaction.id}
                                marginBottom={"$3"}
                                onPress={() => {
                                    dispatch(setTransaction(eachTransaction));
                                    setDetailsSheetOpen(true);
                                    console.log("click");
                                }}
                            >
                                <Card.Header
                                    flexDirection="row"
                                    justifyContent="space-between"
                                >
                                    <Heading size={"$3"} marginRight={"$2"}>
                                        {eachTransaction.counterParty?.name!}
                                    </Heading>

                                    <Heading size={"$5"}>
                                        {eachTransaction.method?.name}
                                    </Heading>
                                </Card.Header>
                                <Card.Footer
                                    flexDirection="row"
                                    padding={"$4"}
                                    justifyContent="space-between"
                                >
                                    <View flex={1} flexDirection="row">
                                        <Text>{eachTransaction.tag?.name}</Text>
                                    </View>
                                    <View
                                        flex={1}
                                        flexDirection="row"
                                        justifyContent="flex-start"
                                    >
                                        <Heading
                                            color={
                                                eachTransaction.direction ===
                                                TransactionDirection.CREDIT
                                                    ? "$green10"
                                                    : "$red10"
                                            }
                                            size={"$3"}
                                        >
                                            {eachTransaction.direction ===
                                            TransactionDirection.CREDIT
                                                ? "+"
                                                : "-"}
                                            {eachTransaction.currency?.code! +
                                                " " +
                                                eachTransaction.amount!}
                                        </Heading>
                                    </View>
                                    <Text>
                                        {new Date(
                                            eachTransaction.date?.split("T")[0]!
                                        ).toDateString()}
                                    </Text>
                                </Card.Footer>
                            </Card>
                        );
                    })}
                </ScrollView>
                <TransactionDetailsSheet
                    editMode={editMode}
                    createMode={createMode}
                    setCreateMode={setCreateMode}
                    setEditMode={setEditMode}
                    setDetailsSheetOpen={setDetailsSheetOpen}
                    detailsSheetOpen={detailsSheetOpen}
                    handleSaveCreate={handleSaveCreate}
                    handleSaveEdit={handleEditSave}
                    showButtons={true}
                />
            </ScrollView>
        </GestureHandlerRootView>
    );
}
export default TransactionScreen;
