import {
    View,
    Text,
    FlatList,
    Image,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import filter from "lodash.filter";
import { ImageButton, RoundedButton, VectorButton } from "../components/button";
import { styles } from "../styles/sendcrypto";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import { cryptoListArray } from "../strings/cryptolist";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { ProcessingModal } from "../components/modal";
import { CustomModal } from "../components/modal";
import { BarCodeScanner } from "expo-barcode-scanner";
import TransactionSuccessScreen from "./BreakdownScreens/PaymentDetails/TransactionSuccessScreen";
import TransactionFailedScreen from "./BreakdownScreens/PaymentDetails/TransactionFailedScreen";
import SwapDetails from "./BreakdownScreens/SwapDetails/SwapDetails";
import SwapConfirmation from "./BreakdownScreens/SwapDetails/SwapConfirmation";
import { RechargeConfirmation } from "./BreakdownScreens/PaymentDetails/BillConfirmation";

import { useSelector, useDispatch } from "react-redux";


export default function DedicatedSend({ route }) {
    const navigation = useNavigation();
    // function specific states

    const [cryptoName, setCryptoName] = useState(route.params.crypto_name);
    const [cryptoIcon, setCryptoIcon] = useState(route.params.crypto_icon);


    const [isModalVisible, setModalVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const [amount, setAmount] = useState("");
    const [rAddress, setRAddress] = useState(route.params.address ? route.params.address : "");
    const [network, setNetwork] = useState("");
    const [walletName, setWalletName] = useState("");

    const theme = useSelector((state) => state.persistedReducer.theme);
    const dispatch = useDispatch();

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const send = () => {
        setIsVisible(true);

        let data = {
            amount,
            rAddress,
            network,
            walletName,
            user_id: route.params.user.id,
        };
    };

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.background }]}
        >
            <VectorButton
                name="chevron-back"
                size={24}
                color={theme.primary}
                style={styles.optionsbackButton}
                handlePress={() => navigation.navigate(Strings.qrcode)}
            />
            {/* <VectorButton
                name="scan"
                size={24}
                color={theme.primary}
                style={styles.optionsScanButton}
                handlePress={() => navigation.navigate("scan")}
            /> */}
            <Text style={[styles.optionHeaderText, { color: theme.text }]}>
                Send {cryptoName}
            </Text>
            <Text style={[styles.optionSubtitleText, { color: theme.text }]}>
                Transfer Crypto from your Clyp Wallet
            </Text>
            <Image style={styles.optionsimage} source={{ uri: cryptoIcon }} />

            <ScrollView>
                <View>
                    <TextInput
                        style={[
                            styles.walletAddressInput,
                            { backgroundColor: theme.textinput, color: theme.text },
                        ]}
                        placeholderTextColor={theme.text}
                        placeholder={Strings.walletAddress}
                        value={rAddress}
                        // onChangeText={(value) => setCryptoAddress(value)}
                        selectionColor={Colors.primary}
                        onChangeText={(text) => setRAddress(text)}
                    />
                    {/* <TextInput
              style={styles.otherTextInputs}
              placeholder={Strings.walletName}
              selectionColor={Colors.primary}
              onChangeText={(text) => setWalletName()}
            /> */}

                    {/* <TextInput
              style={styles.otherTextInputs}
            <TextInput
              style={[
                styles.otherTextInputs,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholderTextColor={theme.text}
              placeholder={Strings.walletName}
              selectionColor={Colors.primary}
              onChangeText={(text) => setWalletName()}
            />
            <TextInput
              style={[
                styles.otherTextInputs,
                { backgroundColor: theme.textinput, color: theme.text },
              ]}
              placeholderTextColor={theme.text}
              placeholder={Strings.selectNetwork}
              selectionColor={Colors.primary}
              onChangeText={(text) => setNetwork(text)}
            /> */}

                    <TextInput
                        style={[
                            styles.otherTextInputs,
                            { backgroundColor: theme.textinput, color: theme.text },
                        ]}
                        placeholderTextColor={theme.text}
                        placeholder={Strings.enterAmount}
                        selectionColor={Colors.primary}
                        onChangeText={(text) => setAmount(text)}
                        keyboardType="numeric"
                    />

                    <RoundedButton
                        text={"Send " + route.params.crypto_name}
                        textStyle={styles.textButton}
                        style={styles.button}
                        handlePress={() => navigation.navigate("tt")}
                    />
                </View>
            </ScrollView>

            {/*     <DropDownPicker
          style={styles.dropdown}
            open={open}
            value={value}
            items={network}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          /> */}
            <ProcessingModal isVisible={isVisible} />
        </SafeAreaView>
    );
}