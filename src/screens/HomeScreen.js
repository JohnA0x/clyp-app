import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
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
import ProfileScreen from "../screens/ProfileScreen";
import SignupScreen from "../screens/SignupScreen";
import favouriteListArray from "../strings/favouritelist";
import React from "react";
import axios from "../components/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomAlert } from "../components/alert";

//import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* export default function Home(){

    return(
        HomeScreen()
        
      )
} */

export default function HomeScreen({ navigation }) {

  const [firstName, setFirstName] = React.useState("")

  const favouriteList = ({ item }) => (
    <View style={styles.favouriteBaseContainer}>
      <TouchableOpacity
        style={styles.favouriteButton}
        onPress={() => navigation.push(item.name)}
      >
        <ImageButton image={item.icon} style={styles.cryptoimage}
          imageStyle={styles.cryptoimage} />
        <Text style={styles.textButton}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  const holdingsList = ({ item }) => (
    <View style={styles.historyBaseContainer}>
      <TouchableOpacity
        style={styles.holdingButton}
        onPress={() => navigation.push(item.name)}
      >
        <ImageButton image={item.icon} style={styles.cryptoimage}
          imageStyle={styles.cryptoimage} />
        <Text style={styles.textButton}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  React.useEffect(async () => {

    // async function fetchData() {
      let id = await AsyncStorage.getItem("user_id").then(value => value)

      let token = await AsyncStorage.getItem("token").then(value => value)

      // console.log(token) ${token}
      axios.defaults.headers.common = {'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiIsImlhdCI6MTY1ODg5Mzk2MX0.zulb3Di4DawQVzKBlj5GJKg6L8DtpBWe34quxV45KFE`}

      axios.get('/user-gateway/get-user', { user_id: "75893e5c-e5bb-4a9c-962f-e4e91274e330" }, {headers: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiIsImlhdCI6MTY1ODg5Mzk2MX0.zulb3Di4DawQVzKBlj5GJKg6L8DtpBWe34quxV45KFE"} )
        .then(data => {
          console.log(data.data)
          setFirstName(data.data.user.first_name)
        })
        .catch(err => {
          CustomAlert({ title: "Error", subtitle: "Error making request, please try again...", handlePress: () => { } })
          console.log({ err })
        })
    // }
    // fetchData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <ImageButton
          style={styles.profileImage}
          imageStyle={styles.profileImage}
          image="https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg"
          handlePress={() => {
            navigation.push("Profile");
            navigation.setOptions({ tabBarVisible: false });
          }}
        />
        <Text style={styles.nameText}>Welcome {firstName}</Text>
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
          handlePress={() => navigation.push(Strings.qrcode)}
        />
      </View>

      <Swiper activeDotColor={Colors.fadedButton}>
        <View style={styles.cryptoContainer}>
          <Text style={styles.balanceText}>{Strings.cryptoBalance}</Text>
          <Text style={styles.cryptoBalanceText}>0.0001 BTC</Text>

          <View style={styles.transactionOptions}>
            <VectorButton
              name="arrow-up"
              size={20}
              color={Colors.white}
              style={styles.sendbutton}
              handlePress={() => navigation.push(Strings.sendCrypto)}
            />
            <VectorButton
              name="arrow-down"
              size={20}
              color={Colors.white}
              style={styles.receivebutton}
              handlePress={() => navigation.push(Strings.receiveCrypto)}
            />
            <VectorButton
              name="swap-horizontal"
              size={20}
              color={Colors.white}
              style={styles.swapbutton}
            />
          </View>
        </View>

        <View style={styles.fiatContainer}>
          <Text style={styles.balanceText}>{Strings.fiatBalance}</Text>
          <Text style={styles.cryptoBalanceText}>N 35,000</Text>

          <View style={styles.transactionOptions}>
            <VectorButton
              name="arrow-up"
              size={20}
              color={Colors.white}
              style={styles.sendbutton}
            />
            <VectorButton
              name="arrow-down"
              size={20}
              color={Colors.white}
              style={styles.receivebutton}
            />
          </View>
        </View>
      </Swiper>

      <View style={styles.coinContainer}>
        <Text style={styles.coinText}>{Strings.favourite}</Text>
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={favouriteListArray}
          renderItem={favouriteList}
          //numColumns={2}
          horizontal={true}
          keyExtractor={(item, id) => id}
        />
      </View>

      <View style={styles.coinContainer}>
        <Text style={styles.holdingText}>{Strings.holdings}</Text>
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={favouriteListArray}
          renderItem={holdingsList}
          //numColumns={2}
          keyExtractor={(item, id) => id}
        />
      </View>
    </SafeAreaView>
  );
}

//export default HomeScreen
