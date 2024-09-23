import {
    Button,
    Heading,
    Paragraph,
    Sheet,
    ToggleGroup,
    View,
    XStack,
    YStack,
} from "tamagui";
import DateTimePicker from "@react-native-community/datetimepicker";
import store, { RootState } from "../features/store";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { connect, ConnectedProps } from "react-redux";
import {
    setAmount,
    setDate,
    setDirection,
    setNote,
    setTransaction,
} from "../features/slices/TransactionSlice";
import { Transaction } from "../models/Transaction";
import {
    Ban,
    Calendar,
    Edit3,
    MoveDownRight,
    MoveUpRight,
    Save,
} from "@tamagui/lucide-icons";
import CounterPartyDropdown from "./CounterPartyDropdown";
import { CounterPartyDropdownActions } from "../features/actions/CounterPartyDropdownAction";
import { TransactionDirection } from "../models/TransactionDirection";
import CurrencyDropdown from "./CurrencyDropdown";
import { CurrencyDropdownActions } from "../features/actions/CurrencyDropdownActions";
import { Input } from "tamagui";
import TransactionMethodDropdown from "./TransactionMethodDropdown";
import { TransactionMethodDropdownActions } from "../features/actions/TransactionMethodDropdownActions";
import TransactionTagDropdown from "./TransactionTagDropdown";
import { TransactionTagDropdownActions } from "../features/actions/TransactionTagDropdownActions";
import { useState } from "react";

