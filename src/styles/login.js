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
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: Colors.backgroundColor,
  },

  texts: {
    flex: 1,
    fontSize: 30,
    marginLeft: 12,
    marginTop: 100,
    fontFamily: "Poppins_700Bold",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    color: Colors.textColor,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "85%",
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    marginBottom: 20,
  },

  themeButton: {
    width: 100,
    height:100,
    position: "absolute",
    top: 120,
  },

  textButton: {
    color: Colors.white,
    fontFamily: "Poppins_600SemiBold",
  },

  emailinput: {
    alignSelf: "center",
    backgroundColor: Colors.inputLight,
    width: "90%",
    height: 55,
    borderRadius: 15,
    marginBottom: 20,
    paddingLeft: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  passwordinput: {
    alignSelf: "center",
    backgroundColor: Colors.inputLight,
    width: "90%",
    height: 55,
    borderRadius: 15,
    marginBottom: "10%",
    paddingLeft: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  forgotPassword: {
    alignSelf: "center",
    color: Colors.primary,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 20,
  },

  rowContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
    alignContent: "center",
  },

  socialContainer: {
    flexDirection: "row",
    alignSelf: "center",
    alignContent: "center",
    marginBottom: 100,
    alignContent: "center",
  },

  dontHaveAccount: {
    fontFamily: "Poppins_400Regular",
    color: Colors.textColorGrey,
  },

  signup: {
    paddingLeft: 5,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.primary,
  },
});

export const loginButton = styled.TouchableOpacity`
background-color: ${(props) => props.theme.primary}
`
