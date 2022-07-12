import React from "react";
import { StyleSheet, Text, View } from 'react-native';
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
      flexDirection: 'row',
      padding: 2,
      paddingLeft: 10,
      paddingTop: 5,
      width: '100%',
      height: '10%',
      color: Colors.backgroundColor,
      shadowOffset:{width: 0, height:5},
      shadowColor: Colors.shadowColor,
      shadowOpacity:0.1,
      elevation: 1,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },

    profileContainer:{
      width: '100%', 
      height: '15%',
      paddingTop: 40,
      paddingLeft: 2,
      flexDirection: 'row',
    },

    merchantContainer:{
      backgroundColor: Colors.merchantView,
      width: '100%', 
      height: '10%',  
      alignItems: 'center',
      flexDirection: 'row',
    },

    merchantText:{
      textColor: Colors.textColor,
      fontFamily: 'Poppins_600SemiBold',
      marginLeft: 20,
    },

    merchantSwitch:
    {
      marginLeft: '45%',
    },
    

    profileImage:{
      width:40,
      height:40,
      marginLeft: 5,
      marginTop: 5,
      alignSelf:'flex-start',
      borderRadius:50,
    },

    profileName:{
      fontSize: 16, 
      marginLeft: 15,
      marginTop: 20,
      fontFamily: 'Poppins_700Bold',
      alignItems: 'flex-start',
      color: Colors.textColor,
    },

    editProfileButton:{
      width:24,
      height:24,
      marginLeft: '42%',
      marginTop: 12,
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
      marginTop: 17,
    },

    preferencestext:{
      marginLeft: 15,
      marginTop: 17,
      fontSize: 15,
      fontFamily: 'Poppins_500Medium',
      color: Colors.textColor,
    },
})