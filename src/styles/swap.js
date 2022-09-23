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

  image: {
    marginLeft: 0,
    width: 30,
    height: 30,
  },

  text: {
    marginLeft: 20,
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    color: Colors.textColor,
  },

  valueText:{
    marginRight: 10,
    position: "absolute",
    fontFamily: "Poppins_500Medium",
    color: Colors.textColor,
    right: 0,
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

  headerImage: {
    marginLeft: 10,
  },

  title: {
    marginLeft: 20,
    marginBottom: 18,
    fontSize: 15,
    fontFamily: "Poppins_700Bold",
    color: Colors.textColor,
  },

  subtitle: {
    position: "absolute",
    fontSize: 9,
    bottom: 22,
    left: 65,
    fontFamily: "Poppins_500Medium",
    color: Colors.textColor,
  },


  backButton: {
    marginLeft: 10,
    position: "absolute",
    left: 0,
    zIndex: 1,
  },

  // SwapCrypto
  cryptoImage:{
    marginTop: 50,
    width: 60,
    height: 60,
    alignSelf: 'center',
  },

  cryptoName:{
    marginTop: 5,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.textColor,
    textAlign: 'center',
  },

  cryptoAmount:{
    marginTop: 1,
    fontSize: 23,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.textColor,
    textAlign: 'center',
  },


  buttonView:{
    flexDirection: 'row',
    alignSelf: 'center',

  },

  instantRoundedButton:{
    width: '30%',
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 50,
    marginTop: '10%',
  },

  limitRoundedButton:{
    width: '30%',
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: '10%',
    marginLeft: '20%',
  },

  roundedText:{
    fontFamily: "Poppins_600SemiBold",
    color: Colors.white,
  },


  swiperContainer:{
    height: '100%'
  },

  // Instant and Limit
  fromView:{
    backgroundColor:Colors.listHolder,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 20,
    height: 90,
    margin: 20,
    zIndex: 1,
  },
  
  toView:{
    backgroundColor:Colors.listHolder,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 20,
    height: 90,
    margin: 20,
    zIndex: 0,
  },

  priceInput: {
    backgroundColor:Colors.listHolder,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 20,
    height: 50,
    margin: 20,
    paddingLeft: 20,
    zIndex: -3,
  },

  fromValue:{
    width: '50%',
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    marginLeft: 20,
    marginTop: 15,
  },

  fromDollarValue:{
    width: '50%',
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginLeft: 20,
    marginTop: 5,
  },

  maxValue:{
    color: Colors.primary,
    fontSize: 17,
    fontFamily: "Poppins_500Medium",
    position: 'absolute',
    right: 130,
    top: 30,
  },

  lineCrosser:{
    position: 'absolute',
    right: 120,
    width: 1,
    height: '100%',
    backgroundColor: Colors.primary,
  },

  dropDownFromPicker:{
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: 120,
    position: 'absolute',
    right: -5,
    bottom: -1,
    zIndex: 100,
  },

  dropDownToPicker:{
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: 120,
    position: 'absolute',
    right: -5,
    bottom: -1,
    zIndex: 600,
  },


  dropDownFromContainerPicker:{
    borderColor: Colors.primary
  },

  dropDownToContainerPicker:{
    borderColor: Colors.primary
  },

  iconStyle:{
    width: 20,
    height:20,
  },

  balanceText:{
    width: 80,
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    position: 'absolute',
    right: 20,
    bottom: 12,
  },

  swapButton:{
    width: '90%',
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 50,
    marginTop: '20%',
    zIndex: -1,
  },

  swapText:{
    fontFamily: "Poppins_600SemiBold",
    color: Colors.white,
  },

});
