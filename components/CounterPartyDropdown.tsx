import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { CounterPartyDropdownActions } from "../features/actions/CounterPartyDropdownAction";
import { RootState } from "../features/store";
import { CounterParty } from "../models/CounterParty";
import { setCounterPartyList } from "../features/slices/CounterPartyListSlice";
import { connect, ConnectedProps } from "react-redux";
import { Adapt, Select, Sheet, View, XStack } from "tamagui";
import { useEffect, useState } from "react";
import * as SecureStore from "../utils/SecureStore";
import { CounterPartyController } from "../utils/AxiosInstance";
import { GenericResponseObject } from "../payloads/GenericResponseObject";
import { AxiosResponse } from "axios";
import { setCounterParty } from "../features/slices/TransactionSlice";
import { ChevronDown } from "@tamagui/lucide-icons";
import { Check } from "@tamagui/lucide-icons";

interface CounterPartyDropdownProps {
    action: CounterPartyDropdownActions;
}

const mapStateToProps = (
    state: RootState,
    props: CounterPartyDropdownProps
) => {
    return {
        CounterPartyList: state.CounterPartyListSlice.counterPartyList,
        CurrentTransaction: state.TransactionSlice,
        action: props.action,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<UnknownAction>) => ({
    setCounterPartyList: (counterPartyList: CounterParty[]) =>
        dispatch(setCounterPartyList(counterPartyList)),
    setTransactionCounterParty: (counterParty: CounterParty) => {
        dispatch(setCounterParty(counterParty));
    },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const CounterPartyDropdown = ({
    CounterPartyList,
    CurrentTransaction,
    action,
    setCounterPartyList,
    setTransactionCounterParty,
}: PropsFromRedux) => {
    // States
    const [selectedCounterParty, setSelectedCounterParty] =
        useState<CounterParty>();

    // useEffects
    useEffect(() => {
        SecureStore.getItem("token").then((token) => {
            CounterPartyController.fetchAll(token!).then(
                (
                    response: AxiosResponse<
                        GenericResponseObject<CounterParty[]>
                    >
                ) => {
                    setCounterPartyList(response.data.data!);
                }
            );
        });

        if (CurrentTransaction.counterParty !== undefined) {
            setSelectedCounterParty(CurrentTransaction.counterParty);
        }
    }, []);

    // Handlers
    const handleValueChange = (value: string) => {
        const findCounterParty = CounterPartyList.find(
            (counterParty) => counterParty.id === value
        );
        setSelectedCounterParty(findCounterParty);
        switch (action) {
            case CounterPartyDropdownActions.Transaction: {
                setTransactionCounterParty(findCounterParty!);
            }
        }
    };
    return (
        <Select
            value={
                selectedCounterParty === undefined
                    ? ""
                    : selectedCounterParty.id!
            }
            onValueChange={handleValueChange}
            disablePreventBodyScroll
        >
            <Select.Trigger width={220} iconAfter={ChevronDown}>
                <Select.Value placeholder="" />
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
                        <Select.Label>Currency</Select.Label>
                        {CounterPartyList.map((item, index: number) => {
                            return (
                                <Select.Item
                                    index={index}
                                    key={index}
                                    value={item.id || ""}
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
    );
};

export default connector(CounterPartyDropdown);
