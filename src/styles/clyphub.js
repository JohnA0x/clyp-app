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

  hubHeaderText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: Colors.textColor,
    alignSelf: "center",
    marginTop: 10,
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

  optionsContainer: {
    marginTop: "0%",
    alignSelf: "center",
  },

  newsContainer: {
    backgroundColor: Colors.backgroundColor,
    width: "100%",
    height: "27%",
    marginTop: 2,
    alignItems: "center",
    alignSelf: "center",
  },

  rowContainer: {
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    alignSelf: "center",
  },

  button: {
    marginLeft: "10%",
  },

  newsImage: {
    backgroundColor: Colors.primary,
    width: "80%",
    height: "100%",
    marginTop: 1,
    alignSelf: "center",
    borderRadius: 15,
  },

  seeAll: {
    textColor: Colors.textColor,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    marginLeft: "70%",
  },

  fiatBalanceContainer: {
    width: "90%",
    height: "20%",
    backgroundColor: Colors.primary,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  fiatBalanceText: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.white,
  },

  fiatBalanceValueText: {
    fontSize: 40,
    fontFamily: "Poppins_700Bold",
    color: Colors.white,
  },

  backButton: {
    marginLeft: 10,
    position: "absolute",
    left: 0,
    zIndex: 1,
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

  dropDownPicker: {
    backgroundColor: Colors.listHolder,
    borderColor: Colors.primary,
    borderRadius: 50,
    width: "90%",
    height: 60,
    alignSelf: "center",
    marginTop: 50,
    padding: 10,
  },

  selectPlanPicker: {
    backgroundColor: Colors.listHolder,
    borderColor: Colors.primary,
    borderRadius: 50,
    width: "90%",
    height: 60,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
  },

  dropDownContainerPicker: {
    borderColor: Colors.primary,
  },

  dropDownToContainerPicker: {
    borderColor: Colors.primary,
  },

  addressInput: {
    height: 60,
    margin: "5%",
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: Colors.listHolder,
    padding: 20,
  },

  otherTextInputs: {
    height: 60,
    margin: "5%",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: Colors.listHolder,
    padding: 20,
  },

  roundedButton: {
    backgroundColor: Colors.primary,
    borderRadius: 40,
    width: "85%",
    height: 60,
    marginTop: 40,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 3,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },

  roundedTextButton: {
    color: Colors.white,
    fontFamily: "Poppins_600SemiBold",
  },

  // Savings
  savingsImage: {
    alignSelf: "center",
    marginTop: 0,
  },

  continueView: {
    backgroundColor: Colors.listHolder,
    borderRadius: 30,
    padding: 20,
    margin: 30,
    marginTop: -10,
    height: "30%",
  },

  continueTitle: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },

  continueDescription: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
    marginTop: 10,
  },

  roundedContinueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 40,
    width: "85%",
    height: 50,
    marginTop: '5%',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 3,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },

  swiperContainer:{
    height: '100%',
  },

  walletBalanceContainer: {
    width: "90%",
    height: 170,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  walletBalanceText: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.white,
  },

  walletBalanceValueText: {
    fontSize: 40,
    fontFamily: "Poppins_700Bold",
    color: Colors.white,
  },

  newGoalView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 40,
    marginBottom: "60%",
  },

  yourGoalText:{
    fontFamily: 'Poppins_500Medium',
    marginLeft: "15%",
  },

  newGoalText:{
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
    alignSelf: 'center',
  },

  yourGoals:{
    fontFamily: 'Poppins_500Medium'
  },

  addGoal:{
    marginLeft: '60%',
  },

  rowSavingsContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },

  depositButton:{
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    width: 100,
    height: 30,
    justifyContent: 'center',
  },

  depositButtonText:{
    color: Colors.white,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    textAlign: 'center',
  },

  withdrawButton:{
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    width: 100,
    height: 30,
    marginLeft: 20,
    justifyContent: 'center',
  },

  withdrawButtonText:{
    color: Colors.white,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    textAlign: 'center',
  },

});
