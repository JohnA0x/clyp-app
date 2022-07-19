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

  forgotPasswordText: {
    fontSize: 30,
    marginLeft: 12,
    marginTop: 100,
    fontFamily: "Poppins_700Bold",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    color: Colors.textColor,
  },

  emailinput: {
    alignSelf: 'center',
    backgroundColor: Colors.inputLight,
    width: "90%",
    height: 60,
    borderRadius: 15,
    marginTop:50,
    paddingLeft: 5,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
  },

  passwordinput: {
    alignSelf: 'center',
    backgroundColor: Colors.inputLight,
    width: "90%",
    height: 60,
    borderRadius: 15,
    marginTop:40,
    paddingLeft: 5,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
  },

  confirmpasswordinput: {
    alignSelf: 'center',
    backgroundColor: Colors.inputLight,
    width: "90%",
    height: 60,
    borderRadius: 15,
    marginTop:20,
    paddingLeft: 5,
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
  },


  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width:"85%",
    height:50,
    backgroundColor:Colors.primary,
    borderRadius:30,
    marginTop: '60%',
  },

  textButton: {
    color: Colors.white,
    fontFamily: 'Poppins_600SemiBold',
  },

  textotp:{
    color: Colors.textColor,
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    marginTop: '40%',
  },

  otp:{
    alignSelf: 'center',
    marginTop:30,
    
  },
  resendotp:{
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 20,
    color: Colors.primary
  },
});
