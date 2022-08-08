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
    shadowOpacity: 0.2,
    elevation: 2,
  },

  tabBar: {
    width: '100%',
    marginTop: 10,
    shadowOpacity:0, 
    elevation: 1,
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
    width: 15,
    height: 15,
    marginLeft: 5,
  },

  cryptoText: {
    marginLeft: 1,
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
    color: Colors.textColor,
  },

  cryptoChangeText: {
    width: 15,
    left: '30%',
    position: 'absolute',
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
    textAlign:'right',
    color: Colors.textColor,
  },

  cryptoPriceText: {
    width: 15,
    marginLeft: '30%',
    position: 'absolute',
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
    textAlign:'right',
    color: Colors.textColor,
  },

  cryptoMarketCapText: {
    width: 15,
    marginLeft: '58%',
    position: 'absolute',
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
    textAlign:'right',
    color: Colors.textColor,
  },

  bottomModal:{
    shadowOffset: { width: 0, height: -4 },
    shadowColor: Colors.shadowColor,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 5,
  },

  button: {
    flexDirection: "row",
    borderRadius: 40,
    width: "100%",
    height: 50,
    alignItems: "center",
    alignSelf: "center",
  },

  cryptoStatsContainer:{
    padding: 10,
  },

  statsCryptoName:{
    color: Colors.textColor,
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
  },

  header: {
    marginTop: 20,
  },

  headerText: {
    color: Colors.textColor,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontSize: 20,
  },

  backButton: {
    marginLeft: 10,
    position: "absolute",
    left: 0,
    zIndex: 1,
  },
});
