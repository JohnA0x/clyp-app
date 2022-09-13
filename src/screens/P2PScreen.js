import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  FileImageButton,
  ImageButton,
  RoundedButton,
  VectorButton,
} from "../components/button";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as Strings from "../strings/strings";
import { styles } from "../styles/p2p";

import { bankAccountList } from "../strings/depositlist";

export default function P2PScreen({ navigation, route }) {
  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Strings.depositCash} component={DepositCash} />
      <Stack.Screen name={Strings.paymentOptions} component={PaymentOptions} />
      <Stack.Screen name={Strings.offers} component={Offers} />
      <Stack.Screen name={Strings.finaliseOffer} component={FinaliseOffer} />
    </Stack.Navigator>
  );

  function DepositCash() {
    const [amount, setAmount] = useState("");

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.deposit)}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.depositCash}
          </Text>
        </View>

        <View>
          <Text style={[styles.addCash, { color: theme.text }]}>Add Cash</Text>
          <Text style={[styles.addCashDescription, { color: theme.text }]}>
            Input the amount of money you wish to send to a bank account
          </Text>

          <TextInput
            style={[styles.amountValueText, { color: theme.text }]}
            keyboardType="numeric"
            numberOfLines={1}
            maxLength={12}
            placeholder="Amount"
            placeholderTextColor={theme.flatlist}
            selectionColor={theme.primary}
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />

          <RoundedButton
            text="Confirm"
            textStyle={styles.roundedTextButton}
            style={styles.roundedButton}
            handlePress={() => navigation.navigate(Strings.paymentOptions)}
          />
        </View>
      </SafeAreaView>
    );
  }

  function PaymentOptions() {
    const [bank, setBank] = useState([]);
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [banks, setBanks] = useState([]);

    const paymentList = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("accountwithdraw", {
              account: item,
            });
            setBank(item);
            setAccountName(item.name);
            setAccountNumber(item.accountNumber);
          }}
        >
          <Image
            style={styles.bankIcon}
            source={require("../drawables/bitcoin.png")}
          />
          <Text style={styles.nameText}>{item.account_name}</Text>
          <Text style={styles.bankNameText}>{item.bank_name}</Text>
          <Text style={styles.accountNameText}>{item.account_number}</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.depositviaP2P)}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.paymentOptions}
          </Text>
        </View>

        <Text style={[styles.paymentDescription, { color: theme.text }]}>
          Choose Account to complete the transaction with
        </Text>

        <FlatList
          contentContainerStyle={styles.flatlist}
          //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
          data={banks}
          renderItem={paymentList}
        />

        <View style={styles.otherOptionsView}>
          <Text
            style={styles.addNewAccount}
            onPress={() => navigation.navigate(Strings.offers)}
          >
            Add New Account
          </Text>
          <Text
            style={styles.useAnotherAccount}
            onPress={() => navigation.navigate(Strings.UseAnotherBankAccount)}
          >
            Use Another Account Instead
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  function Offers() {
    const merchantList = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.merchantBox, { backgroundColor: theme.flatlist }]}
          onPress={() => {
            navigation.navigate(Strings.finaliseOffer, {
              account: item,
            });
          }}
        >
          <View style={styles.offerRow}>
            <Image
              style={styles.icon}
              source={require("../drawables/bitcoin.png")}
            />
            <Text style={[styles.merchantName, { color: theme.text }]}>
              Demo Name
            </Text>
            <Text style={[styles.tradeRate, { color: theme.text }]}>
              20 trades | 79.10%
            </Text>
            <Text style={styles.accountNameText}>{item.account_number}</Text>
          </View>

          <View style={styles.offerRow}>
            <View style={styles.offerColumn}>
              <Text style={[styles.offerAmount, { color: theme.text }]}>
                Pay 8000 NGN
              </Text>
              <Text style={[styles.amountReceivedText, { color: theme.text }]}>
                Crypto amount
              </Text>
              <Text style={[styles.paymentMethodText, { color: theme.text }]}>
                Payment Method
              </Text>
            </View>

            <View style={styles.offerColumn}>
              <Text style={[styles.offerFee, { color: theme.text }]}>
                NGN 100 fee
              </Text>
              <Text style={[styles.amountReceivedValue, { color: theme.text }]}>
                7900 NGNT
              </Text>
              <Text style={[styles.paymentMethodValue, { color: theme.text }]}>
                Guaranty Trust Bank
              </Text>
            </View>

            <TouchableOpacity style={[styles.actionButton]}>
              <Text
                style={[styles.actionButtonText, { color: theme.background }]}
              >
                Buy
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.paymentOptions)}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.offers}
          </Text>
        </View>

        <View>
          <Text style={[styles.selectMerchantText, { color: theme.text }]}>
            Select a Merchant
          </Text>

          <FlatList
            contentContainerStyle={styles.offerFlatlist}
            //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
            data={bankAccountList}
            renderItem={merchantList}
          />
        </View>
      </SafeAreaView>
    );
  }

  function FinaliseOffer() {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.offers)}
          />

          <Text style={[styles.headerText, { color: theme.text }]}>
            Deposit NGNT
          </Text>
        </View>

        <ScrollView>
          <TouchableOpacity style={[styles.cancelOrder]}>
            <Text
              style={[styles.actionButtonText, { color: theme.text }]}
            >
              Cancel Order
            </Text>
          </TouchableOpacity>

          <Text style={[styles.sendMoneyText, { color: theme.text }]}>
            Send Money to the merchant account with the details provided below
          </Text>

          <Text style={[styles.makePaymentText, { color: theme.text }]}>
            Make Payment In
          </Text>

          <Text style={[styles.youSendText, { color: theme.text }]}>
            You are to send
          </Text>

          <Text style={[styles.finaliseAmountValue, { color: theme.text }]}>
            8000 NGN
          </Text>

          <Text style={[styles.chargesText, { color: theme.text }]}>
            100 NGN charges included
          </Text>

          <Text style={[styles.bankDetails, { color: theme.text }]}>
            Bank Details
          </Text>
          <View
            style={[styles.merchantBox, { backgroundColor: theme.flatlist }]}
          ></View>

          <Text style={[styles.merchantContact, { color: theme.text }]}>
            Merchant Contact Info
          </Text>
          <View
            style={[styles.merchantBox, { backgroundColor: theme.flatlist }]}
          ></View>

          <Text style={[styles.terms, { color: theme.text }]}>Terms</Text>
          <Text style={[styles.termsDetail, { color: theme.text }]}>
            Terms Details
          </Text>

          <RoundedButton
            text="I have paid"
            textStyle={styles.roundedTextButton}
            style={styles.roundedButton}
            handlePress={() => navigation.navigate(Strings.paymentOptions)}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
