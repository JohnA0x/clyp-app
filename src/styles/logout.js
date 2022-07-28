import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_900Black,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import * as Colors from "../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },

  contentContainer: {
    flex: 1,
    padding: 25,
    alignItems: "center",
  },

  rowContainer: {
    flexDirection: "row",
    paddingHorizontal: 29,
    justifyContent: "center",
    alignContent: 'center',
  },

  logOutText: {
    color: Colors.textColor,
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
  },

  yesText: {
    width: 100,
    color: Colors.primary,
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    top:20,

  },

  noText: {
    width: 100,
    height: 30,
    backgroundColor: Colors.primary,
    color: Colors.white,
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    top: 20,
    textAlign: "center",
  },

  noButton: {
    borderRadius: 20,
  },
});
