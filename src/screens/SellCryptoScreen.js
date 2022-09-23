import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import filter from "lodash.filter";
import { ImageButton, RoundedButton, VectorButton } from "../components/button";
import { styles } from "../styles/buycrypto";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import { cryptoListArray } from "../strings/cryptolist";
import { buyOptionsListArray } from "../strings/buyoptionslist";
import { debitCardListArray } from "../strings/debitcardslist";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Ionicons } from "@expo/vector-icons";
import sellOptionsListArray from "../strings/selloptionslist";

import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

export default function SellCryptoScreen({ navigation, route }) {
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoIcon, setCryptoIcon] = useState("");
  const [walletOptions, setWalletOptions] = useState([
    { address: "hh", abb: "hh" },
  ]);

  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="selllist" component={SellCryptoList} />
      <Stack.Screen name="selloptions" component={SellOptions} />
      <Stack.Screen name={Strings.sellNowTitle} component={SellNow} />
    </Stack.Navigator>
  );

  function SellCryptoList() {
    const navigation = useNavigation();

    const sellCryptoList = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.list}
          onPress={() => {
            navigation.navigate("selloptions");
            setCryptoName(item.name);
            setCryptoIcon(item.icon);
            setWalletOptions({ abb: item.abb });
          }}
        >
          <Image source={{ uri: item.icon }} style={styles.image} />
          <Text style={[styles.valueText, { color: theme.text }]}>
            {item.value}
          </Text>
          <Text style={[styles.text, { color: theme.text }]}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );

    // This renders some components and the flatlist together
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
            handlePress={() => navigation.navigate(Strings.home)}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.sell}
          </Text>
        </View>

        <View style={[styles.flatlist, { backgroundColor: theme.coinlist }]}>
          <FlatList
            data={cryptoListArray}
            //ListHeaderComponent={renderHeader}
            renderItem={sellCryptoList}
          />
        </View>
      </SafeAreaView>
    );
  }

  function SellOptions() {
    const sellOptionsList = ({ item }) => {
      return (
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.flatlist }]}
            onPress={() => navigation.navigate(item.title)}
          >
            <VectorButton
              name={item.icon}
              size={24}
              color={Colors.primary}
              style={styles.preferencesimage}
            />
            <Text style={[styles.preferencestext, { color: theme.text }]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

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
            handlePress={() => navigation.navigate("selllist")}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>{Strings.sell}</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.buyOptionsFlatlist}
          //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
          data={sellOptionsListArray}
          renderItem={sellOptionsList}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }

  function SellNow() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("selloptions")}
          />
          <Text style={[styles.headerText, {color: theme.text}]}>{Strings.sell}</Text>
        </View>

        <View style={styles.walletBalanceContainer}>
          <Text style={styles.walletBalanceText}>Wallet Balance</Text>
          <Text style={styles.walletBalanceValueText}>
            N{" "}
            {route.params.wallet.available_balance
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </Text>
        </View>

        <View style={styles.transactionCryptoContainer}>
          <Image style={styles.cryptoImage} source={{ uri: cryptoIcon }} />
          <Text style={[styles.cryptoText, {color: theme.text}]}>{cryptoName}</Text>
        </View>

        <View style={styles.transactionAmountContainer}>
          <Text style={[styles.amountText, {color: theme.text}]}>Amount:</Text>
          <TextInput
            style={styles.amountValueText}
            keyboardType="numeric"
            numberOfLines={1}
            maxLength={12}
            placeholder="Amount"
            placeholderTextColor={theme.textinput}
            selectionColor={Colors.primary}
          ></TextInput>
          <Text style={styles.amountMaxValue}>Max</Text>
        </View>

        <View style={styles.lineCrosser} />
        <Text style={[styles.receiveAmount, {color: theme.text}]}>
          You will receive N20,000 in Naira
        </Text>
        <Text style={[styles.conversionAmount, {color: theme.text}]}>1 BTC = $23,000</Text>
        <RoundedButton
          style={styles.depositButton}
          text={Strings.sell + " " + walletOptions.abb}
          textStyle={styles.depositText}
        />
      </SafeAreaView>
    );
  }
}
