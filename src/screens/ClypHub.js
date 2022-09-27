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

import { useSelector, useDispatch } from "react-redux";
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ClypHub({navigation}) {
  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <View>
        <Text style={[styles.hubHeaderText, {color: theme.text}]}>{Strings.clyphub}</Text>
      </View>

      <View style={[styles.newsContainer, {backgroundColor: theme.background}]}>
        <Text style={[styles.seeAll, {color: theme.text}]}
        onPress={() => navigation.navigate(Strings.News)}
        >{Strings.seeAll}</Text>
        <Swiper activeDotColor={Colors.fadedButton}>
          <FileImageButton style={styles.newsImage} />
          <FileImageButton style={styles.newsImage} />
        </Swiper>
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.rowContainer}>
          <TouchableOpacity
          onPress={() => navigation.navigate(Strings.nft)}>
            <NFTSVG
              width={Values.clyphubsvgwidth}
              height={Values.clyphubsvgheight}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
           onPress = {() => navigation.navigate(Strings.bill)}>
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
          onPress = {() => navigation.navigate(Strings.recharge)}>
            <RECHARGESVG
              width={Values.clyphubsvgwidth}
              height={Values.clyphubsvgheight}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity onPress = {() => navigation.navigate(Strings.savings)}>
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
