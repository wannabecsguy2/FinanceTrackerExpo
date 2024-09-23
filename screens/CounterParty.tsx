import { useEffect, useState } from "react";
import {
    Button,
    Card,
    Heading,
    Input,
    ListItem,
    ScrollView,
    Sheet,
    Text,
    View,
    YGroup,
} from "tamagui";
import * as SecureStore from "../utils/SecureStore";
import { CounterParty } from "../models/CounterParty";
import {
    CounterPartyController,
    TransactionController,
} from "../utils/AxiosInstance";
import { GenericResponseObject } from "../payloads/GenericResponseObject";
import { AxiosError, AxiosResponse } from "axios";
import {
    Ban,
    ChevronRight,
    Edit3,
    FilePlus,
    Plus,
    Save,
} from "@tamagui/lucide-icons";
import { Label } from "tamagui";
import {
    GestureHandlerRootView,
    Swipeable,
} from "react-native-gesture-handler";
import { DataTable, IconButton, Tooltip } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../features/store";
import {
    setCounterParty,
    setEmail,
    setId,
    setName,
    setPhone,
} from "../features/slices/CounterPartySlice";
import { Transaction } from "../models/Transaction";
import { setCounterPartyTransactions } from "../features/slices/CounterPartyTransactionListSlice";
import { PageableResponse } from "../payloads/PageableResponse";
import { TransactionDirection } from "../models/TransactionDirection";
import { RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import TransactionDetailsSheet from "../components/TransactionDetailsSheet";
import { setTransaction } from "../features/slices/TransactionSlice";
import CounterPartyDetailsCard from "../components/CounterPartyDetailsCard";

function CounterPartyScreen() {
    // Hooks
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    // States
    const [counterPartyList, setCounterPartyList] = useState<CounterParty[]>(
        []
    );

    const [detailsSheetOpen, setDetailsSheetOpen] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [refershing, setRefreshing] = useState<boolean>(false);

    const [transactionDetailsSheetOpen, setTransactionDetailsSheetOpen] =
        useState<boolean>(false);

    // Constants
    const numberOfItemsPerPageList = [1, 5, 10];

    // Redux
    const counterParty = useSelector(
        (state: RootState) => state.CounterPartySlice
    );
    const transaction = useSelector(
        (state: RootState) => state.TransactionSlice
    );
    const CounterPartyTransactions = useSelector(
        (state: RootState) =>
            state.CounteryPartyTransactionListSlice.transactions
    );
    const from = page * pageSize;
    const to = Math.min(from + pageSize, totalElements);

    // useEffects
    useEffect(() => {
        handleRefresh();
    }, [isFocused]);

    useEffect(() => {
        SecureStore.getItem("token")
            .then((token) => {
                TransactionController.fetch(
                    { counterPartyIds: [counterParty.id!] },
                    token!,
                    page,
                    pageSize
                ).then(
                    (
                        response: AxiosResponse<
                            GenericResponseObject<PageableResponse<Transaction>>
                        >
                    ) => {
                        dispatch(
                            setCounterPartyTransactions(
                                response.data.data?.content!
                            )
                        );
                        setPage(response.data.data?.pageable?.pageNumber!);
                        setPageSize(response.data.data?.pageable?.pageSize!);
                        setTotalPages(response.data.data?.totalPages!);
                        setTotalElements(response.data.data?.totalElements!);
                    }
                );
            })
            .catch((e: AxiosError) => {
                console.error(e.toJSON());
            });
    }, [detailsSheetOpen, page, pageSize]);

    // Handlers
    const handleRefresh = () => {
        setRefreshing(true);
        SecureStore.getItem("token").then((token) => {
            CounterPartyController.fetchAll(token!)
                .then(
                    (
                        response: AxiosResponse<
                            GenericResponseObject<CounterParty[]>
                        >
                    ) => {
                        console.log(response.data.data);
                        setCounterPartyList(response.data.data!);
                    }
                )
                .catch((error) => {
                    console.log(error);
                });
        });
        setRefreshing(false);
    };

    const handleSaveEdit = () => {
        SecureStore.getItem("token")
            .then((token) => {
                CounterPartyController.update(counterParty, token!)
                    .then(
                        (
                            response: AxiosResponse<GenericResponseObject<any>>
                        ) => {
                            console.log(response);
                        }
                    )
                    .catch((e) => {
                        console.error(e);
                    });
            })
            .catch((e) => {
                console.error(e);
            });
        handleRefresh();
        setEditMode(false);
    };

    return (
        <GestureHandlerRootView>
            <ScrollView
                backgroundColor={"$background"}
                fullscreen
                contentContainerStyle={{ flex: 1 }}
            >
                <View margin={"$5"} flex={1}>
                    <Input placeholder="Search People" />
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refershing}
                                onRefresh={() => {
                                    console.log("Refreshing");
                                    handleRefresh();
                                }}
                            />
                        }
                    >
                        <View flex={1} marginTop={"$5"}>
                            <YGroup>
                                {counterPartyList != undefined &&
                                    counterPartyList.map((eachCounterParty) => {
                                        return (
                                            <Swipeable
                                                key={eachCounterParty.id}
                                                renderRightActions={() => (
                                                    <View
                                                        width={"$5"}
                                                        justifyContent="center"
                                                        alignItems={"flex-end"}
                                                    >
                                                        <IconButton
                                                            icon="delete"
                                                            size={20}
                                                            iconColor="red"
                                                        />
                                                    </View>
                                                )}
                                            >
                                                <YGroup.Item
                                                    key={eachCounterParty.id}
                                                >
                                                    <ListItem
                                                        borderWidth={1}
                                                        marginTop={"$2"}
                                                        marginBottom={"$2"}
                                                        borderRadius={"$2"}
                                                        hoverTheme
                                                        pressTheme
                                                        bordered
                                                        title={
                                                            eachCounterParty.name
                                                        }
                                                        subTitle={
                                                            eachCounterParty.type
                                                        }
                                                        key={
                                                            eachCounterParty.id
                                                        }
                                                        iconAfter={ChevronRight}
                                                        onPress={() => {
                                                            dispatch(
                                                                setCounterParty(
                                                                    eachCounterParty
                                                                )
                                                            );
                                                            dispatch(
                                                                setId(
                                                                    eachCounterParty.id!
                                                                )
                                                            );
                                                            setDetailsSheetOpen(
                                                                true
                                                            );
                                                        }}
                                                    />
                                                </YGroup.Item>
                                            </Swipeable>
                                        );
                                    })}
                            </YGroup>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
            <View flexDirection="row" justifyContent="flex-end">
                <Button
                    icon={Plus}
                    position="absolute"
                    margin={"$4"}
                    right={0}
                    bottom={0}
                    height={"$5"}
                    borderRadius={"$4.5"}
                />
            </View>
            {counterParty != undefined && (
                <Sheet
                    forceRemoveScrollEnabled={true}
                    modal={true}
                    open={detailsSheetOpen}
                    onOpenChange={() => {
                        setDetailsSheetOpen(!detailsSheetOpen);
                        setEditMode(false);
                    }}
                    snapPoints={[80, 30]}
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
                        <CounterPartyDetailsCard
                            editMode={editMode}
                            setEditMode={setEditMode}
                            allowEdit={true}
                            detailsSheetOpen={detailsSheetOpen}
                            setDetailsSheetOpen={setDetailsSheetOpen}
                            handleSaveEdit={handleSaveEdit}
                            store={store}
                        />
                        <View flex={1}>
                            <Card margin={"$5"} bordered>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>ID</DataTable.Title>
                                        <DataTable.Title>
                                            AMOUNT
                                        </DataTable.Title>
                                        <DataTable.Title>
                                            CATEGORY
                                        </DataTable.Title>
                                        <DataTable.Title>
                                            METHOD
                                        </DataTable.Title>
                                        <DataTable.Title>
                                            CURRENCY
                                        </DataTable.Title>
                                    </DataTable.Header>
                                    {CounterPartyTransactions != undefined &&
                                        CounterPartyTransactions.map(
                                            (eachTransaction: Transaction) => {
                                                return (
                                                    <DataTable.Row
                                                        key={eachTransaction.id}
                                                        onPress={() => {
                                                            dispatch(
                                                                setTransaction(
                                                                    eachTransaction
                                                                )
                                                            );
                                                            setTransactionDetailsSheetOpen(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        <DataTable.Cell
                                                            style={{
                                                                flex: 1,
                                                                justifyContent:
                                                                    "flex-start",
                                                            }}
                                                        >
                                                            <Tooltip
                                                                title={
                                                                    eachTransaction.id!
                                                                }
                                                            >
                                                                <IconButton
                                                                    icon="information-outline"
                                                                    selected
                                                                    size={20}
                                                                    iconColor="white"
                                                                />
                                                            </Tooltip>
                                                        </DataTable.Cell>
                                                        <DataTable.Cell
                                                            style={{
                                                                flex: 1,
                                                                justifyContent:
                                                                    "flex-start",
                                                            }}
                                                            textStyle={{
                                                                color:
                                                                    eachTransaction.direction ===
                                                                    TransactionDirection.CREDIT
                                                                        ? "green"
                                                                        : "red",
                                                            }}
                                                        >
                                                            {(eachTransaction.direction ===
                                                            TransactionDirection.CREDIT
                                                                ? "+"
                                                                : "-") +
                                                                eachTransaction.amount}
                                                        </DataTable.Cell>
                                                        <DataTable.Cell>
                                                            {
                                                                eachTransaction.tag!
                                                                    .name!
                                                            }
                                                        </DataTable.Cell>
                                                        <DataTable.Cell>
                                                            {eachTransaction.method! !=
                                                                undefined &&
                                                            eachTransaction
                                                                .method.icon !=
                                                                undefined ? (
                                                                <Tooltip
                                                                    title={
                                                                        eachTransaction
                                                                            .method
                                                                            .code!
                                                                    }
                                                                >
                                                                    <IconButton
                                                                        icon={
                                                                            eachTransaction
                                                                                .method
                                                                                .icon
                                                                        }
                                                                        selected
                                                                        size={
                                                                            20
                                                                        }
                                                                        iconColor="white"
                                                                        onPress={() => {}}
                                                                    />
                                                                </Tooltip>
                                                            ) : (
                                                                <>
                                                                    <Text>
                                                                        {
                                                                            eachTransaction
                                                                                .method
                                                                                ?.code
                                                                        }
                                                                    </Text>
                                                                </>
                                                            )}
                                                        </DataTable.Cell>
                                                        <DataTable.Cell>
                                                            {
                                                                eachTransaction
                                                                    .currency
                                                                    ?.code
                                                            }
                                                        </DataTable.Cell>
                                                    </DataTable.Row>
                                                );
                                            }
                                        )}
                                    <DataTable.Pagination
                                        page={page}
                                        numberOfPages={totalPages}
                                        label={`${
                                            from + 1
                                        }-${to} of ${totalElements}`}
                                        onPageChange={(page) => setPage(page)}
                                        numberOfItemsPerPageList={
                                            numberOfItemsPerPageList
                                        }
                                        numberOfItemsPerPage={pageSize}
                                        onItemsPerPageChange={setPageSize}
                                        showFastPaginationControls
                                        selectPageDropdownLabel={
                                            "Rows per page"
                                        }
                                    />
                                </DataTable>
                            </Card>
                        </View>
                    </Sheet.Frame>
                </Sheet>
            )}
            {transaction != undefined && (
                <TransactionDetailsSheet
                    detailsSheetOpen={transactionDetailsSheetOpen}
                    setDetailsSheetOpen={setTransactionDetailsSheetOpen}
                    editMode={false}
                    createMode={false}
                    setCreateMode={() => {}}
                    setEditMode={(value: boolean) => {}}
                    handleSaveCreate={() => {}}
                    handleSaveEdit={() => {}}
                    showButtons={false}
                />
            )}
        </GestureHandlerRootView>
    );
}

export default CounterPartyScreen;
