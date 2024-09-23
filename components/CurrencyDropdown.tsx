import { useEffect, useState } from "react";
import { CurrencyController } from "../utils/AxiosInstance";
import { AxiosResponse } from "axios";
import { GenericResponseObject } from "../payloads/GenericResponseObject";
import { Currency } from "../models/Currency";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../features/store";
import { Adapt, Select, Sheet, View } from "tamagui";
import { setCurrencies } from "../features/slices/CurrencyListSlice";
import { Check, ChevronDown } from "@tamagui/lucide-icons";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { setCurrency } from "../features/slices/TransactionSlice";
import { CurrencyDropdownActions } from "../features/actions/CurrencyDropdownActions";

interface CurrencyDropdownProps {
    action: CurrencyDropdownActions;
}
const mapStateToProps = (state: RootState, props: CurrencyDropdownProps) => ({
    CurrencyList: state.CurrencyListSlice.currencies,
    CurrentTransaction: state.TransactionSlice,
    action: props.action,
});

const mapDispatchToProps = (dispatch: Dispatch<UnknownAction>) => ({
    setCurrencies: (currencies: Currency[]) =>
        dispatch(setCurrencies(currencies)),
    setTransactionCurrency: (currency: Currency) => {
        dispatch(setCurrency(currency));
    },
});

const connector = connect(mapStateToProps, mapDispatchToProps, null, {});
type PropsFromRedux = ConnectedProps<typeof connector>;

const CurrencyDropdown = ({
    action,
    CurrencyList,
    CurrentTransaction,
    setCurrencies,
    setTransactionCurrency,
}: PropsFromRedux) => {
    // States
    const [selectedCurrency, setSelectedCurrency] = useState<Currency>();

    // useEffect
    useEffect(() => {
        CurrencyController.fetchAll()
            .then(
                (
                    response: AxiosResponse<GenericResponseObject<Currency[]>>
                ) => {
                    setCurrencies(response.data.data!);
                }
            )
            .catch((error) => {
                console.error(error);
            });

        if (CurrentTransaction === undefined) {
            setSelectedCurrency(CurrencyList[0]);
        } else {
            setSelectedCurrency(CurrentTransaction?.currency);
        }
    }, []);

    // Handlers
    const handleValueChange = (value: string) => {
        CurrencyList.forEach((currency) => {
            if (currency.code! === value) {
                setSelectedCurrency(currency);
                switch (action) {
                    case CurrencyDropdownActions.TRANSACTION: {
                        setTransactionCurrency(currency);
                        break;
                    }
                    default: {
                        console.info("No action provided");
                        break;
                    }
                }
            }
        });
    };

    const getDefaultValue = () => {
        switch (action) {
            case CurrencyDropdownActions.TRANSACTION: {
                return CurrentTransaction?.currency?.code!;
            }
            default: {
                return CurrencyList[0]?.code;
            }
        }
    };

    return (
        <Select
            value={selectedCurrency === undefined ? "" : selectedCurrency.code!}
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
                        <Select.Label>Currency</Select.Label>
                        {CurrencyList.map((item, index: number) => {
                            return (
                                <Select.Item
                                    index={index}
                                    key={index}
                                    value={item.code?.toString() || ""}
                                >
                                    <Select.ItemText>
                                        {item.code}
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
export default connector(CurrencyDropdown);
