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

const Stack = createNativeStackNavigator();

export default function SellCryptoScreen({ navigation, route }) {
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoIcon, setCryptoIcon] = useState("");
  const [walletOptions, setWalletOptions] = useState([
    { address: "hh", abb: "hh" },
  ]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="buylist" component={SellCryptoList} />
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
          <Text style={styles.valueText}>{item.value}</Text>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );

    // This renders some components and the flatlist together
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
          <Text style={styles.headerText}>{Strings.sell}</Text>
        </View>

        <View style={styles.flatlist}>
          <FlatList
            data={cryptoListArray}
            //ListHeaderComponent={renderHeader}
            renderItem={sellCryptoList}
          />
        </View>
      </SafeAreaView>
    );
  }
}
