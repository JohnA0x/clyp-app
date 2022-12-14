import React from "react";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import AppLoading from "expo-app-loading";
import { useFonts, Poppins_900Black, Poppins_700Bold, Poppins_600SemiBold, Poppins_500Medium, Poppins_400Regular } from "@expo-google-fonts/poppins";
import * as Colors from '../constants/colors'



export const styles = StyleSheet.create({
    container:{
      flex: 1,
      padding: 2,
      backgroundColor: Colors.backgroundColor,
    },

    rowContainer:{
      flex: 1,
      padding: 5,
    },

    button: {
      padding: 2,
      paddingLeft: 10,
      flexDirection: "row",
      backgroundColor: Colors.rowColor,
      borderRadius: 40,
      width: "95%",
      height: 70,
      shadowOffset: { width: 0, height: 3 },
      shadowColor: Colors.shadowColor,
      shadowOpacity: 0.1,
      elevation: 3,
      alignItems: "center",
      alignSelf: "center",
    },


    flatlist: {
      display: "flex",
      paddingVertical: 10,
    },

    profileContainer:{
      width: '100%', 
      height: '15%',
      paddingTop: 30,
      paddingLeft: 2,
      paddingHorizontal: 20,
      flexDirection: 'row',
    },

    merchantContainer:{
      backgroundColor: Colors.merchantView,
      width: '100%', 
      height: '10%',  
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },

    merchantText:{
      color: Colors.textColor,
      fontFamily: 'Poppins_600SemiBold',
      
    },

    merchantSwitch:
    {
      marginLeft: '48%',
    },
    

    profileImage:{
      width:40,
      height:40,
      marginTop: 5,
      marginLeft: '3%',
      marginRight: '2%',
      alignSelf:'flex-start',
      borderRadius:50,
    },

    profileName:{
      fontSize: 16, 
      marginRight: "10%",
      marginTop: 20,
      fontFamily: 'Poppins_700Bold',
      alignItems: 'flex-start',
      color: Colors.textColor,
    },

    editProfileButton:{
      width:24,
      height:24,
      position: 'absolute',
      top: 45,
      right: 25,
    },

    icon:{
      width:24,
      height:24,
      marginLeft: 110,
      marginTop: 17,
    },

    text:{
      width:24,
      height:24,
      marginLeft: 110,
      marginTop: 17,
      fontFamily: 'Poppins_600SemiBold'
    },

    preferencesimage:{
      marginLeft: 10,
    },

    preferencestext:{
      marginLeft: 20,
      fontSize: 15,
      fontFamily: 'Poppins_500Medium',
      color: Colors.textColor,
    },

    separator: {
      height: 1,
      width: '95%',
      alignSelf: 'center',
      backgroundColor: '#CCC',
    },
})