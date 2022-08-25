import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Colors from "../constants/colors";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeAction";
import { lightTheme, darkTheme } from "../constants/theme";
import { getData, storeData } from "../services/storage";


export const styles = StyleSheet.create({
  container: {
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

  addNewCard: {
    color: Colors.primary,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    textAlign: 'right',
    marginRight: 20,  
    marginBottom: '10%',
  },

  rowCardContainer:{
    flexDirection: "row",
    alignSelf: "center",
  },

  inputText: {
    height: 60,
    margin: "5%",
    marginTop: 40,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: 10,
    padding: 20,
    fontFamily: "Poppins_600SemiBold",
  },

  otherTextInputs: {
    height: 60,
    margin: "5%",
    marginTop: 10,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: 10,
    padding: 20,
    fontFamily: "Poppins_600SemiBold",
  },

  rowTextInputs: {
    height: 60,
    width: '40%',
    margin: "5%",
    marginTop: 10,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: 10,
    padding: 20,
    fontFamily: "Poppins_600SemiBold",
    textAlign:'center'
  },

  roundedButton: {
    backgroundColor: Colors.primary,
    borderRadius: 40,
    width: "85%",
    height: 60,
    marginTop: 40,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 3,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: 'center'
  },

  roundedTextButton: {
    color: Colors.white,
    fontFamily: "Poppins_600SemiBold",
  },


  preferencesHeader: {
    color: Colors.textColor,
    marginTop: 20,
  },

  preferencesHeaderText: {
    color: Colors.textColor,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    fontSize: 20,
  },

  preferencesimage: {
    marginLeft: 10,
  },

  preferencestext: {
    marginLeft: 20,
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    color: Colors.textColor,
  },

  darkmodeSwitch: {
    marginLeft: "48%",
  },

  separator: {
    height: 1,
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#CCC",
  },

  optionsContainer: {
    flexDirection: "row",
    padding: 2,
    paddingLeft: 10,
    backgroundColor: Colors.rowColor,
    borderRadius: 40,
    marginTop: 20,
    width: "90%",
    height: "12%",
    alignItems: "center",
    alignSelf: "center",
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 3,
  },

  backButton: {
    marginLeft: 10,
    position: "absolute",
    left: 0,
    zIndex: 1,
  },

  switch: {
    marginRight: 30,
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
});
