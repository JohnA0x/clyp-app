import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import filter from "lodash.filter";
import { ImageButton, RoundedButton, VectorButton } from "../components/button";
import { styles } from "../styles/sendcrypto";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import { cryptoListArray } from "../strings/cryptolist";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DropDownPicker from "react-native-dropdown-picker";
import { CustomModal } from "../components/modal";

export default function SendCryptoScreen({ navigation }) {
  // States
  const [query, setQuery] = useState("");
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoIcon, setCryptoIcon] = useState("");
  const [walletOptions, setWalletOptions] = useState([{address: "hh", 
  abb: "hh"}]);
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const SendStack = createNativeStackNavigator();

  return (
    <SendStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SendStack.Screen name={Strings.sendCrypto} component={SendCryptoList} />
      <SendStack.Screen name="sendoptions" component={SendOptions} />
    </SendStack.Navigator>
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
  function SendOptions() {
    const navigation = useNavigation();
    // function specific states
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'}
    ]);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    return (
      <SafeAreaView style={styles.container}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.optionsbackButton}
          handlePress={() => navigation.navigate(Strings.sendCrypto)}
        />
        <Text style={styles.optionHeaderText}>Send {cryptoName}</Text>
        <Text style={styles.optionSubtitleText}>
          Transfer Crypto from your Clyp Wallet
        </Text>
        <Image style={styles.optionsimage} source={{ uri: cryptoIcon }} />

        <TextInput
            style={styles.walletAddressInput}
            placeholder={Strings.walletAddress}
            selectionColor={Colors.primary}
          />
          <TextInput
            style={styles.otherTextInputs}
            placeholder={Strings.walletName}
            selectionColor={Colors.primary}
          />
          <TextInput
            style={styles.otherTextInputs}
            placeholder={Strings.selectNetwork}
            selectionColor={Colors.primary}
          />
          <TextInput
            style={styles.otherTextInputs}
            placeholder={Strings.enterAmount}
            selectionColor={Colors.primary}
            keyboardType='numeric'
          />

          <CustomModal isVisible = {isModalVisible}/>
          <RoundedButton text = {'Send ' + walletOptions.abb} textStyle = {styles.textButton} 
          style = {styles.button} handlePress = {toggleModal}/>
       
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
  function SendCryptoList() {
    const navigation = useNavigation();

    const sendCryptoList = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.list}
          onPress={() => {
            navigation.push("sendoptions");
            setCryptoName(item.name);
            setCryptoIcon(item.icon);
            setWalletOptions({abb: item.abb})
           
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
          <Text style={styles.headerText}>{Strings.sendCrypto}</Text>
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
}
