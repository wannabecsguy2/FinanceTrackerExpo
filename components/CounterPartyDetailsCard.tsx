import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "../features/store";
import { Button, Card, Heading, Input, Label, View } from "tamagui";
import { Ban, Edit3, FilePlus, Save } from "@tamagui/lucide-icons";
import { connect, ConnectedProps } from "react-redux";
import { setEmail, setName, setPhone } from "../features/slices/CounterPartySlice";

interface CounterPartyDetailsCardProps {
    editMode: boolean;
    setEditMode: (value: boolean) => void;
    allowEdit: boolean;
    detailsSheetOpen: boolean;
    setDetailsSheetOpen: (value: boolean) => void;
    handleSaveEdit: () => void;
}
const mapStateToProps = (
    state: RootState,
    props: CounterPartyDetailsCardProps
) => ({
    editMode: props.editMode,
    setEditMode: props.setEditMode,
    allowEdit: props.allowEdit,
    detailsSheetOpen: props.detailsSheetOpen,
    setDetailsSheetOpen: props.setDetailsSheetOpen,
    handleSaveEdit: props.handleSaveEdit,
    counterParty: state.CounterPartySlice,
});

const mapDispatchToProps = (dispatch: Dispatch<UnknownAction>) => ({
    setCounterPartyName: (name: string) => {
        dispatch(setName(name));
    },
    setCounterPartyPhone: (phone: string) => {
        dispatch(setPhone(phone))
    },
    setCounterPartyEmail: (email: string) => {
        dispatch(setEmail(email))
    }
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const CounterPartyDetailsCard = ({
    editMode,
    setEditMode,
    allowEdit,
    counterParty,
    setCounterPartyName,
    setCounterPartyPhone,
    setCounterPartyEmail,
    setDetailsSheetOpen,
    handleSaveEdit
}: PropsFromRedux) => {
    return (
        <Card margin={"$5"}>
            <Card.Header
                flexDirection={"row"}
                justifyContent="space-between"
                padded
            >
                <View flexDirection="column" flex={1}>
                    {editMode ? (
                        <Input
                            value={counterParty.name}
                            onChangeText={(text) => {
                                setCounterPartyName(text);
                            }}
                            marginBottom={"$2"}
                        />
                    ) : (
                        <Heading size={"$8"}>{counterParty.name}</Heading>
                    )}
                    {!editMode ? (
                        <Heading size={"$2"}>{counterParty.type}</Heading>
                    ) : (
                        <Input value={counterParty.type} />
                    )}
                </View>
                {editMode && allowEdit ? (
                    <View
                        flexDirection="row"
                        flex={1}
                        justifyContent="flex-end"
                    >
                        <Button
                            icon={Ban}
                            onPress={() => {
                                setEditMode(false);
                                setDetailsSheetOpen(false);
                            }}
                            marginRight={"$3"}
                        />
                        <Button
                            icon={Save}
                            onPress={() => {
                                handleSaveEdit();
                                console.log("Save");
                            }}
                        />
                    </View>
                ) : (
                    <>
                        <Button
                            icon={Edit3}
                            onPress={() => {
                                setEditMode(true);
                            }}
                            marginRight={"$2"}
                        />
                        <Button
                            icon={FilePlus}
                            onPress={() => {
                                console.log("Record new Transaction");
                            }}
                        />
                    </>
                )}
            </Card.Header>
            <Card.Footer
                flexDirection={"row"}
                justifyContent="space-between"
                padded
            >
                <View>
                    <Heading size={"$2"}>Phone</Heading>
                    {!editMode ? (
                        <Label>{counterParty.phone}</Label>
                    ) : (
                        <Input
                            value={counterParty.phone}
                            keyboardType="number-pad"
                            onChangeText={(text) => {
                                setCounterPartyPhone(text);
                            }}
                            marginRight={"$2"}
                        />
                    )}
                </View>
                <View>
                    <Heading size={"$2"}>Email</Heading>
                    {!editMode ? (
                        <Label>{counterParty.email}</Label>
                    ) : (
                        <Input
                            value={counterParty.email}
                            keyboardType="email-address"
                            onChangeText={(text) => {
                               setCounterPartyEmail(text);
                            }}
                        />
                    )}
                </View>
            </Card.Footer>
        </Card>
    );
};

export default connector(CounterPartyDetailsCard);
