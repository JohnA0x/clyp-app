import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from "expo-app-loading";
import { useFonts, Poppins_900Black, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";
import * as Colors from '../constants/colors'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 2,
      backgroundColor: Colors.backgroundColor,
    },
  
    rowContainer:{
      flex: 1,
      padding: 5,
    },

    list:{
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
      height: '100%',
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
        position: 'absolute',
        fontSize: 9,
        bottom: 22,
        left: 65,
        fontFamily: "Poppins_500Medium",
        color: Colors.textColor,
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
      flexDirection: "row",
      padding: 2,
      paddingLeft: 10,
      backgroundColor: Colors.rowColor,
      borderRadius: 40,
      marginTop: 20,
      width: "90%",
      height: "12%",
      alignItems: "center",
      alignSelf: "center",
      shadowOffset: { width: 0, height: 3 },
      shadowColor: Colors.shadowColor,
      shadowOpacity: 0.1,
      elevation: 3,
    },
  
    backButton: {
      marginLeft: 10,
      position: "absolute",
      left: 0,
      zIndex: 1,
    },
  
    switch: {
      marginRight: 30,
      position: "absolute",
      right: 0,
      zIndex: 1,
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

    // Transaction Options style
    transactionCryptoContainer:{
      backgroundColor: Colors.listHolder,
      flexDirection: 'row',
      width: '90%',
      height: 50,
      borderRadius: 40,
      marginTop: '15%',
      alignSelf: 'center',
      alignItems: 'center',
    },

    transactionAmountContainer:{
      flexDirection: 'row',
      padding: 10,
      marginTop: '15%',
      alignItems: 'center',
    },

    cryptoText:{
      marginLeft: 10,
      fontSize: 15,
      fontFamily: "Poppins_600SemiBold",
      color: Colors.textColor,
    },

    cryptoImage:{
      marginLeft: 20,
      width: 28,
      height: 28,
    },
  

    amountText:{
      fontFamily: "Poppins_500Medium",
      marginLeft: 20,
    },

    amountValueText:{
      width: '50%',
      fontSize: 40,
      fontFamily: "Poppins_500Medium",
      marginLeft: 20,
    },
    amountMaxValue:{
      fontSize: 15,
      position: 'absolute',
      fontFamily: "Poppins_500Medium",
      color: Colors.primary,
      marginLeft: '85%',
    },

    lineCrosser:{
      width: '100%', 
      height: 1, 
      backgroundColor: Colors.primary
    },

    receiveAmount:{
      fontSize: 15,
      fontFamily: "Poppins_400Regular",
      color: Colors.textColor,
      alignSelf: 'center',
      marginTop: 20,
    },

    conversionAmount:{
      marginTop: 20,
      fontSize: 15,
      fontFamily: "Poppins_400Regular",
      color: Colors.textColor,
      alignSelf: 'center',
    },
    
    depositButton:{
      width: '90%',
      height: 50,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.primary,
      borderRadius: 50,
      marginTop: '40%',
    },

    depositText:{
      fontFamily: "Poppins_600SemiBold",
      color: Colors.white,
    },

  });

  