interface TransactionDetailsSheetProps {
    detailsSheetOpen: boolean;
    setDetailsSheetOpen: (value: boolean) => void;
    editMode: boolean;
    setEditMode: (value: boolean) => void;
    createMode: boolean;
    setCreateMode: (value: boolean) => void
    handleSaveEdit: () => void;
    handleSaveCreate: () => void;
    showButtons: boolean;
}
const mapStateToProps = (
    state: RootState,
    props: TransactionDetailsSheetProps
) => ({
    transaction: state.TransactionSlice,
    showButtons: props.showButtons,
    detailsSheetOpen: props.detailsSheetOpen,
    setDetailsSheetOpen: props.setDetailsSheetOpen,
    editMode: props.editMode,
    setEditMode: props.setEditMode,
    createMode: props.createMode,
    setCreateMode: props.setCreateMode,
    handleSaveEdit: props.handleSaveEdit,
    handleSaveCreate: props.handleSaveCreate,
});
const mapDispatchToProps = (dispatch: Dispatch<UnknownAction>) => ({
    setTransaction: (transaction: Transaction) =>
        dispatch(setTransaction(transaction)),
    setTransactionDirection: (transactionDirection: TransactionDirection) =>
        dispatch(setDirection(transactionDirection)),
    setTransactionAmount: (amount: number) => dispatch(setAmount(amount)),
    setTransactionDate: (date: Date) => dispatch(setDate(date.toISOString())),
    setTransactionNote: (note: string) => dispatch(setNote(note)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const TransactionDetailsSheet = ({
    transaction,
    showButtons,
    detailsSheetOpen,
    setDetailsSheetOpen,
    editMode,
    setEditMode,
    createMode,
    setCreateMode,
    handleSaveEdit,
    handleSaveCreate,
    setTransactionDirection,
    setTransactionAmount,
    setTransactionDate,
    setTransactionNote,
}: PropsFromRedux) => {
    // States
    const [showDateTimePicker, setShowDateTimePicker] =
        useState<boolean>(false);
    return (
        <Sheet
            forceRemoveScrollEnabled={true}
            modal={true}
            open={detailsSheetOpen}
            onOpenChange={() => {
                setDetailsSheetOpen(!detailsSheetOpen);
                setEditMode(false);
            }}
            snapPoints={editMode ? [100] : [50]}
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
                <View margin={"$5"}>
                    <YStack>
                        {showButtons && (
                            <View flexDirection="row" justifyContent="flex-end">
                                {editMode ? (
                                    <>
                                        <Button
                                            icon={Ban}
                                            onPress={() => {
                                                setEditMode(false);
                                                setCreateMode(false)
                                                setDetailsSheetOpen(false);
                                            }}
                                            marginRight={"$3"}
                                        />
                                        <Button
                                            icon={Save}
                                            onPress={() => {
                                                if (createMode) {
                                                    handleSaveCreate();
                                                } else if (editMode) {
                                                    handleSaveEdit();
                                                }
                                            }}
                                        />
                                    </>
                                ) : (
                                    <Button
                                        icon={Edit3}
                                        onPress={() => {
                                            setEditMode(true);
                                        }}
                                    />
                                )}
                            </View>
                        )}
                        <View>
                            <Heading
                                size={"$2"}
                                fontWeight={"900"}
                                fontFamily={"$heading"}
                                marginBottom={"$2"}
                            >
                                Counter Party
                            </Heading>
                            {editMode ? (
                                <XStack marginBottom={"$6"}>
                                    <CounterPartyDropdown
                                        action={
                                            CounterPartyDropdownActions.Transaction
                                        }
                                        store={store}
                                    />
                                </XStack>
                            ) : (
                                <Heading
                                    size={"$8"}
                                    fontFamily={"$body"}
                                    marginBottom={"$6"}
                                >
                                    {transaction?.counterParty?.name}
                                </Heading>
                            )}
                        </View>
                    </YStack>
                    <Heading
                        size={"$2"}
                        fontWeight={"900"}
                        fontFamily={"$heading"}
                        marginBottom={"$4"}
                    >
                        Transaction Details
                    </Heading>
                    {editMode ? (
                        <>
                            <YStack>
                                <XStack marginBottom={"$6"}>
                                    <YStack marginRight={"$7"}>
                                        <Heading
                                            size={"$2"}
                                            fontFamily={"$heading"}
                                            marginBottom={"$2"}
                                        >
                                            Direction
                                        </Heading>
                                        <View>
                                            {/*@ts-ignore*/}
                                            <ToggleGroup
                                                type="single"
                                                orientation="horizontal"
                                                size="$2"
                                                value={transaction?.direction}
                                                onValueChange={(value) => {
                                                    setTransactionDirection(
                                                        value === "CREDIT"
                                                            ? TransactionDirection.CREDIT
                                                            : TransactionDirection.DEBIT
                                                    );
                                                }}
                                                defaultValue={
                                                    transaction?.direction
                                                }
                                            >
                                                <ToggleGroup.Item
                                                    value={
                                                        TransactionDirection.DEBIT
                                                    }
                                                >
                                                    <MoveUpRight
                                                        size={"$1"}
                                                        color={"$red10Dark"}
                                                    />
                                                </ToggleGroup.Item>
                                                <ToggleGroup.Item
                                                    value={
                                                        TransactionDirection.CREDIT
                                                    }
                                                >
                                                    <MoveDownRight
                                                        size={"$1"}
                                                        color={"$green10Dark"}
                                                    />
                                                </ToggleGroup.Item>
                                            </ToggleGroup>
                                        </View>
                                    </YStack>
                                    <YStack flex={1}>
                                        <Heading
                                            size={"$2"}
                                            fontFamily={"$heading"}
                                            marginBottom={"$2"}
                                        >
                                            Amount
                                        </Heading>

                                        <XStack flexDirection="row">
                                            <View
                                                alignItems="flex-start"
                                                flex={0.5}
                                                marginRight={"$2"}
                                            >
                                                <CurrencyDropdown
                                                    action={
                                                        CurrencyDropdownActions.TRANSACTION
                                                    }
                                                    store={store}
                                                />
                                            </View>
                                            <View flex={1}>
                                                <Input
                                                    flex={1}
                                                    value={transaction.amount?.toString()}
                                                    onChangeText={(
                                                        text: string
                                                    ) => {
                                                        setTransactionAmount(
                                                            Number.parseFloat(
                                                                text
                                                            )
                                                        );
                                                    }}
                                                    keyboardType="decimal-pad"
                                                />
                                            </View>
                                        </XStack>
                                    </YStack>
                                </XStack>
                                <XStack marginBottom={"$6"}>
                                    <YStack flex={1} marginRight={"$5"}>
                                        <Heading
                                            size={"$2"}
                                            fontFamily={"$heading"}
                                            marginBottom={"$2"}
                                        >
                                            Method
                                        </Heading>
                                        <TransactionMethodDropdown
                                            action={
                                                TransactionMethodDropdownActions.TRANSACTION
                                            }
                                            store={store}
                                        />
                                    </YStack>
                                    <YStack flex={1}>
                                        <Heading
                                            size={"$2"}
                                            fontFamily={"$heading"}
                                            marginBottom={"$2"}
                                        >
                                            Category
                                        </Heading>
                                        <TransactionTagDropdown
                                            action={
                                                TransactionTagDropdownActions.TRANSACTION
                                            }
                                            store={store}
                                        />
                                    </YStack>
                                </XStack>
                                <XStack marginBottom={"$6"}>
                                    <YStack flex={1}>
                                        <Heading
                                            size={"$2"}
                                            fontFamily={"$heading"}
                                            marginBottom={"$2"}
                                        >
                                            Date
                                        </Heading>
                                        <View
                                            flexDirection="row"
                                            justifyContent="space-between"
                                        >
                                            <Heading
                                                size={"$6"}
                                                fontFamily={"$body"}
                                            >
                                                {new Date(
                                                    transaction.date?.split(
                                                        "T"
                                                    )[0]!
                                                ).toDateString()}
                                            </Heading>
                                            <Calendar
                                                onPress={() => {
                                                    setShowDateTimePicker(true);
                                                }}
                                            />
                                        </View>
                                        {showDateTimePicker && (
                                            <DateTimePicker
                                                value={new Date()}
                                                mode="date"
                                                onChange={(event, date) => {
                                                    setShowDateTimePicker(
                                                        false
                                                    );
                                                    setTransactionDate(date!);
                                                }}
                                            />
                                        )}
                                    </YStack>
                                </XStack>
                                <XStack>
                                    <YStack flex={1}>
                                        <Heading
                                            size={"$2"}
                                            fontFamily={"$heading"}
                                        >
                                            Note
                                        </Heading>
                                        <Input
                                            value={transaction.note}
                                            onChangeText={(text) => {
                                                setTransactionNote(text);
                                            }}
                                        />
                                    </YStack>
                                </XStack>
                            </YStack>
                        </>
                    ) : (
                        <>
                            <XStack
                                justifyContent="space-between"
                                marginBottom={"$6"}
                            >
                                <YStack>
                                    <Heading
                                        size={"$2"}
                                        fontFamily={"$heading"}
                                    >
                                        Amount
                                    </Heading>
                                    <Heading size={"$6"} fontFamily={"$body"}>
                                        {transaction?.currency?.code! +
                                            " " +
                                            transaction?.amount!}
                                    </Heading>
                                </YStack>
                                <YStack>
                                    <Heading
                                        size={"$2"}
                                        fontFamily={"$heading"}
                                    >
                                        Method
                                    </Heading>
                                    <Heading size={"$6"} fontFamily={"$body"}>
                                        {transaction?.method?.name}
                                    </Heading>
                                </YStack>
                                <YStack>
                                    <Heading
                                        size={"$2"}
                                        fontFamily={"$heading"}
                                    >
                                        Direction
                                    </Heading>
                                    <Heading
                                        size={"$6"}
                                        fontFamily={"$body"}
                                        color={
                                            transaction.direction ===
                                            TransactionDirection.CREDIT
                                                ? "$green10"
                                                : "$red10"
                                        }
                                    >
                                        {transaction?.direction!}
                                    </Heading>
                                </YStack>
                            </XStack>
                            <XStack
                                marginBottom={"$6"}
                                justifyContent="space-between"
                            >
                                <YStack>
                                    <Heading
                                        size={"$2"}
                                        fontFamily={"$heading"}
                                    >
                                        Category
                                    </Heading>
                                    <Heading size={"$6"} fontFamily={"$body"}>
                                        {transaction?.tag?.name}
                                    </Heading>
                                </YStack>
                                <YStack>
                                    <Heading
                                        size={"$2"}
                                        fontFamily={"$heading"}
                                    >
                                        Date
                                    </Heading>
                                    <Heading size={"$6"} fontFamily={"$body"}>
                                        {new Date(
                                            transaction.date?.split("T")[0]!
                                        ).toDateString()}
                                    </Heading>
                                </YStack>
                            </XStack>
                            <XStack justifyContent="space-between">
                                <YStack>
                                    <Heading
                                        size={"$2"}
                                        fontFamily={"$heading"}
                                    >
                                        Notes
                                    </Heading>
                                    <Paragraph size={"$6"} fontFamily={"$body"}>
                                        {transaction?.note}
                                    </Paragraph>
                                </YStack>
                            </XStack>
                        </>
                    )}
                </View>
            </Sheet.Frame>
        </Sheet>
    );
};

export default connector(TransactionDetailsSheet)
