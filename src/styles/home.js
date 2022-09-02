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
    padding: 2,
    backgroundColor: Colors.backgroundColor,
  },

  rowContainer: {
    flexDirection: "row",
  },

  favouriteBaseContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },

  historyBaseContainer: {
    flex: 1,
    padding: 10,
  },

  swiperContainer: {
    height: 270,
  },

  columnContainer: {
    flexDirection: "column",
    alignItems: "center",
  },

  othercolumnContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 30,
  },

  cryptoContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    width: "90%",
    height: 200,
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    padding: 2,
    marginTop: 20,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "#00000",
    shadowOpacity: 0.1,
    elevation: 3,
  },

  fiatContainer: {
    backgroundColor: Colors.black,
    borderRadius: 20,
    width: "90%",
    height: 200,
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    padding: 2,
    marginTop: 20,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 3,
  },

  flatlist: {
    display: "flex",
  },

  topBar: {
    flexDirection: "row",
  },

  profileImage: {
    width: 40,
    height: 40,
    marginLeft: 5,
    marginTop: 5,
    alignSelf: "flex-start",
    borderRadius: 50,
  },

  notificationButton: {
    width: 24,
    height: 24,
    position: "absolute",
    right: "20%",
    marginTop: 17,
  },

  scanButton: {
    width: 24,
    height: 24,
    position: "absolute",
    right: "10%",
    marginTop: 17,
  },

  nameText: {
    fontSize: 15,
    marginTop: 20,
    marginLeft: 10,
    fontFamily: "Poppins_600SemiBold",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    color: Colors.textColor,
  },

  transactionOptions: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: Colors.tertiary,
    borderRadius: 20,
    marginTop: 5,
    height: "30%",
    width: "90%",
  },

  favouriteButton: {
    backgroundColor: Colors.rowColor,
    borderRadius: 40,
    width: 150,
    height: 60,
    paddingVertical: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  balanceText: {
    fontSize: 15,
    marginTop: 50,
    fontFamily: "Poppins_600SemiBold",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    color: Colors.textColorFaded,
  },

  cryptoBalanceText: {
    fontSize: 35,
    marginTop: -8,
    fontFamily: "Poppins_700Bold",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    color: Colors.backgroundColor,
  },

  optionText: {
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.white,
  },

  sendbutton: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: Colors.fadedButton,
    borderRadius: 50,
  },

  receivebutton: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: Colors.fadedButton,
    borderRadius: 50,
  },

  buybutton: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: Colors.fadedButton,
    borderRadius: 50,
    //marginBottom: 20,
    //marginLeft: 40,
  },

  sellbutton: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: Colors.fadedButton,
    borderRadius: 50,
    // marginBottom: 20,
    // marginLeft: 40,
  },

  swapbutton: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: Colors.fadedButton,
    borderRadius: 50,
    // marginBottom: 20,
    // marginLeft: 40,
  },

  textButton: {
    color: Colors.black,
    fontFamily: "Poppins_600SemiBold",
  },

  coinContainer: {
    flex: 1,
    padding: 10,
    marginBottom: -150,
    backgroundColor: Colors.backgroundColor,
  },

  coinText: {
    color: Colors.textColor,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    alignSelf: "flex-start",
    marginLeft: 15,
  },

  coinContainer: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    backgroundColor: Colors.backgroundColor,
  },

  coinText: {
    color: Colors.textColor,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    alignSelf: "flex-start",
    marginLeft: 15,
  },

  holdingText: {
    color: Colors.textColor,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 17,
    alignSelf: "flex-start",
    marginLeft: 15,
  },

  cryptoimage: {
    marginRight: 10,
    width: 20,
    height: 20,
  },

  holdingsCryptoimage: {
    marginLeft: 20,
    marginRight: 10,
    width: 20,
    height: 20,
  },

  holdingsTextButton: {
    left: 20,
    color: Colors.black,
    fontFamily: "Poppins_600SemiBold",
  },

  holdingsValueButton: {
    position: "absolute",
    right: 30,
    alignSelf: "center",
    color: Colors.black,
    fontFamily: "Poppins_600SemiBold",
  },

  holdingButton: {
    backgroundColor: Colors.rowColor,
    borderRadius: 40,
    width: "100%",
    height: 60,
    paddingVertical: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 2,
    alignItems: "center",
    flexDirection: "row",
  },

  // Holdings Screen

  header: {
    color: Colors.textColor,
    marginTop: 20,
  },

  headerText: {
    color: Colors.textColor,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontSize: 20,
  },

  optionHoldingsText: {
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.textColor,
  },

  backButton: {
    marginLeft: 10,
    position: "absolute",
    left: 10,
    top: "7%",
    zIndex: 1,
  },

  holdingsRowContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },

  holdingsDetailImage: {
    width: 40,
    height: 40,
    alignSelf: "center",
  },

  holdingsCryptoName: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    alignSelf: "center",
    marginLeft: 10,
  },

  holdingsTransactionOptions: {
    width: "80%",
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: 30,
    borderRadius: 20,
    marginTop: "50%",
  },

  cryptoAbbreviationText:{
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: Colors.textColor,
    position: "absolute",
    top: 20,
    left: 10,
  },

  cryptoAmountText:{
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: Colors.primary,
    position: "absolute",
    top: 20,
    left: 55,
    textAlign: "left",
    width: 150,
  },

  usdAbbreviationText:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: Colors.textColor,
    position: "absolute",
    top: 45,
    left: 10,
  },

  usdAmountText:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: Colors.textColor,
    position: "absolute",
    top: 45,
    left: 55,
    textAlign: "left",
    width: 150,
  },

  priceChangeText:{
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: Colors.textColor,
    position: "absolute",
    top: 20,
    right: 20,
  },

  todayText:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: Colors.textColor,
    position: "absolute",
    top: 45,
    right: 20,
  },

    // History 
    historyText:{
      marginLeft: 20,
      marginTop: 30,
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 20,
    },

    list: {
      padding: 2,
      paddingLeft: 10,
      borderRadius: 20,
      width: "95%",
      height: 90,
      alignSelf: "center",
      backgroundColor: Colors.listHolder,
    },
  
    flatlist: {
      display: "flex",
      paddingVertical: 10,
      backgroundColor: Colors.listHolder,
      margin: 10,
      marginTop: 30,
      height: "100%",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  
    title:{
      marginTop: 15,
      fontFamily: 'Poppins_600SemiBold',
    },
  
    description:{
      marginTop: 5,
      width: 200,
      fontFamily: 'Poppins_500Medium',
      fontSize: 12,
    },
  
    date:{
      marginTop: 1,
      width: 200,
      fontFamily: 'Poppins_500Medium',
      fontSize: 10,
    },
  
    status:{
      position: 'absolute',
      fontFamily: 'Poppins_500Medium',
      fontSize: 10,
      top: 50,
      right: 20,
    },
  
  
    statusIcon:{
      backgroundColor: Colors.primary,
      borderRadius: 100,
      position: 'absolute',
      right: 70,
      top: 10,
    },
  
    time:{
      position: 'absolute',
      right: 20,
      top: 12,
      fontSize: 10,
      fontFamily: 'Poppins_500Medium'
    },
});
