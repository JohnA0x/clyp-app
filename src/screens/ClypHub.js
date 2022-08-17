import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Strings from "../strings/strings";
import { styles } from "../styles/clyphub";
import * as Colors from "../constants/colors";
import * as Values from "../constants/values";
import { FileImageButton, ImageButton } from "../components/button";

import NFTSVG from "../drawables/vector/clyphub/nfts.svg";
import BILLSVG from "../drawables/vector/clyphub/bills.svg";
import TRANSFERSVG from "../drawables/vector/clyphub/transfer.svg";
import RECHARGESVG from "../drawables/vector/clyphub/recharge.svg";
import SAVINGSSVG from "../drawables/vector/clyphub/savings.svg";
import Swiper from "react-native-swiper";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NewsScreen from "./NewsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../components/axios";
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ClypHub({navigation}) {

  const [id, setID] = React.useState("")
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [preferences, setPrefrences] = React.useState("")
  const [user, setUser] = React.useState({})
  const [token, setToken] = React.useState("")
  const [coins, setCoins] = React.useState([])

  React.useEffect(() => {
    async function fetchData() {
      let id = await AsyncStorage.getItem("user_id").then((value) => value);
      let token = await AsyncStorage.getItem("token").then((value) => value);

      setToken(token)
      axios.post('/user-gateway/get-full-user', { user_id: id })
        .then(data => {
          // console.log(data.data)
          setID(data.data.user.id)
          setFirstName(data.data.user.first_name)
          setLastName(data.data.user.last_name)
          setPrefrences(data.data.user.prefrence[0])
          setUser(data.data.user)
          console.log(data.data.user)
          axios.post('https://clyp-crypto.herokuapp.com/crypto-gateway/get-coins', { user_id: id })
            .then(coins_data => {
              setCoins(coins_data.data.coins)
            })
        })
        .catch(err => {
          CustomAlert({ title: "Error", subtitle: "Error making request, please try again...", handlePress: () => { } })
          console.log({ err })
        })
        .catch((err) => {
          CustomAlert({
            title: "Error",
            subtitle: "Error making request, please try again...",
            handlePress: () => {},
          });
          console.log({ err });
        });
    }
    fetchData();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.hubHeaderText}>{Strings.clyphub}</Text>
      </View>

      <View style={styles.newsContainer}>
        <Text style={styles.seeAll}
        onPress={() => navigation.navigate(Strings.News, { user })}
        >{Strings.seeAll}</Text>
        <Swiper activeDotColor={Colors.fadedButton}>
          <FileImageButton style={styles.newsImage} />
          <FileImageButton style={styles.newsImage} />
        </Swiper>
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity>
            <NFTSVG
              width={Values.clyphubsvgwidth}
              height={Values.clyphubsvgheight}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
           onPress = {() => navigation.navigate(Strings.bill, { user })}>
            <BILLSVG
              width={Values.clyphubsvgwidth}
              height={Values.clyphubsvgheight}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity>
            <TRANSFERSVG
              width={Values.clyphubsvgwidth}
              height={Values.clyphubsvgheight}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
          onPress = {() => navigation.navigate(Strings.recharge, { user })}>
            <RECHARGESVG
              width={Values.clyphubsvgwidth}
              height={Values.clyphubsvgheight}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity onPress = {() => navigation.navigate(Strings.savings, { user })}>
            <SAVINGSSVG
              width={Values.clyphubsvgwidth}
              height={Values.clyphubsvgheight}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
