import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { TransactionMethodDropdownActions } from "../features/actions/TransactionMethodDropdownActions";
import { RootState } from "../features/store";
import { TransactionMethod } from "../models/TransactionMethod";
import { setTransactionMethodList } from "../features/slices/TransactionMethodListSlice";
import { setMethod } from "../features/slices/TransactionSlice";
import { connect, ConnectedProps } from "react-redux";
import { useEffect, useState } from "react";
import { TransactionMethodController } from "../utils/AxiosInstance";
import { AxiosResponse } from "axios";
import { GenericResponseObject } from "../payloads/GenericResponseObject";
import { Adapt, Select, Sheet } from "tamagui";
import { Check, ChevronDown } from "@tamagui/lucide-icons";

const mapStateToProps = (
    state: RootState,
    props: TransactionMethodDropdownProps
) => ({
    TransactionMethodList:
        state.TransactionMethodListSlice.transactionMethodList,
    CurrentTransaction: state.TransactionSlice,
    action: props.action,
});

const mapDispatchToProps = (dispatch: Dispatch<UnknownAction>) => ({
    setTransactionMethodList: (transactionMethodList: TransactionMethod[]) =>
        dispatch(setTransactionMethodList(transactionMethodList)),
    setMethodInTransaction: (transactionMethod: TransactionMethod) =>
        dispatch(setMethod(transactionMethod)),
});

interface TransactionMethodDropdownProps {
    action: TransactionMethodDropdownActions;
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const TransactionMethodDropdown = ({
    action,
    TransactionMethodList,
    CurrentTransaction,
    setTransactionMethodList,
    setMethodInTransaction,
}: PropsFromRedux) => {
    // States
    const [selectedMethod, setSelectedMethod] = useState<TransactionMethod>();

    // useEffects
    useEffect(() => {
        TransactionMethodController.fetchAll().then(
            (
                response: AxiosResponse<
                    GenericResponseObject<TransactionMethod[]>
                >
            ) => {
                setTransactionMethodList(response.data.data!);
            }
        ).catch((error) => {
            console.log(error);
        });


    }, []);

    // Handlers
    const handleValueChange = (value: string) => {
        const method = TransactionMethodList.find(
            (method) => method.code === value
        );
        if (method) {
            setSelectedMethod(method);
            setMethodInTransaction(method);
        }
    };

    const getDefaultValue = () => {
        switch (action) {
            case TransactionMethodDropdownActions.TRANSACTION: {
                return CurrentTransaction?.method?.code!;
            }
            default: {
                return TransactionMethodList[0]?.code;
            }
        }
    };

    return (
        <Select
            value={selectedMethod === undefined ? "" : selectedMethod.code!}
            onValueChange={handleValueChange}
            disablePreventBodyScroll
            size={"$3"}
            defaultValue={getDefaultValue()}
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
                        <Select.Label>Transaction Method</Select.Label>
                        {TransactionMethodList.map((item, index: number) => {
                            return (
                                <Select.Item
                                    index={index}
                                    key={index}
                                    value={item.code?.toString() || ""}
                                >
                                    <Select.ItemText>
                                        {item.name}
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
    )
};

export default connector(TransactionMethodDropdown);
