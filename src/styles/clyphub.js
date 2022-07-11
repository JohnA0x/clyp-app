import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from "expo-app-loading";
import { useFonts, Poppins_900Black, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";
import * as Colors from '../constants/colors'


export const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 5, 
    },

    headerText:{
        fontFamily:'Poppins_700Bold',
        fontSize:20,
        color: Colors.textColor,
        alignSelf: 'center',
        marginTop: 10,
        
    }
})