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

import * as Colors from "../constants/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import cryptoListArray from "../strings/cryptolist";

const Tab = createMaterialTopTabNavigator();
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function InfoScreen() {
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
        <TouchableOpacity style={styles.button}>
          <ImageButton image={item.icon} imageStyle={styles.cryptoImage} />
          <Text style={styles.cryptoText}>{item.name}</Text>
          <Text style={styles.cryptoChangeText}>100%</Text>
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
  return (
    <SafeAreaView style={styles.container}>
      <Text>Favourites</Text>
      <FlatList />
    </SafeAreaView>
  );
}
