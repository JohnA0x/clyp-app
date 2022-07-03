import React from "react";
import * as Strings from '../strings/strings'
import {styles} from '../styles/styles'

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { useFonts, Poppins_900Black, Poppins_700Bold, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Colors from '../constants/colors'

import { setCustomText } from 'react-native-global-props';

export default function Signup() {
    let [fontsLoaded, error] = useFonts({ 
      Poppins_700Bold, 
      Poppins_900Black,
      Poppins_600SemiBold,
      })

    return(
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.texts}>{Strings.createAccount}</Text>
            <TouchableOpacity style = {styles.button}>
                <Text style = {{color: Colors.white, fontFamily: 'Poppins_600SemiBold'}}> {Strings.signup}</Text>
                 </TouchableOpacity>
        </SafeAreaView>
    );s
}