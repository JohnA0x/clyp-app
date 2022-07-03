import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import {AppLoading}from 'expo-app-loading';
import { useFonts, Poppins_900Black, Poppins_700Bold, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import * as Colors from '../constants/colors'


  
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 2,
      backgroundColor: '#fffff',
      
    },

    texts: {
        flex: 1,
        fontSize: 30,
        marginLeft: 12,
        marginTop: 100,
        fontFamily: 'Poppins_700Bold',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        color: Colors.textLight,
    },

    button: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      width:"80%",
      height:50,
      fontFamily: 'Poppins_600SemiBold',
      backgroundColor:Colors.primaryLight,
      borderRadius:30,
      marginBottom: 200,
    }

    
  });

  const Authenticate = () => {
    let [fontsLoaded, error] = useFonts({ 
      Poppins_700Bold, 
      Poppins_900Black,
      Poppins_600SemiBold,
    })

    if (!fontsLoaded) { 
      return <AppLoading /> 
    }
  }
