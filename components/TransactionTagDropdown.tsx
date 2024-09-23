import { connect, ConnectedProps } from "react-redux";
import { TransactionTagDropdownActions } from "../features/actions/TransactionTagDropdownActions";
import { RootState } from "../features/store";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setTransactionTagList } from "../features/slices/TransactionTagListSlice";
import { TransactionTag } from "../models/TransactionTag";
import { setTag } from "../features/slices/TransactionSlice";
import { useEffect, useState } from "react";
import { Adapt, Select, Sheet } from "tamagui";
import { Check, ChevronDown } from "@tamagui/lucide-icons";
import { TransactionTagController } from "../utils/AxiosInstance";
import { AxiosResponse } from "axios";
import { GenericResponseObject } from "../payloads/GenericResponseObject";

const mapStateToProps = (
    state: RootState,
    props: TransactionTagDropdownProps
) => ({
    TransactionTagList: state.TransactionTagListSlice.transactionTagList,
    CurrentTransaction: state.TransactionSlice,
    action: props.action,
});

const mapDispatchToProps = (dispatch: Dispatch<UnknownAction>) => ({
    setTransactionTagList: (transactionTagList: TransactionTag[]) =>
        dispatch(setTransactionTagList(transactionTagList)),
    setTransactionTag: (transactionTag: TransactionTag) =>
        dispatch(setTag(transactionTag)),
});

interface TransactionTagDropdownProps {
    action: TransactionTagDropdownActions;
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const TransactionTagDropdown = ({
    TransactionTagList,
    CurrentTransaction,
    action,
    setTransactionTag,
    setTransactionTagList,
}: PropsFromRedux) => {
    // States
    const [selectedTag, setSelectedTag] = useState<TransactionTag>();
    // useEffects
    useEffect(() => {
        TransactionTagController.fetchAll().then(
            (
                response: AxiosResponse<
                    GenericResponseObject<TransactionTag[]>
                >
            ) => {
                setTransactionTagList(response.data.data!);
            }
        ).catch((error) => {
            console.log(error);
        });


    }, []);

    // Handlers
    const handleValueChange = (value: string) => {
        const tag = TransactionTagList.find(
            (method) => method.code === value
        );
        if (tag) {
            setSelectedTag(tag);
            setTransactionTag(tag);
        }
    };

    const getDefaultValue = () => {
        switch (action) {
            case TransactionTagDropdownActions.TRANSACTION: {
                return CurrentTransaction?.method?.code!;
            }
            default: {
                return TransactionTagList[0]?.code!;
            }
        }
    };

    return (
        <Select
            value={selectedTag === undefined ? "" : selectedTag.code!}
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
                        <Select.Label>Transaction Category</Select.Label>
                        {TransactionTagList.map((item, index: number) => {
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

export default connector(TransactionTagDropdown);

