import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  RefreshControl,
} from "react-native";
import {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/home";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import {
  ImageButton,
  RoundedButton,
  VectorButton,
  FlatListButton,
} from "../components/button";
import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "../screens/ProfileScreen";
import SignupScreen from "../screens/SignupScreen";
import favouriteListArray from "../strings/favouritelist";
import React from "react";
import axios from "../components/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomAlert } from "../components/alert";
import biometricsAuth from "../services/biometricsAuth";
import {
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync,
} from "expo-local-authentication";
import { ProcessingModal } from "../components/modal";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { storeData } from "../services/storage";
import { IS_FIRST_TIME } from "../constants/values";

import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeAction";
import { lightTheme, darkTheme } from "../constants/theme";

import { TabNavigator } from "./ActivityScreen";
import CoinDetailedScreen from "./CoinDetailedScreen_copy/index";


//import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* export default function Home(){

    return(
        HomeScreen()
        
      )
} */

export default function HomeScreen({ navigation, route }) {
  const [id, setID] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [preferences, setPrefrences] = React.useState("");
  const [user, setUser] = React.useState({});
  const [token, setToken] = React.useState("");
  const [coins, setCoins] = React.useState([]);
  const [cryptoName, setCryptoName] = React.useState("");
  const [cryptoIcon, setCryptoIcon] = React.useState("");
  const [cryptoAmount, setCryptoAmount] = React.useState(0);
  const [priceChange, setPriceChange] = React.useState();
  const [usdAmount, setUsdAmount] = React.useState(0);
  const [walletOptions, setWalletOptions] = React.useState([
    { address: "", abb: "" },
  ]);
  const [fiatWallet, setFiatWallet] = React.useState("");
  const [refreshing, setRefreshing] = React.useState(false)
  const [cleanup, setCleanUp] = React.useState(0)
  // const [lastName, setLastName] = React.useState("")
  // const [lastName, setLastName] = React.useState("")
  // const [lastName, setLastName] = React.useState("")
  // const [lastName, setLastName] = React.useState("")

  const priceChangeColor = priceChange > 0 ? "#009E06" : "#C52020";
  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  storeData(IS_FIRST_TIME, "false");

  const favouriteList = ({ item }) => (
    <View style={styles.favouriteBaseContainer}>
      <TouchableOpacity
        style={[styles.favouriteButton, { backgroundColor: theme.flatlist }]}
      >
        <Ionicons
          name="star"
          size={12}
          color={Colors.primary}
          style={{ marginRight: 5 }}
        />
        <ImageButton
          image={item.icon}
          style={styles.cryptoimage}
          imageStyle={styles.cryptoimage}
        />
        <Text style={[styles.textButton, { color: theme.text }]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const holdingsList = ({ item }) => {
    // let coin = coins.filter(c => c.currency == item.abb)[0]
    return (
      <View style={styles.historyBaseContainer}>
        <TouchableOpacity
          style={[styles.holdingButton, { backgroundColor: theme.flatlist }]}
          onPress={() => {
            navigation.navigate(Strings.holdings, {
              coinId: item.name.toLowerCase(),
            });

            setCryptoName(item.name);
            setCryptoIcon(item.icon);
            setWalletOptions({ abb: item.abb });
          }}
        >
          <ImageButton
            image={item.icon}
            style={styles.holdingsCryptoimage}
            imageStyle={styles.holdingsCryptoimage}
          />
          <Text style={[styles.holdingsTextButton, { color: theme.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.holdingsValueButton, { color: theme.text }]}>
            0 {item.abb}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  React.useEffect(() => {
    async function fetchData() {
      let id = await AsyncStorage.getItem("user_id").then((value) => value);
      let token = await AsyncStorage.getItem("token").then((value) => value);

      setToken(token);
      axios
        .post("/user-gateway/get-full-user", { user_id: id })
        .then((data) => {
          // console.log(data.data)
          setID(data.data.user.id);
          setFirstName(data.data.user.first_name);
          setLastName(data.data.user.last_name);
          setPrefrences(data.data.user.prefrence[0]);
          setUser(data.data.user);
          setRefreshing(false)
          console.log(data.data.user);
          // axios
          //   .post(
          //     "https://clyp-crypto.herokuapp.com/crypto-gateway/get-coins",
          //     { user_id: id }
          //   )
          //   .then((coins_data) => {
          setCoins([{
            currency: "BTC",
            address: "btc-xxxxxxx"
          }, {
            currency: "USDT",
            address: "usdt-xxxxxxx"
          }, {
            currency: "ETH",
            address: "eth-xxxxxxx"
          }, {
            currency: "BNB",
            address: "bnb-xxxxxxx"
          }, {
            currency: "LTC",
            address: "ltc-xxxxxxx"
          }, {
            currency: "BTC",
            address: "btc-xxxxxxx"
          }]);
          // });

          axios
            .post("https://clyp-fiat.herokuapp.com/fiat-gateway/get-wallet", {
              user_id: id,
            })
            .then((wallet_data) => {
              setFiatWallet(wallet_data.data.wallet);
            });
        })
        .catch((err) => {
          setRefreshing(false)
          CustomAlert({
            title: "Error",
            subtitle: "Error making request, please try again..." + err,
            handlePress: () => { },
          });
          console.log({ err });
        });
    }
    navigation.addListener('focus', async () =>
      fetchData()
    )
    fetchData()
  }, [cleanup]);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Strings.home} component={HomeScreen} />
      <Stack.Screen name={Strings.holdings} component={HoldingsDetail} />
    </Stack.Navigator>
  );

  function HomeScreen() {
    const saveWidth = () => {
      storeData('tabWidth', "60")
    }
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
        onLayout={saveWidth()}>
        <StatusBar barStyle={theme.statusbar} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true)
                setCleanUp(cleanup + 1)

              }} />
          }>
          <View style={styles.topBar}>
            <ImageButton
              style={styles.profileImage}
              imageStyle={styles.profileImage}
              image={
                user.picture
                  ? user.picture
                  : "https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg"
              }
              handlePress={() => {
                navigation.navigate("Profile", {
                  id,
                  firstName,
                  lastName,
                  preferences,
                  user,
                });
                navigation.setOptions({ tabBarVisible: false });
              }}
            />
            <Text style={[styles.nameText, { color: theme.text }]}>
              Welcome {firstName}
            </Text>
            <VectorButton
              style={styles.notificationButton}
              name="notifications-outline"
              size={24}
              color={Colors.primary}
              handlePress={() => navigation.push(Strings.notifications)}
            />
            <VectorButton
              style={styles.scanButton}
              name="scan"
              size={24}
              color={Colors.primary}
              handlePress={() => navigation.navigate(Strings.qrcode, { token })}
            />
          </View>

          <ProcessingModal isVisible={false} />
          <Swiper
            style={styles.swiperContainer}
            activeDotColor={Colors.fadedButton}
          >
            <View style={styles.cryptoContainer}>
              <Text style={styles.balanceText}>{Strings.cryptoBalance}</Text>
              <Text style={styles.cryptoBalanceText}>
                {preferences.private_mode ? "*** BTC" : "0.0001 BTC"}
              </Text>

              <View style={styles.transactionOptions}>
                <View style={styles.columnContainer}>
                  <VectorButton
                    name="arrow-up"
                    size={18}
                    color={Colors.white}
                    style={styles.sendbutton}
                    handlePress={() =>
                      navigation.navigate(Strings.sendCrypto, {
                        coins: coins,
                        user,
                        wallet: fiatWallet,
                      })
                    }
                  />
                  <Text style={styles.optionText}>{Strings.send}</Text>
                </View>

                <View style={styles.othercolumnContainer}>
                  <VectorButton
                    name="arrow-down"
                    size={18}
                    color={Colors.white}
                    style={styles.receivebutton}
                    handlePress={() =>
                      navigation.navigate(Strings.receiveCrypto, {
                        coins: coins,
                        user,
                        wallet: fiatWallet,
                      })
                    }
                  />
                  <Text style={styles.optionText}>{Strings.receive}</Text>
                </View>

                <View style={styles.othercolumnContainer}>
                  <VectorButton
                    name="pricetag-outline"
                    size={18}
                    color={Colors.white}
                    style={styles.buybutton}
                    handlePress={() =>
                      navigation.navigate(Strings.buy, {
                        coins,
                        user,
                        wallet: fiatWallet,
                      })
                    }
                  />
                  <Text style={styles.optionText}>{Strings.buy}</Text>
                </View>

                <View style={styles.othercolumnContainer}>
                  <VectorButton
                    name="cash-outline"
                    size={18}
                    color={Colors.white}
                    style={styles.sellbutton}
                    handlePress={() =>
                      navigation.navigate(Strings.sell, {
                        coins,
                        user,
                        wallet: fiatWallet,
                      })
                    }
                  />
                  <Text style={styles.optionText}>{Strings.sell}</Text>
                </View>

                <View style={styles.othercolumnContainer}>
                  <VectorButton
                    name="swap-horizontal"
                    size={18}
                    color={Colors.white}
                    style={styles.swapbutton}
                    handlePress={() =>
                      navigation.navigate(Strings.swap, {
                        coins,
                        user,
                        wallet: fiatWallet,
                      })
                    }
                  />
                  <Text style={styles.optionText}>{Strings.swap}</Text>
                </View>
              </View>
            </View>

            <View style={styles.fiatContainer}>
              <Text style={styles.balanceText}>{Strings.fiatBalance}</Text>

              <Text style={styles.cryptoBalanceText}>
                {preferences.private_mode
                  ? "***"
                  : `N ${fiatWallet.available_balance
                    ? fiatWallet.available_balance
                      .toFixed(2)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                    : "0.00"
                  }`}
              </Text>

              <View style={styles.transactionOptions}>
                <View style={styles.columnContainer}>
                  <VectorButton
                    name="arrow-down"
                    size={20}
                    color={Colors.white}
                    style={styles.sendbutton}
                    handlePress={() =>
                      navigation.push(Strings.deposit, {
                        user,
                        wallet: fiatWallet,
                      })
                    }
                  />
                  <Text style={styles.optionText}>{Strings.deposit}</Text>
                </View>

                <View style={styles.othercolumnContainer}>
                  <VectorButton
                    name="arrow-up"
                    size={20}
                    color={Colors.white}
                    style={styles.receivebutton}
                    handlePress={() =>
                      navigation.push(Strings.withdraw, { user })
                    }
                  />
                  <Text style={styles.optionText}>{Strings.withdraw}</Text>
                </View>
              </View>
            </View>
          </Swiper>

          <View
            style={[
              styles.coinContainer,
              { backgroundColor: theme.backgroundColor },
            ]}
          >
            <Text style={[styles.coinText, { color: theme.text }]}>
              {Strings.favourite}
            </Text>
            <FlatList
              contentContainerStyle={styles.flatlist}
              data={favouriteListArray}
              renderItem={favouriteList}
              //numColumns={2}
              horizontal={true}
              keyExtractor={(item, id) => id}
            />
            {/*favouriteListArray.map(fav => favouriteList({item:fav}))*/}
          </View>

          <View
            style={[
              styles.coinContainer,
              { backgroundColor: theme.backgroundColor },
            ]}
          >
            <Text style={[styles.holdingText, { color: theme.text }]}>
              {Strings.holdings}
            </Text>
            <FlatList
              contentContainerStyle={styles.flatlist}
              data={favouriteListArray} //coins
              renderItem={holdingsList}
              //numColumns={2}
              keyExtractor={(item, id) => id}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  function HoldingsDetail() {
    const [transactions, setTransactions] = useState([]);

    const historyList = ({ item }) => {
      return (
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.list}>
            <VectorButton
              name={item.icon}
              size={15}
              style={styles.statusIcon}
              color={Colors.white}
            />
            <Text style={styles.time}>{item.createdAt}</Text>
            <Text style={styles.title}>
              {item.transaction_type.toUpperCase()}
            </Text>
            <Text style={styles.description} numberOfLines={1}>
              {item.transaction_type} {item.amount}
            </Text>
            <Text style={styles.date} numberOfLines={1}>
              {item.createdAt}
            </Text>
            <Text style={styles.status} numberOfLines={1}>
              {item.status}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.push(Strings.home)}
          />
          <View style={styles.holdingsRowContainer}>
            <Image
              style={styles.holdingsDetailImage}
              source={{ uri: cryptoIcon }}
            />
            <Text style={styles.holdingsCryptoName}>{walletOptions.abb}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.cryptoAbbreviationText}>{walletOptions.abb}</Text>
          <Text style={styles.cryptoAmountText} numberOfLines={1}>
            {cryptoAmount}
          </Text>
          <Text style={styles.usdAbbreviationText}>USD</Text>
          <Text style={styles.usdAmountText} numberOfLines={1}>
            {cryptoAmount}
          </Text>
          <Text
            style={[styles.priceChangeText, { color: priceChangeColor }]}
            numberOfLines={1}
          >
            {cryptoAmount}
          </Text>
          <Text style={[styles.todayText]} numberOfLines={1}>
            {cryptoAmount}
          </Text>
        </View>
        <View style={{ top: 120 }}>
          <CoinDetailedScreen coinId={cryptoName.toLowerCase()} />
        </View>

        <View style={styles.holdingsTransactionOptions}>
          <View style={styles.columnContainer}>
            <VectorButton
              name="arrow-up"
              size={18}
              color={Colors.white}
              style={styles.sendbutton}
              handlePress={() =>
                navigation.navigate(Strings.sendCrypto, { coins: coins })
              }
            />
            <Text style={styles.optionHoldingsText}>{Strings.send}</Text>
          </View>

          <View style={styles.othercolumnContainer}>
            <VectorButton
              name="arrow-down"
              size={18}
              color={Colors.white}
              style={styles.receivebutton}
              handlePress={() =>
                navigation.navigate(Strings.receiveCrypto, {
                  coins: coins,
                })
              }
            />
            <Text style={styles.optionHoldingsText}>{Strings.receive}</Text>
          </View>

          <View style={styles.othercolumnContainer}>
            <VectorButton
              name="pricetag-outline"
              size={18}
              color={Colors.white}
              style={styles.buybutton}
              handlePress={() =>
                navigation.navigate(Strings.buy, { coins: coins })
              }
            />
            <Text style={styles.optionHoldingsText}>{Strings.buy}</Text>
          </View>

          <View style={styles.othercolumnContainer}>
            <VectorButton
              name="cash-outline"
              size={18}
              color={Colors.white}
              style={styles.sellbutton}
              handlePress={() =>
                navigation.navigate(Strings.sell, { coins: coins })
              }
            />
            <Text style={styles.optionHoldingsText}>{Strings.sell}</Text>
          </View>

          <View style={styles.othercolumnContainer}>
            <VectorButton
              name="swap-horizontal"
              size={18}
              color={Colors.white}
              style={styles.swapbutton}
              handlePress={() =>
                navigation.navigate(Strings.swap, { coins: coins })
              }
            />
            <Text style={styles.optionHoldingsText}>{Strings.swap}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.historyText}>History</Text>

          <FlatList
            data={transactions}
            //ListHeaderComponent={renderHeader}
            renderItem={historyList}
          />
        </View>
      </SafeAreaView>
    );
  }
}
