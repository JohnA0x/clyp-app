import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading } from "expo-app-loading";
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
    padding: 2,
    backgroundColor: Colors.backgroundColor,
  },

  title: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: "Poppins_700Bold",
    alignSelf: "center",
    justifyContent: "space-evenly",
    color: Colors.textColor,
  },

  subtitle: {
    fontSize: 13,
    top: 15,
    marginBottom: 80,
    fontFamily: "Poppins_400Regular",
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    color: Colors.textColor,
  },

  svg: {
    alignSelf: "center",
    marginTop: 50,
  },

  image:{
    width: 300,
    height: 300,
    marginTop: "10%",
    alignSelf: "center",
  },

  nextbutton: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "85%",
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    marginBottom: 10,
  },

  skipbutton: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "85%",
    height: 50,
    backgroundColor: Colors.fadedButton,
    borderRadius: 30,
  },

  donebutton: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "85%",
    height: 50,
    backgroundColor: Colors.doneButton,
    borderRadius: 30,
    marginBottom: 10,
  },

  textButton: {
    color: Colors.white,
    fontFamily: "Poppins_600SemiBold",
  },
});
