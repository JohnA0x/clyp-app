import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Strings from "../strings/strings";
import { styles } from "../styles/info";

import * as Colors from "../constants/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

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
  return <SafeAreaView style={styles.container}>
    <Text>Cryptocurrenices</Text>
  </SafeAreaView>;
}

function Favourites() {
  return <SafeAreaView style={styles.container}>
    <Text>Favourites</Text>
  </SafeAreaView>;
}
