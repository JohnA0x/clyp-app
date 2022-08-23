import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/deposit";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import * as Values from "../constants/values";
import {
  FileImageButton,
  ImageButton,
  RoundedButton,
  VectorButton,
} from "../components/button";
import { listSeparator } from "../components/listseparator";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Dropdown } from "react-native-element-dropdown";

import { useState } from "react";
import { depositListArray, depositCardList } from "../strings/depositlist";
import cryptoListArray from "../strings/cryptolist";

const Stack = createNativeStackNavigator();

export default function DepositScreen({ navigation, route }) {
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoIcon, setCryptoIcon] = useState("");
  const [priceChange, setPriceChange] = useState("");
  const [walletOptions, setWalletOptions] = useState([
    { address: "hh", abb: "hh" },
  ]);

  // This is the state that defines a card properties when clicked on
  const [cardOptions, setCardOptions] = useState([
    { cardName: "", cardType: "", cardNumber: "", securityCode: "", expiryDate: ""},
  ]);

  const [cardNumber, setCardNumber] = useState("");

  const [cardInputOptions, setCardInputOptions] = useState([
    { cardNumber: "", expiryDate: "", securityCode: "", amount: "0", pin: "" },
  ]);

  const priceChangeColor = priceChange > 0 ? "#009E06" : "";
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={Strings.deposit}
        initialParams={route}
        component={DepositOptions}
      />

      <Stack.Screen
        name={Strings.depositviaCrypto}
        component={CryptoOptions}
        initialParams={route}
      />

      <Stack.Screen
        name="TransactionsOptions"
        component={TransactionsOptions}
        initialParams={route}
      />

      <Stack.Screen
        name={Strings.depositviaDebit}
        component={DepositviaDebitCard}
        initialParams={route}
      />
      <Stack.Screen
        name={Strings.UseAnotherCard}
        component={UseAnotherCard}
        initialParams={route}
      />

      <Stack.Screen
        name="Complete Use Card"
        component={CompleteUseCard}
        initialParams={route}
      />
    </Stack.Navigator>
  );

  function DepositOptions({ navigation }) {
    const depositOptions = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(item.title)}
        >
          <VectorButton
            name={item.icon}
            size={24}
            color={Colors.primary}
            style={styles.headerImage}
          />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.home)}
          />
          <Text style={styles.headerText}>{Strings.fund}</Text>
        </View>
        <FlatList
          //contentContainerStyle={styles.flatlist}
          //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
          data={depositListArray}
          renderItem={depositOptions}
        />
      </SafeAreaView>
    );
  }

  function CryptoOptions() {
    const sendCryptoList = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.list}
          onPress={() => {
            navigation.push("TransactionsOptions");
            setCryptoName(item.name);
            setCryptoIcon(item.icon);
            setWalletOptions({ abb: item.abb });
          }}
        >
          <Image source={{ uri: item.icon }} style={styles.image} />
          <Text style={styles.valueText}>{item.value}</Text>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.home)}
          />
          <Text style={styles.headerText}>{Strings.fund}</Text>
        </View>

        <View style={styles.flatlist}>
          <FlatList
            data={cryptoListArray}
            //ListHeaderComponent={renderHeader}
            renderItem={sendCryptoList}
          />
        </View>
      </SafeAreaView>
    );
  }

  function TransactionsOptions() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.depositviaCrypto)}
          />
          <Text style={styles.headerText}>{Strings.fund}</Text>
        </View>

        <View style={styles.transactionCryptoContainer}>
          <Image style={styles.cryptoImage} source={{ uri: cryptoIcon }} />
          <Text style={styles.cryptoText}>{cryptoName}</Text>
        </View>

        <View style={styles.transactionAmountContainer}>
          <Text style={styles.amountText}>Amount:</Text>
          <TextInput
            style={styles.amountValueText}
            keyboardType="numeric"
            numberOfLines={1}
            maxLength={12}
            placeholder="Amount"
            selectionColor={Colors.primary}
          ></TextInput>
          <Text style={styles.amountMaxValue}>Max</Text>
        </View>

        <View style={styles.lineCrosser} />
        <Text style={styles.receiveAmount}>
          You will receive N20,000 in Naira
        </Text>
        <Text style={styles.conversionAmount}>1 BTC = $23,000</Text>
        <RoundedButton
          style={styles.depositButton}
          text={Strings.deposit}
          textStyle={styles.depositText}
        />
      </SafeAreaView>
    );
  }

  function DepositviaDebitCard() {
    //Withdrawal FlatList Design
    const cardList = ({ item }) => (
      <View style={styles.cardRowContainer}>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => {
            navigation.navigate("accountwithdraw");
            setCardOptions({
              cardName: item.cardName,
              cardType: item.cardType,
              cardNumber: item.cardNumber,
              securityCode: item.securityCode,
              expiry: item.expiry,
            });
          }}
        >
          <Image
            style={styles.bankIcon}
            source={require("../drawables/bitcoin.png")}
          />
          <Text style={styles.nameText}>{item.cardName}</Text>
          <Text style={styles.bankNameText}>{item.cardType}</Text>
          <Text style={styles.accountNameText}>{item.cardNumber}</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.home)}
          />
          <Text style={styles.headerText}>{Strings.fund}</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.cardFlatlist}
          //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
          data={depositCardList}
          renderItem={cardList}
        />
        <View style={styles.otherOptionsView}>
          <Text style={styles.addNewAccount}>Add New Card</Text>
          <Text
            style={styles.useAnotherAccount}
            onPress={() => navigation.navigate(Strings.UseAnotherCard)}
          >
            Use Another Card
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  function UseAnotherCard() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("editprofile")}
          />
          <Text style={styles.headerText}>{Strings.UseAnotherCard}</Text>
        </View>

        <TextInput
          style={styles.inputText}
          placeholder="Card Number"
          selectionColor={Colors.primary}
          maxLength={16}
          value={cardOptions.cardNumber}
          onChangeText={(value) => setCardOptions({cardNumber: value})}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Expiry Date"
          selectionColor={Colors.primary}
          maxLength={5}
          value={cardOptions.expiryDate}
          onChangeText={(value) => setCardOptions({expiryDate: value})}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Security Code"
          selectionColor={Colors.primary}
          maxLength={3}
          keyboardType="numeric"
        />

        <RoundedButton
          text="Proceed"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          handlePress={() => {
            navigation.navigate("Complete Use Card");
          }}
        />
      </SafeAreaView>
    );
  }

  function CompleteUseCard() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.UseAnotherCard)}
          />
          <Text style={styles.headerText}>{Strings.UseAnotherCard}</Text>
        </View>

        <TextInput
          style={styles.inputText}
          placeholder="Amount"
          selectionColor={Colors.primary}
          maxLength={16}
          keyboardType="numeric"
          // value={bvn}
          //onChangeText={(value) => setBVN(value)}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="Transaction Pin"
          selectionColor={Colors.primary}
          maxLength={5}
        />

        <RoundedButton
          text="Deposit"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          handlePress={() => submit()}
        />
      </SafeAreaView>
    );
  }
}
