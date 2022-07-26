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

    favouriteBaseContainer:{
      flex:1,
      flexDirection: 'row',
      padding: 10,
    },

    historyBaseContainer:{
      flex:1,
      padding: 10,
    },
    

    cryptoContainer:{
        backgroundColor: Colors.primary,
        borderRadius: 20,
        width:'80%',
        height: '85%',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 2,
        marginTop: 40,
        shadowOffset:{width: 0, height:5},
        shadowColor:'#00000',
        shadowOpacity:0.1,
        elevation:3,
    },

    fiatContainer:{
      backgroundColor: Colors.black,
      borderRadius: 20,
      width:'80%',
      height: '85%',
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

  flatlist: {
    display: "flex",
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
      justifyContent:'center',
      backgroundColor: Colors.tertiary,
      borderRadius: 30,
      paddingTop: 20,
      marginTop: 10,
      height: '30%',
      width: '80%',
  },

  favouriteButton: {
    backgroundColor: Colors.rowColor,
    borderRadius: 40,
    width: 150,
    height: 60,
    paddingVertical: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 3,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row'
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
      width:35,
      height:35,
      backgroundColor:Colors.fadedButton,
      borderRadius:50,
      marginBottom: 20,
    },

    receivebutton: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      width:35,
      height:35,
      backgroundColor:Colors.fadedButton,
      borderRadius:50,
      marginBottom: 20,
      marginLeft: 40,
    },

    swapbutton: {
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      width:35,
      height:35,
      backgroundColor:Colors.fadedButton,
      borderRadius:50,
      marginBottom: 20,
      marginLeft: 40,
    },


    textButton: {
      color: Colors.black,
      fontFamily: 'Poppins_600SemiBold',
    },

    coinContainer:{
      flex: 1,
      padding: 10,
      marginBottom:-150,
      backgroundColor: Colors.backgroundColor,
    },

    coinText: {
      color: Colors.textColor,
      fontFamily: 'Poppins_600SemiBold',
      fontSize:17,
      alignSelf: 'flex-start',
      marginLeft: 15,
      
    },

    coinContainer:{
      flex: 1,
      padding: 10,
      marginBottom:-150,
      backgroundColor: Colors.backgroundColor,
    },

    coinText: {
      color: Colors.textColor,
      fontFamily: 'Poppins_600SemiBold',
      fontSize:17,
      alignSelf: 'flex-start',
      marginLeft: 15,
      
    },

    holdingText: {
      color: Colors.textColor,
      fontFamily: 'Poppins_600SemiBold',
      fontSize:17,
      alignSelf: 'flex-start',
      marginLeft: 15
      
    },

    cryptoimage: {
      marginRight: 10,
      width: 20,
      height: 20,
    },

    holdingButton: {
      backgroundColor: Colors.rowColor,
      borderRadius: 40,
      width: '100%',
      height: 60,
      paddingVertical: 10,
      shadowOffset: { width: 0, height: 3 },
      shadowColor: Colors.shadowColor,
      shadowOpacity: 0.1,
      elevation: 3,
      alignItems: "center",
      justifyContent: 'center',
      flexDirection: 'row'
    },
})
