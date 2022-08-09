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
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ClypHub({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>{Strings.clyphub}</Text>
      </View>

      <View style={styles.newsContainer}>
        <Text style={styles.seeAll}
        onPress={() => navigation.navigate(Strings.News)}
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

          <TouchableOpacity style={styles.button}>
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

          <TouchableOpacity style={styles.button}>
            <RECHARGESVG
              width={Values.clyphubsvgwidth}
              height={Values.clyphubsvgheight}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity>
            <SAVINGSSVG
              width={Values.clyphubsvgwidth}
              height={Values.clyphubsvgheight}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  

  function Recharge(){

  }
}
