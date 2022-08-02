import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Poppins_900Black,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import * as Colors from "../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.backgroundColor,
  },

  rowContainer:{
    flex: 1,
    padding: 5,
  },

  summaryContainer: {
    width: "95%",
    height: "20%",
    backgroundColor: Colors.rowColor,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 3,
  },

  tabBar: {
    marginTop: 10,
  },

  marketCapText: {
    fontFamily: "Poppins_400Regular",
    position: "absolute",
    color: Colors.textColor,
    left: 20,
    top: 40,
  },

  marketCapValueText: {
    fontFamily: "Poppins_600SemiBold",
    position: "absolute",
    color: Colors.textColor,
    left: 20,
    top: 60,
  },

  marketCapMovementText: {
    fontFamily: "Poppins_400Regular",
    position: "absolute",
    color: Colors.textColorGrey,
    left: 20,
    top: 80,
  },

  volume24hText: {
    fontFamily: "Poppins_400Regular",
    position: "absolute",
    color: Colors.textColor,
    right: 20,
    top: 40,
  },

  volume24hValueText: {
    fontFamily: "Poppins_600SemiBold",
    position: "absolute",
    color: Colors.textColor,
    right: 20,
    top: 60,
  },
  volume24hMovementText: {
    fontFamily: "Poppins_400Regular",
    position: "absolute",
    color: Colors.textColorGrey,
    right: 20,
    top: 80,
  },

  infoContainer: {
    flexDirection: "row",
    padding: 10,
    alignSelf: "center",
  },

  nameinfoOptions: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
  infoOptions: {
    marginLeft: "10%",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },

  flatlist: {
    display: "flex",
    paddingVertical: 10,
  },

  cryptoImage: {
    marginLeft: 10,
  },

  cryptoText: {
    marginLeft: 20,
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    color: Colors.textColor,
  },
  button: {
    padding: 2,
    paddingLeft: 10,
    flexDirection: "row",
    backgroundColor: Colors.rowColor,
    borderRadius: 40,
    width: "95%",
    height: 70,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 3,
    alignItems: "center",
    alignSelf: "center",
  },
});
