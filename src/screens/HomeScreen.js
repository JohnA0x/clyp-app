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

  const [id, setID] = React.useState("")
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [preferences, setPrefrences]  = React.useState("")
  const [user, setUser] = React.useState({})
  const [token, setToken] = React.useState("")
  // const [lastName, setLastName] = React.useState("")
  // const [lastName, setLastName] = React.useState("")
  // const [lastName, setLastName] = React.useState("")
  // const [lastName, setLastName] = React.useState("")

  const favouriteList = ({ item }) => (
    <View style={styles.favouriteBaseContainer}>
      <TouchableOpacity
        style={styles.favouriteButton}
        onPress={() => navigation.push(item.name)}
      >
        <ImageButton
          image={item.icon}
          style={styles.cryptoimage}
          imageStyle={styles.cryptoimage}
        />
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
        <ImageButton
          image={item.icon}
          style={styles.holdingsCryptoimage}
          imageStyle={styles.holdingsCryptoimage}
        />
        <Text style={styles.holdingsTextButton}>{item.name}</Text>
        <Text style={styles.holdingsValueButton}>0 {item.abb}</Text>
      </TouchableOpacity>
    </View>
  );

  React.useEffect(() => {

    async function fetchData() {
      let id = await AsyncStorage.getItem("user_id").then(value => value)
      let token = await AsyncStorage.getItem("token").then(value => value)

      setToken(token)
      axios.post('/user-gateway/get-full-user', { user_id: id } )
        .then(data => {
          // console.log(data.data)
          setID(data.data.user.id)
          setFirstName(data.data.user.first_name)
          setLastName(data.data.user.last_name)
          setPrefrences(data.data.user.prefrence[0])
          setUser(data.data.user)
        })
        .catch(err => {
          CustomAlert({ title: "Error", subtitle: "Error making request, please try again...", handlePress: () => { } })
          console.log({ err })
        })
    }
    fetchData()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.topBar}>
        <ImageButton
          style={styles.profileImage}
          imageStyle={styles.profileImage}
          image="https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg"
          handlePress={() => {
            navigation.navigate("Profile", {id, firstName, lastName, preferences, user});
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
          handlePress={() => navigation.navigate(Strings.qrcode, {token})}
        />
      </View>
      
        <Swiper
          height={"400%"}
          style={styles.swiperContainer}
          activeDotColor={Colors.fadedButton}
        >
          <View style={styles.cryptoContainer}>
            <Text style={styles.balanceText}>{Strings.cryptoBalance}</Text>
            <Text style={styles.cryptoBalanceText}>0.0001 BTC</Text>

            <View style={styles.transactionOptions}>
              <VectorButton
                name="arrow-up"
                size={18}
                color={Colors.white}
                style={styles.sendbutton}
                handlePress={() => navigation.push(Strings.sendCrypto)}
              />
              <VectorButton
                name="arrow-down"
                size={18}
                color={Colors.white}
                style={styles.receivebutton}
                handlePress={() => navigation.push(Strings.receiveCrypto)}
              />
              <VectorButton
                name="pricetag-outline"
                size={18}
                color={Colors.white}
                style={styles.swapbutton}
                handlePress={() => navigation.push(Strings.deposit)}
              />
              <VectorButton
                name="cash-outline"
                size={18}
                color={Colors.white}
                style={styles.swapbutton}
              />
              <VectorButton
                name="swap-horizontal"
                size={18}
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
      </ScrollView>
    </SafeAreaView>
  );
}

//export default HomeScreen
