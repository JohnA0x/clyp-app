import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Colors from "../constants/colors";

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
    backgroundColor: Colors.rowColor,
    borderRadius: 40,
    width: "95%",
    height: 70,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 3,
    alignSelf: "center",
  },

  flatlist: {
    display: "flex",
    paddingVertical: 10,
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

  image: {
    marginLeft: 10,
  },

  text: {
    marginTop: '10%',
    marginLeft: 20,
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    color: Colors.textColor,
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

  nameText:{
    marginTop: 10,
    marginLeft: 60,
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    color: Colors.textColor,
  },

  bankNameText:{
    marginTop: 1,
    marginLeft: 60,
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    color: Colors.textColor,
  },

  bankIcon:{
    marginTop: 20,
    marginLeft: 20,
    width: 28,
    height: 28,
    position: 'absolute',
  },

  accountNameText:{
    marginTop: 2,
    marginLeft: 60,
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    color: Colors.textColor,
  },

  otherOptionsView:{
    flexDirection: 'row', 
    alignSelf: 'center',
    marginBottom: '50%'
  },

  addNewAccount: {
    color: Colors.primary,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold'
  },

  useAnotherAccount:{
    color: Colors.primary,
    marginLeft: '20%',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold'
  },

  bankAccountButton: {
    padding: 2,
    paddingLeft: 10,
    backgroundColor: Colors.rowColor,
    borderRadius: 40,
    width: "95%",
    height: 70,
    marginTop: 40,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: Colors.shadowColor,
    shadowOpacity: 0.1,
    elevation: 3,
    alignSelf: "center",
  },

  amountInput: {
    height: "10%",
    margin: "5%",
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: 10,
    padding: 20,
  },

  roundedButton:{
    width: '90%',
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 50,
    marginTop: '70%',
  },

  roundedButtonText:{
    fontFamily: "Poppins_600SemiBold",
    color: Colors.white,
  },

  // Use Another Card
  inputText: {
    height: 60,
    margin: "5%",
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: 10,
    padding: 20,
  },

  otherTextInputs: {
    height: 60,
    margin: "5%",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: 10,
    padding: 20,
  },

  roundedAddButton: {
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
});
