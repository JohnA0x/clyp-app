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

    cryptoContainer:{
        backgroundColor: Colors.primary,
        borderRadius: 20,
        width:'80%',
        height: 200,
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 2,
        marginTop: 40,
        shadowOffset:{width: 0, height:5},
        shadowColor:'#00000',
        shadowOpacity:0.9,
        elevation:3,
    },

    fiatContainer:{
      backgroundColor: Colors.tertiary,
      borderRadius: 20,
      width:'80%',
      height: 200,
      alignContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      padding: 2,
      marginTop: 40,
      shadowOffset:{width: 0, height:3},
      shadowColor:Colors.shadowColor,
      shadowOpacity:0.1,
      elevation:3,
  },


    topBar:{
      flexDirection: 'row'
      
    },

    profileImage:{
      width:40,
      height:40,
      marginLeft: 5,
      marginTop: 5,
      alignSelf:'flex-start',
      borderRadius:50,
    },

    notificationButton:{
      width:24,
      height:24,
      marginLeft: '35%',
      marginTop: 17,
    },

    scanButton:{
      width:24,
      height:24,
      marginLeft: '3%',
      marginTop: 17,
    },

    nameText:{
      fontSize: 15,
      marginTop: 20,
      marginLeft: 10,
      fontFamily: 'Poppins_600SemiBold',
      alignItems: 'flex-start',
      justifyContent: 'space-evenly',
      color: Colors.textColor,
    },

    transactionOptions:{
      flexDirection: 'row',
      padding: 2,
      alignItems: 'center',
      alignContent: 'center',
  },

    balanceText:{
      fontSize: 15,
      marginTop: 50,
      fontFamily: 'Poppins_600SemiBold',
      alignItems: 'flex-start',
      justifyContent: 'space-evenly',
      color: Colors.textColorFaded,
    },

    cryptoBalanceText:{
      fontSize: 35,
      marginTop: -8,
      fontFamily: 'Poppins_700Bold',
      alignItems: 'flex-start',
      justifyContent: 'space-evenly',
      color: Colors.backgroundColor,
    },

    sendbutton: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      width:"40%",
      height:30,
      backgroundColor:Colors.fadedButton,
      borderRadius:30,
      marginBottom: 20,
    },

    receivebutton: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      width:"40%",
      height:30,
      marginLeft: 10,
      backgroundColor:Colors.fadedButton,
      borderRadius:30,
      marginBottom: 20,
    },

    textButton: {
      color: Colors.white,
      fontFamily: 'Poppins_600SemiBold',
    },

    coinContainer:{
      flex: 1,
      padding: 10,
      marginTop:10,
      backgroundColor: Colors.backgroundColor,
    },

    coinText: {
      color: Colors.textColor,
      fontFamily: 'Poppins_600SemiBold',
      fontSize:14,
      alignSelf: 'flex-start',
      marginLeft: 15,
      
    },
})