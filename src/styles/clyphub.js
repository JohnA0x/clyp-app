import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from "expo-app-loading";
import { useFonts, Poppins_900Black, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";
import * as Colors from '../constants/colors'


export const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 2, 
        backgroundColor: Colors.backgroundColor,
      
    },

    headerText:{
        fontFamily:'Poppins_700Bold',
        fontSize:20,
        color: Colors.textColor,
        alignSelf: 'center',
        marginTop: 10,
        
    },
    
    optionsContainer:{
        marginTop: '0%',
    },

    newsContainer:{
        backgroundColor: Colors.backgroundColor, 
        width: '100%', 
        height: '27%',
        marginTop: 2,
        alignItems: 'center',
        alignSelf: 'center'
    },

    rowContainer:{
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        alignSelf: 'center'
    },

    button:{
        marginLeft:'10%',
    },

    newsImage:{
        backgroundColor: Colors.primary, 
        width: '80%', 
        height: '100%',
        marginTop: 1,
        alignSelf: 'center',
        borderRadius: 15,
    },

    seeAll:{
        textColor: Colors.textColor,
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 12,
        marginLeft: '70%',
    }


})