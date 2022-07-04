import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import {AppLoading}from 'expo-app-loading';
import { useFonts, Poppins_900Black, Poppins_700Bold, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import * as Colors from '../constants/colors'

export const styles = StyleSheet.create({
    subtitle: {
      color: COLORS.white,
      fontSize: 13,
      marginTop: 10,
      maxWidth: '70%',
      textAlign: 'center',
      lineHeight: 23,
    },
    title: {
      color: COLORS.white,
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 20,
      textAlign: 'center',
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
    },
    indicator: {
      height: 2.5,
      width: 10,
      backgroundColor: 'grey',
      marginHorizontal: 3,
      borderRadius: 2,
    },
    btn: {
      flex: 1,
      height: 50,
      borderRadius: 5,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });