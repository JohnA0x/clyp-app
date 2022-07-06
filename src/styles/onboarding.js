import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import {AppLoading}from 'expo-app-loading';
import { useFonts, Poppins_900Black, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";
import * as Colors from '../constants/colors'

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 2,
    backgroundColor: Colors.backgroundColor,
    
  },

  title: {
    flex: 1,
    fontSize: 20,
    marginTop: 400,
    fontFamily: 'Poppins_700Bold',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    color: Colors.textColor,
  },

  subtitle: {
    flex: 1,
    fontSize: 13,
    marginBottom: 100,
    fontFamily: 'Poppins_400Regular',
    alignSelf: 'center',
    textAlign:'center',
    justifyContent: 'center',
    color: Colors.textColor,
  },
  
  nextbutton: {
    alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width:"85%",
        height:50,
        backgroundColor:Colors.primaryLight,
        borderRadius:30,
        marginBottom: 10,
  },

  skipbutton: {
    alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width:"85%",
        height:50,
        backgroundColor:Colors.fadedButton,
        borderRadius:30,
        marginBottom: 30,
  },

  donebutton: {
    alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width:"85%",
        height:50,
        backgroundColor:Colors.doneButton,
        borderRadius:30,
        marginBottom: 10,
  },
  
  
  textButton: {
    color: Colors.white,
    fontFamily: 'Poppins_600SemiBold',
  },
  



  });