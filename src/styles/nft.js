import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Colors from "../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },

  comingSoonImage:{
    width: 220,
    height: 220,
    alignSelf: 'center',
    marginTop: "10%"
  },

  comingSoonText:{
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
  },

  comingSoonSubtitle:{
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    textAlign: "center",
    marginTop: 0,
  },

  header: {
    color: Colors.textColor,
    marginTop: 20,
  },

  headerText: {
    color: Colors.textColor,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontSize: 20,

  },
  
  backButton:{
    marginLeft: 10,
    position: 'absolute', left:0, zIndex:1,
  },

});
