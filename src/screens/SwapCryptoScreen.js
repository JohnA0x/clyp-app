import { React, useState, useCallback, useMemo, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import {
  FileImageButton,
  ImageButton,
  VectorButton,
  RoundedButton,
} from "../components/button";

import * as Strings from "../strings/strings";
import { styles } from "../styles/swap";
import { Ionicons } from "@expo/vector-icons";

import * as Colors from "../constants/colors";

import cryptoListArray from "../strings/cryptolist";
import cryptoDropDownArray from "../strings/cryptoDropdown";

import { SafeAreaView } from "react-native-safe-area-context";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";

import DropDownPicker from "react-native-dropdown-picker";
import { ProcessingModal } from "../components/modal";

import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

export default function SwapCryptoScreen({ navigation, route }) {
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoIcon, setCryptoIcon] = useState("");
  const [priceChange, setPriceChange] = useState("");
  const [walletOptions, setWalletOptions] = useState([
    { address: "hh", abb: "hh" },
  ]);

  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const [buttonColors, setButtonColors] = useState([
    {
      instantColor: Colors.primary,
      instantTextColor: Colors.white,
      swapColor: theme.background,
      swapTextColor: Colors.textColor,
    },
  ]);

  const [swipeIndex, setSwipeIndex] = useState(0);
  const [fromIndex, setFromIndex] = useState(0);

  //value for drop down
  const [fromInstantOpen, setFromInstantOpen] = useState(false);
  const [fromInstantOpenLimit, setFromInstantOpenLimit] = useState(false);

  const [fromInstantValue, setFromInstantValue] = useState(null);
  const [fromInstantValueLimit, setFromInstantValueLimit] = useState(null);

  const [toInstantOpen, setToInstantOpen] = useState(false);
  const [toInstantOpenLimit, setToInstantOpenLimit] = useState(false);

  const [toInstantValue, setToInstantValue] = useState(null);
  const [toInstantValueLimit, setToInstantValueLimit] = useState(null);

  const [fromInstantItems, setFromInstantItems] = useState(cryptoDropDownArray);
  const [fromInstantItemsLimit, setFromInstantItemsLimit] =
    useState(cryptoDropDownArray);

  const [toInstantItems, setToInstantItems] = useState(cryptoDropDownArray);
  const [toInstantItemsLimit, setToInstantItemsLimit] =
    useState(cryptoDropDownArray);
  // end of States

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={Strings.swap}
        initialParams={route}
        component={SwapList}
      />
      <Stack.Screen
        name="SwapCrypto"
        initialParams={route}
        component={SwapCrypto}
      />
    </Stack.Navigator>
  );

  function SwapList() {
    const sendCryptoList = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.list}
          onPress={() => {
            navigation.navigate("SwapCrypto");
            setCryptoName(item.name);
            setCryptoIcon(item.icon);
            setWalletOptions({ abb: item.abb });
            setButtonColorsDefault();
            setFromIndex(item.id);
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
            {Strings.swap}
          </Text>
        </View>

        <View style={[styles.flatlist, { backgroundColor: theme.flatlist }]}>
          <FlatList
            data={cryptoListArray}
            //ListHeaderComponent={renderHeader}
            renderItem={sendCryptoList}
          />
        </View>
      </SafeAreaView>
    );
  }

  function setButtonColorsDefault() {
    setButtonColors({
      instantColor: Colors.primary,
      instantTextColor: Colors.white,
      swapColor: theme.background,
      swapTextColor: theme.text,
    });
  }

  function SwapCrypto() {
    const [fromAmount, setFromAmount] = useState("");
    const [toAmount, setToAmount] = useState("");
    const [limit, setLimit] = useState();

    const [isVisible, setIsVisible] = useState(false);

    const swap = () => {
      setIsVisible(true);

      let data = {
        fromAmount,
        toAmount,
        limit,
        user_id: route.params.user.id,
      };
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
            handlePress={() => navigation.push(Strings.swap)}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.swap}
          </Text>
        </View>
        <Image source={{ uri: cryptoIcon }} style={styles.cryptoImage} />
        <Text style={[styles.cryptoName, { color: theme.text }]}>
          {cryptoName}
        </Text>
        <Text style={[styles.cryptoAmount, { color: theme.text }]}>
          0.02 {walletOptions.abb}
        </Text>

        <View style={styles.buttonView}>
          <RoundedButton
            style={[
              styles.instantRoundedButton,
              { backgroundColor: buttonColors.instantColor },
            ]}
            text="Instant"
            textStyle={[
              styles.roundedText,
              { color: buttonColors.instantTextColor },
            ]}
            handlePress={() => {
              setButtonColors({
                instantColor: theme.primary,
                swapColor: theme.background,
                instantTextColor: Colors.white,
                swapTextColor: theme.text,
              });
              setSwipeIndex(0);
            }}
          />

          <RoundedButton
            style={[
              styles.limitRoundedButton,
              { backgroundColor: buttonColors.swapColor },
            ]}
            text="Limit"
            textStyle={[
              styles.roundedText,
              { color: buttonColors.swapTextColor },
            ]}
            handlePress={() => {
              setButtonColors({
                instantColor: theme.background,
                swapColor: theme.primary,
                instantTextColor: theme.text,
                swapTextColor: Colors.white,
              });
              setSwipeIndex(1);
            }}
          />
        </View>

        <Swiper
          style={styles.swiperContainer}
          activeDotColor="transparent"
          index={swipeIndex}
          loop={false}
          scrollEnabled={false}
          dotColor="transparent"
        >
          {/* Instant Screen*/}
          <ScrollView>
            <View
              style={[styles.fromView, { backgroundColor: theme.flatlist }]}
            >
              <TextInput
                style={styles.fromValue}
                keyboardType="numeric"
                numberOfLines={1}
                maxLength={12}
                placeholder="Amount"
                placeholderTextColor={theme.label}
                selectionColor={Colors.primary}
                onChangeText={(text) => {
                  setFromAmount(text);
                }}
              ></TextInput>
              <Text style={[styles.fromDollarValue, { color: theme.text }]}>
                $0.00
              </Text>
              <Text style={styles.maxValue}>MAX</Text>

              <View style={styles.lineCrosser} />

              <DropDownPicker
                style={styles.dropDownFromPicker}
                index={fromIndex}
                dropDownContainerStyle={styles.dropDownFromContainerPicker}
                zIndex={600}
                dropDownDirection="AUTO"
                stickyHeader={true}
                open={fromInstantOpen}
                value={fromIndex}
                items={fromInstantItems}
                disabled={true}
                setOpen={setFromInstantOpen}
                setValue={setFromInstantValue}
                setItems={setFromInstantItems}
                placeholder="Coin"
                textStyle={{ color: theme.primary, fontWeight: "bold" }}
              />
              <Text
                style={[styles.balanceText, { color: theme.text }]}
                numberOfLines={1}
              >
                Balance: 0.00
              </Text>
            </View>

            <View style={[styles.toView, { backgroundColor: theme.flatlist }]}>
              <TextInput
                style={styles.fromValue}
                keyboardType="numeric"
                numberOfLines={1}
                maxLength={12}
                placeholder="Amount"
                placeholderTextColor={theme.label}
                selectionColor={Colors.primary}
                onChangeText={(text) => {
                  setToAmount(text);
                }}
              ></TextInput>
              <Text style={[styles.fromDollarValue, { color: theme.text }]}>
                $0.00
              </Text>
              <Text style={styles.maxValue}>MAX</Text>

              <View style={styles.lineCrosser} />

              <DropDownPicker
                style={styles.dropDownToPicker}
                dropDownContainerStyle={styles.dropDownToContainerPicker}
                zIndex={6000}
                stickyHeader={true}
                open={toInstantOpen}
                value={toInstantValue}
                items={toInstantItems}
                setOpen={setToInstantOpen}
                setValue={setToInstantValue}
                setItems={setToInstantItems}
                textStyle={{ color: theme.primary, fontWeight: "bold" }}
                placeholder="Coin"
                placeholderStyle={{
                  color: theme.primary,
                  fontWeight: "bold",
                }}
              />
              <Text
                style={[styles.balanceText, { color: theme.text }]}
                numberOfLines={1}
              >
                Balance: 0.00
              </Text>
            </View>

            <RoundedButton
              style={[styles.swapButton]}
              text={Strings.swap}
              textStyle={styles.swapText}
              handlePress={() => alert("Swap Successful")}
            />
          </ScrollView>

          {/* Limit Screen*/}
          <ScrollView>
            <View
              style={[styles.fromView, { backgroundColor: theme.flatlist }]}
            >
              <TextInput
                style={styles.fromValue}
                keyboardType="numeric"
                numberOfLines={1}
                maxLength={12}
                placeholder="Amount"
                placeholderTextColor={theme.label}
                selectionColor={Colors.primary}
                onChangeText={(text) => {
                  setFromAmount(text);
                }}
              ></TextInput>
              <Text style={[styles.fromDollarValue, { color: theme.text }]}>
                $0.00
              </Text>
              <Text style={styles.maxValue}>MAX</Text>

              <View style={styles.lineCrosser} />

              <DropDownPicker
                style={styles.dropDownFromPicker}
                index={fromIndex}
                dropDownContainerStyle={styles.dropDownFromContainerPicker}
                zIndex={600}
                dropDownDirection="AUTO"
                stickyHeader={true}
                open={fromInstantOpenLimit}
                value={fromIndex}
                items={fromInstantItemsLimit}
                setOpen={setFromInstantOpen}
                setValue={setFromInstantValue}
                setItems={setFromInstantItems}
                placeholder="Coin"
                placeholderStyle={{
                  color: theme.primary,
                  fontWeight: "bold",
                }}
                textStyle={{ color: theme.primary, fontWeight: "bold" }}
              />
              <Text
                style={[styles.balanceText, { color: theme.text }]}
                numberOfLines={1}
              >
                Balance: 0.00
              </Text>
            </View>

            <View style={[styles.toView, { backgroundColor: theme.flatlist }]}>
              <TextInput
                style={styles.fromValue}
                keyboardType="numeric"
                numberOfLines={1}
                maxLength={12}
                placeholder="Amount"
                placeholderTextColor={theme.label}
                selectionColor={Colors.primary}
                onChangeText={(text) => {
                  setToAmount(text);
                }}
              ></TextInput>
              <Text style={[styles.fromDollarValue, { color: theme.text }]}>
                $0.00
              </Text>
              <Text style={styles.maxValue}>MAX</Text>

              <View style={styles.lineCrosser} />

              <DropDownPicker
                style={styles.dropDownToPicker}
                dropDownContainerStyle={styles.dropDownToContainerPicker}
                zIndex={200}
                open={toInstantOpenLimit}
                value={toInstantValueLimit}
                items={toInstantItemsLimit}
                setOpen={setToInstantOpen}
                setValue={setToInstantValue}
                setItems={setToInstantItems}
                placeholder="Coin"
                placeholderStyle={{
                  color: theme.primary,
                  fontWeight: "bold",
                }}
                textStyle={{ color: theme.primary, fontWeight: "bold" }}
              />
              <Text
                style={[styles.balanceText, { color: theme.text }]}
                numberOfLines={1}
              >
                Balance: 0.00
              </Text>
            </View>

            <TextInput
              style={[styles.priceInput, { backgroundColor: theme.textinput }]}
              placeholder="Set limit price"
              placeholderTextColor={theme.label}
              onChangeText={(text) => {
                setLimit(text);
              }}
            />

            <RoundedButton
              style={styles.swapButton}
              text={Strings.swap}
              textStyle={styles.swapText}
              handlePress={() => alert("Swap Successful")}
            />
          </ScrollView>
        </Swiper>
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }
}
