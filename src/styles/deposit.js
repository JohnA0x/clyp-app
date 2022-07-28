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
  });

  