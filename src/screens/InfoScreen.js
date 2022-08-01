import { React, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  FileImageButton,
  ImageButton,
  VectorButton,
} from "../components/button";

import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Strings from "../strings/strings";
import { styles } from "../styles/info";
import {Ionicons} from '@expo/vector-icons';

import * as Colors from "../constants/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import cryptoListArray from "../strings/cryptolist";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function InfoScreen({ navigation }) {
  const [priceChange, setPriceChange] = useState();
  const [isFavourited, setisFavourited] = useState(false);
  const [walletOptions, setWalletOptions] = useState([
    { address: "hh", abb: "hh" },
  ]);

  const priceChangeColor = priceChange > 0 ? "#009E06" : "#C52020";
  const isFavouritedIcon = isFavourited === true ? 'star' : 'star-outline';

  return (
    <SafeAreaView style={styles.container}>
     {/*  <Stack.Navigator
       screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='Statistics' component={Statistics} />
        <Stack.Screen name={Strings.coinStats} component={CryptoData} />
      </Stack.Navigator> */}
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


  

  function Statistics(){
    return (
      <SafeAreaView style={styles.container}>
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

  function Cryptocurrencies() {
    const cryptocurrenciesList = ({ item }) => {
      return (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate()}
          >
            <Ionicons name={isFavouritedIcon} size={12} color={Colors.primary}
            onPress={setisFavourited(true)}/>
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
        <View style={styles.infoContainer}>
          <Text style={styles.nameinfoOptions}>{Strings.name}</Text>
          <Text style={styles.infoOptions}>{Strings.change}</Text>
          <Text style={styles.infoOptions}>{Strings.price}</Text>
          <Text style={styles.infoOptions}>{Strings.marketCap}</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.flatlist}
          //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
          data={cryptoListArray}
          renderItem={cryptocurrenciesList}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }

  function Favourites() {

    const cryptocurrenciesList = ({ item }) => {
      return (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate()}
          >
            <Ionicons name={isFavouritedIcon} size={12} color={Colors.primary} />
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
         contentContainerStyle={styles.flatlist}
         //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
         data={cryptoListArray}
         renderItem={cryptocurrenciesList}
         keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }

  function CryptoData() {
    return (
      <SafeAreaView>
        <View style={styles.summaryContainer}>
          <Text style={styles.marketCapText}>Market Cap</Text>
          <Text style={styles.marketCapValueText}>$1,063,703,175,775</Text>
          <Text style={styles.marketCapMovementText}>+0%</Text>
          <Text style={styles.volume24hText}>Volume 24h</Text>
          <Text style={styles.volume24hValueText}>$97,104,936,866</Text>
          <Text style={styles.volume24hMovementText}>+0%</Text>
        </View>
      </SafeAreaView>
    );
  }
}
