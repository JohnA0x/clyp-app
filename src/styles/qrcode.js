import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Colors from "../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: Colors.backgroundColor,
  },

  rowContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 2,
    paddingLeft: 10,
    paddingVertical: 20,
    width: "100%",
    alignItems: 'center',
  
  },

  qrcode:{
    marginTop: '30%',
    alignSelf: 'center',
  },

  qrcodeHeader: {
    color: Colors.textColor,
    marginTop: 20,
  },

  qrcodeHeaderText: {
    color: Colors.textColor,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontSize: 20,

  },

  qrcodeimage: {
    marginLeft: 10,
  },

  qrcodetext: {
    marginLeft: 15,
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    color: Colors.textColor,
  },

  options:{
    alignItems:'center',
    flexDirection: 'row',
    marginTop: '40%',
    justifyContent: 'center',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width:"70%",
    height:50,
    backgroundColor:Colors.primary,
    borderRadius:30,
    marginTop: '50%',
  },

  scantext:{
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    color: Colors.backgroundColor,
  },

  separator: {
    height: 1,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#CCC',
  },

  backButton:{
    marginLeft: 10,
    position: 'absolute', left:0, zIndex:1,
  },
});
