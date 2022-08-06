import { React, useState, useCallback, useMemo, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
  TextInput
} from "react-native";
import {
  FileImageButton,
  ImageButton,
  VectorButton,
  RoundedButton,
} from "../components/button";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Strings from "../strings/strings";
import { styles } from "../styles/info";
import { Ionicons } from "@expo/vector-icons";

import * as Colors from "../constants/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import cryptoListArray from "../strings/cryptolist";

import {
  BottomSheet,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import { ChartDot, ChartPath, ChartPathProvider, monotoneCubicInterpolation } from "@rainbow-me/animated-charts";
import CoinItem from "../components/CoinItem/index";
import { getMarketData } from "../services/requests";
import CoinDetailedScreen from "./CoinDetailedScreen/index";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function InfoScreen({ navigation }) {
  const [priceChange, setPriceChange] = useState();
  const [cryptoName, setCryptoName] = useState("");
  const [isFavourited, setisFavourited] = useState(false);
  const [walletOptions, setWalletOptions] = useState([
    { address: "hh", abb: "hh" },
  ]);

  const priceChangeColor = priceChange > 0 ? "#009E06" : "#C52020";
  const isFavouritedIcon = isFavourited === true ? "star" : "star-outline";

  // ref
  const bottomSheetModalRef = useRef();

  // variables
  const snapPoints = useMemo(() => ["25%", "90%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          backgroundColor: Colors.backgroundColor,
        }}
      >
        <Stack.Screen name="Tabs" component={TabNavigator} />
        <Stack.Screen name="Stats" component={CoinDetailedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  function TabNavigator() {
    return (
      <SafeAreaView style={styles.container}>
         <View>
        <Text style={styles.headerText}>{Strings.coinStats}</Text>
      </View>
        <View style={styles.summaryContainer}>
          <Text style={styles.marketCapText}>Market Cap</Text>
          <Text style={styles.marketCapValueText}>$1,063,703,175,775</Text>
          <Text style={styles.marketCapMovementText}>+0%</Text>
          <Text style={styles.volume24hText}>Volume 24h</Text>
          <Text style={styles.volume24hValueText}>$97,104,936,866</Text>
          <Text style={styles.volume24hMovementText}>+0%</Text>
        </View>

        <Tab.Navigator
          tabBarOptions={{
            style: styles.tabBar,
            labelStyle: { fontSize: 12 },
            //   activeTintColor:Colors.primary,
            //tabStyle: {backgroundColor: Colors.backgroundColor },
            indicatorStyle: { backgroundColor: Colors.primary },
          }}
        >
          <Tab.Screen name="Cryptocurrencies" component={Cryptocurrencies} />
          <Tab.Screen name="Favourites" component={Favourites} />
        </Tab.Navigator>
      </SafeAreaView>
    );
  }

  function Cryptocurrencies({ navigation }) {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCoins = async (pageNumber) => {
      if (loading) {
        return;
      }
      setLoading(true);
      const coinsData = await getMarketData(pageNumber);
      setCoins((existingCoins) => [...existingCoins, ...coinsData]);
      setLoading(false);
    };

    const refetchCoins = async () => {
      if (loading) {
        return;
      }
      setLoading(true);
      const coinsData = await getMarketData();
      setCoins(coinsData);
      setLoading(false);
    };

    useEffect(() => {
      fetchCoins();
    }, []);


    const cryptocurrenciesList = ({ item }) => {
      return (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.button}
          // onPress={() => navigation.navigate()}
          >
            <Ionicons
              name={isFavouritedIcon}
              size={12}
              color={Colors.primary}
              onPress={setisFavourited(true)}
            />
            <ImageButton image={item.icon} imageStyle={styles.cryptoImage} />
            <Text style={styles.cryptoText}>{item.name}</Text>
            <Text
              style={[styles.cryptoChangeText, { color: priceChangeColor }]}
            >
              {priceChange}%
            </Text>
            <Text style={styles.cryptoPriceText} numberOfLines={1}>
              1000000
            </Text>
            <Text style={styles.cryptoMarketCapText} numberOfLines={1}>
              $2.4 million
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.nameinfoOptions}>{Strings.name}</Text>
            <Text style={styles.infoOptions}>{Strings.change}</Text>
            <Text style={styles.infoOptions}>{Strings.price}</Text>
            <Text style={styles.infoOptions}>{Strings.marketCap}</Text>
          </View>
          {/* <FlatList
            contentContainerStyle={styles.flatlist}
            //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
            data={cryptoListArray}
            renderItem={cryptocurrenciesList}
            keyExtractor={(item) => item.id}
          /> */}

          <FlatList
            data={coins}
            renderItem={({ item }) => <CoinItem marketCoin={item} />}
            onEndReached={() => fetchCoins(coins.length / 50 + 1)}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                tintColor="white"
                onRefresh={refetchCoins}
              />
            }
          />

        </SafeAreaView>
      </BottomSheetModalProvider>
    );
  }

  function Favourites() {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCoins = async (pageNumber) => {
      if (loading) {
        return;
      }
      setLoading(true);
      const coinsData = await getMarketData(pageNumber);
      setCoins((existingCoins) => [...existingCoins, ...coinsData]);
      setLoading(false);
    };

    const refetchCoins = async () => {
      if (loading) {
        return;
      }
      setLoading(true);
      const coinsData = await getMarketData();
      setCoins(coinsData);
      setLoading(false);
    };

    useEffect(() => {
      fetchCoins();
    }, []);
    
    const cryptocurrenciesList = ({ item }) => {
      return (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.button}
          // onPress={() => navigation.navigate()}
          >
            <Ionicons
              name={isFavouritedIcon}
              size={12}
              color={Colors.primary}
            />
            <ImageButton image={item.icon} imageStyle={styles.cryptoImage} />
            <Text style={styles.cryptoText}>{item.name}</Text>
            <Text
              style={[styles.cryptoChangeText, { color: priceChangeColor }]}
            >
              {priceChange}%
            </Text>
            <Text style={styles.cryptoPriceText} numberOfLines={1}>
              1000000
            </Text>
            <Text style={styles.cryptoMarketCapText} numberOfLines={1}>
              $2.4 million
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <Text>Favourites</Text>
        <FlatList
            data={coins}
            renderItem={({ item }) => <CoinItem marketCoin={item} />}
            onEndReached={() => fetchCoins(coins.length / 50 + 1)}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                tintColor="white"
                onRefresh={refetchCoins}
              />
            }
          />
      </SafeAreaView>
    );
  }

  function CryptoStats({ navigation }) {
    // renders
    return (
      <SafeAreaView style={styles.cryptoStatsContainer}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("Tabs")}
          />
          <Text style={styles.headerText}>{Strings.coinStats}</Text>
        </View>
        <CoinDetailedScreen/>
        {/* <Image />
        <Text style={styles.statsCryptoName}>Bitcoin</Text>
        <Text style={styles.statsCryptoName}>$24, 000</Text> */}
      </SafeAreaView>
    );
  }
}
