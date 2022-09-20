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
    marginTop: "2%",
    shadowOpacity: 0,
    elevation: 1,
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

  backButton: {
    marginLeft: 10,
    position: "absolute",
    left: 0,
    zIndex: 1,
  },

  // History 
  list: {
    padding: 2,
    paddingLeft: 10,
    borderRadius: 20,
    width: "95%",
    height: 90,
    alignSelf: "center",
    backgroundColor: Colors.listHolder,
  },

  flatlist: {
    display: "flex",
    paddingVertical: 10,
    backgroundColor: Colors.listHolder,
    margin: 10,
    marginTop: 30,
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  title:{
    marginTop: 15,
    fontFamily: 'Poppins_600SemiBold',
  },

  description:{
    marginTop: 5,
    width: 200,
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
  },

  date:{
    marginTop: 1,
    width: 200,
    fontFamily: 'Poppins_500Medium',
    fontSize: 10,
  },

  status:{
    position: 'absolute',
    fontFamily: 'Poppins_500Medium',
    fontSize: 10,
    top: 50,
    right: 20,
  },


  statusIcon:{
    backgroundColor: Colors.primary,
    borderRadius: 100,
    position: 'absolute',
    right: 70,
    top: 10,
  },

  time:{
    position: 'absolute',
    right: 20,
    top: 12,
    fontSize: 10,
    fontFamily: 'Poppins_500Medium'
  },

  // Range
  fromText: {
    marginTop: 10,
    marginLeft: '5%',
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.textColor,
  },

  fromInput: {
    height: "10%",
    margin: "5%",
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: 10,
    padding: 20,
    justifyContent: "center",
  },

  toText: {
    marginTop: 10,
    marginLeft: '5%',
    fontFamily: 'Poppins_600SemiBold',
    color: Colors.textColor,
  },


  toInput: {
    height: "10%",
    margin: "5%",
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: 10,
    padding: 20,
    justifyContent: "center",
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

  modalView:{
    backgroundColor: Colors.backgroundColor,
  }
});
