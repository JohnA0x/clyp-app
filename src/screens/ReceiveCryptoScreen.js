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
import { styles } from "../styles/receivecrypto";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import { cryptoListArray } from "../strings/cryptolist";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DropDownPicker from "react-native-dropdown-picker";
import { CustomModal } from "../components/modal";

import QRCode from "react-native-qrcode-svg";

export default function ReceiveCryptoScreen({ navigation, route }) {
  const [query, setQuery] = useState("");
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoIcon, setCryptoIcon] = useState("");
  const [walletOptions, setWalletOptions] = useState([
    { address: "hh", abb: "hh" },
  ]);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const ReceiveStack = createNativeStackNavigator();

  return (
    <ReceiveStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ReceiveStack.Screen
        name={Strings.receiveCrypto}
        component={ReceiveCryptoList}
      />
      <ReceiveStack.Screen name="receiveoptions" component={ReceiveOptions} />
    </ReceiveStack.Navigator>
  );

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}
        />
      </View>
    );
  }

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(cryptoListArray, (crypto) => {
      return contains(crypto, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };

  const contains = ({ name }, query) => {
    if (name.includes(query)) {
      return true;
    }

    return false;
  };

  // When a crypto is clicked from the list, it takes you to the send options screen
  function ReceiveOptions() {
    const navigation = useNavigation();
    // function specific states
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
    ]);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
    const coin = route.params.coins.filter(c => c.currency == walletOptions)[0]
    console.log(coin)
    return (
      <SafeAreaView style={styles.container}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.optionsbackButton}
          handlePress={() => navigation.navigate(Strings.receiveCrypto)}
        />
        <Text style={styles.optionHeaderText}>Receive {cryptoName}</Text>
        <Text style={styles.optionSubtitleText}>
          Add Crypto to your Clyp Wallet
        </Text>
        <Image style={styles.optionsimage} source={{ uri: cryptoIcon }} />

        <View style={styles.qrcode}>
          <QRCode
            value={coin.address}
            color={Colors.qrcode}
            backgroundColor={Colors.backgroundColor}
            size={Dimensions.get("window").width / 2.3}
          //logo={require('../../../embed_logo_file_path')} // or logo={{uri: base64logo}}
          // logoMargin={2}
          // logoSize={20}
          //logoBorderRadius={10}
          //logoBackgroundColor={'transparent'}
          />
        </View>

        <View style={styles.detailsScreen}>
          <Text style={styles.networkText}>{Strings.network}</Text>
          <Text style={styles.addressText}>{coin.address}</Text>
          <Text style={styles.networkValueText}>ERC-20</Text>
          <Text style={styles.addressValueText} numberOfLines={1}>
            {coin.address}
          </Text>
        </View>

        <CustomModal isVisible={isModalVisible} />
        <RoundedButton
          text="Copy Address"
          textStyle={styles.textButton}
          style={styles.button}
          handlePress={toggleModal}
        />
        <CustomModal isVisible={isModalVisible} />
        <RoundedButton text={'Copy Address'} textStyle={styles.textButton} title=""
          style={styles.button} handlePress={toggleModal} />

        {/*     <DropDownPicker
          style={styles.dropdown}
            open={open}
            value={value}
            items={network}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          /> */}
      </SafeAreaView>
    );
  }

  // Screen for crypto list, the first screen is shown when you click on the
  // send button
  function ReceiveCryptoList() {
    const navigation = useNavigation();

    const receiveCryptoList = ({ item }) => {
      let coin = route.params.coins.filter(c => c.currency == item.abb)[0]
      return (
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.list}
            onPress={() => {
              navigation.navigate("receiveoptions", {coin});
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
      )

    }

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
          <Text style={styles.headerText}>{Strings.receiveCrypto}</Text>
        </View>

        <View style={styles.flatlist}>
          <FlatList
            data={cryptoListArray}
            //ListHeaderComponent={renderHeader}
            renderItem={receiveCryptoList}
          />
        </View>
      </SafeAreaView>
    );
  }
}
