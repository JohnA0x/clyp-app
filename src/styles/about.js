import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from "expo-app-loading";
import { useFonts, Poppins_900Black, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";
import * as Colors from '../constants/colors'


export const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 2,
    },

    svgLogo:{
        alignSelf: 'center',
        marginTop: '5%',
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
    
      image: {
        marginLeft: 10,
      },
    
      imageText: {
        marginLeft: 20,
        fontSize: 15,
        fontFamily: "Poppins_500Medium",
        color: Colors.textColor,
      },

      backButton: {
        marginLeft: 10,
        position: "absolute",
        left: 0,
        zIndex: 1,
      },

      versionText:{
        fontSize: 15,
        fontFamily: 'Poppins_400Regular',
        color: Colors.textColor,
        textAlign: "center"
      },

      aboutText:{
        fontSize: 15,
        fontFamily: "Poppins_500Medium",
        color: Colors.white,
      },

      aboutContainer:{
        padding: 20,
        backgroundColor: Colors.primary,
        margin: 20,
        borderRadius: 20,

      },

      privacyText:{
        fontSize: 15,
        fontFamily: 'Poppins_500Medium',
        color: Colors.textColor,
        textAlign: "center"
      },

})
