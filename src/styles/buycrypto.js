import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Colors from "../constants/colors";
import { Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: Colors.backgroundColor,
  },

  rowContainer: {
    flex: 1,
    padding: 5,
  },

  list: {
    padding: 2,
    paddingLeft: 10,
    flexDirection: "row",
    borderRadius: 40,
    width: "95%",
    height: 70,
    alignItems: "center",
    alignSelf: "center",
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

  textButton: {
    color: Colors.white,
    fontFamily: "Poppins_600SemiBold",
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

  optionHeaderText: {
    color: Colors.textColor,
    fontFamily: "Poppins_700Bold",
    textAlign: "left",
    marginLeft: "18%",
    marginTop: "20%",
    fontSize: 20,
  },

  optionSubtitleText: {
    color: Colors.textColor,
    fontFamily: "Poppins_400Regular",
    textAlign: "left",
    marginLeft: "18%",
    fontSize: 12,
  },

  optionsimage: {
    marginLeft: 0,
    width: 50,
    height: 50,
    position: "absolute",
    left: 20,
    marginTop: 100,
  },

  image: {
    marginLeft: 0,
    width: 30,
    height: 30,
  },

  preferencesimage:{
    marginLeft:10,
  },

  text: {
    marginLeft: 20,
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    color: Colors.textColor,
  },

  valueText: {
    marginRight: 10,
    position: "absolute",
    fontFamily: "Poppins_500Medium",
    color: Colors.textColor,
    right: 0,
    zIndex: 1,
  },

  dollarText: {
    marginRight: 10,
    marginBottom: 0,
    position: "absolute",
    right: 0,
    zIndex: 1,
  },

  darkmodeSwitch: {
    marginLeft: "48%",
  },

  separator: {
    height: 1,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#CCC",
  },

  optionsContainer: {
    flex: 1,
    padding: 5,
  },

  backButton: {
    marginLeft: 10,
    position: "absolute",
    left: 0,
    zIndex: 1,
  },

  optionsbackButton: {
    marginLeft: 10,
    position: "absolute",
    marginTop: "12%",
    left: 5,
    zIndex: 1,
  },

  preferencesHeaderText: {
    color: Colors.textColor,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontSize: 20,
  },

  flatlistimage: {
    marginLeft: 10,
  },

  preferencestext: {
    marginLeft: 20,
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    color: Colors.textColor,
  },

  buyOptionsFlatlist: {
    marginTop: 20,
  },

  // Transaction Options style
  walletBalanceContainer: {
    width: '90%',
    height: '20%',
    backgroundColor: Colors.primary,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },

  walletBalanceText:{
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.white,
  },

  walletBalanceValueText:{
    fontSize: 40,
    fontFamily: "Poppins_700Bold",
    color: Colors.white,
  },

  transactionCryptoContainer: {
    backgroundColor: Colors.listHolder,
    flexDirection: "row",
    width: "90%",
    height: 50,
    borderRadius: 40,
    marginTop: "10%",
    alignSelf: "center",
    alignItems: "center",
  },

  transactionAmountContainer: {
    flexDirection: "row",
    padding: 10,
    marginTop: "10%",
    alignItems: "center",
  },

  // Cards
  cardViewContainer:{
    flex: 1,
    padding: 5,
    width: Dimensions.get('window').width / 1.2,
    height: 200,
  },

  cardsContainer: {
    width: '90%',
    height: '90%',
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },

  cardListContainer:{

  },

  cardNumberText:{
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    textAlign: 'center',
    color: Colors.white,
  },

  cardNameText:{
    fontSize: 12,
    fontFamily: "Poppins_700Bold",
    left: 20,
    top: 30,
    color: Colors.white,
    position: 'absolute',
  },

  cardValidThruText:{
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    left: 20,
    bottom: 30,
    color: Colors.white,
    position: 'absolute',
  },

  cardValidityText:{
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    left: 20,
    bottom: 10,
    color: Colors.white,
    position: 'absolute',
  },

  cardCVVText:{
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    right: 20,
    bottom: 30,
    color: Colors.white,
    position: 'absolute',
  },

  cardCVV:{
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    right: 20,
    bottom: 10,
    color: Colors.white,
    position: 'absolute',
  },

  cardIcon:{
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    right: 20,
    bottom: 10,
    color: Colors.white,
    position: 'absolute',
  },

  cardCryptoContainer: {
    backgroundColor: Colors.listHolder,
    flexDirection: "row",
    width: "90%",
    height: 50,
    borderRadius: 40,
    marginBottom: "0%",
    alignSelf: "center",
    alignItems: "center",
  },

  cardAmountContainer: {
    flexDirection: "row",
    padding: 10,
    marginTop: "10%",
    alignItems: "center",
  },

  cardDepositButton: {
    width: "90%",
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 50,
    marginTop: 40,
    marginBottom: 20,
  },

  cryptoText: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.textColor,
  },

  cryptoImage: {
    marginLeft: 20,
    width: 28,
    height: 28,
  },

  selectedIcon:{
    position: 'absolute',
    top: 20,
    right: 20,
  },

  // End of Cards

  amountText: {
    fontFamily: "Poppins_500Medium",
    marginLeft: 20,
  },

  amountValueText: {
    width: "50%",
    fontSize: 40,
    fontFamily: "Poppins_500Medium",
    marginLeft: 20,
  },
  amountMaxValue: {
    fontSize: 15,
    position: "absolute",
    fontFamily: "Poppins_500Medium",
    color: Colors.primary,
    marginLeft: "85%",
  },

  lineCrosser: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.primary,
  },

  receiveAmount: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    color: Colors.textColor,
    alignSelf: "center",
    marginTop: 20,
  },

  conversionAmount: {
    marginTop: 20,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    color: Colors.textColor,
    alignSelf: "center",
  },

  depositButton: {
    width: "90%",
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 50,
    marginTop: 20,
  },

  depositText: {
    fontFamily: "Poppins_600SemiBold",
    color: Colors.white,
  },

  // Card  Pin
  enterPinText:{
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
    marginTop: 20,
  },

  pin:{
    alignSelf: 'center',
    marginTop: '20%',
  },

  nextButton:{
    width: "90%",
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 50,
    marginTop: '90%',
    marginBottom: 20,
  }
});
