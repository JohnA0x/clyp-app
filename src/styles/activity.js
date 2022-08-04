import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Colors from "../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.backgroundColor,
  },

  rowContainer: {
    flex: 1,
    padding: 5,
  },

  tabBar: {
    width: "100%",
    marginTop: "10%",
    shadowOpacity: 0,
    elevation: 1,
  },

  // Range
  fromText: {
    marginTop: 10,
    marginLeft: '5%',
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.textColor,
  },

  fromInput: {
    height: "14%",
    margin: "5%",
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: 10,
    padding: 20,
  },

  toText: {
    marginTop: 10,
    marginLeft: '5%',
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.textColor,
  },


  toInput: {
    height: "14%",
    margin: "5%",
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: 10,
    padding: 20,
  },

  searchButton:{
    width: '90%',
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 50,
    marginTop: '20%',
  },

  searchText:{
    fontFamily: "Poppins_600SemiBold",
    color: Colors.white,
  },
});
