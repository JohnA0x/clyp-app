import { View, Text, StyleSheet } from "react-native";
import * as Colors from "../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.backgroundColor,
  },

  // Main Screen
  rowContainer:{
    flex: 1,
    padding: 5,
  },

  backButton: {
    marginLeft: 10,
    position: "absolute",
    left: 10,
    top: "7%",
    zIndex: 1,
  },

  profileImage: {
    width: 100,
    height: 100,
    marginTop: 15,
    alignSelf: "center",
    borderRadius: 100,
  },

  profileName: {
    fontSize: 20,
    marginRight: 5,
    marginTop: 30,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    color: Colors.textColor,
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

  flatlistImage: {
    marginLeft: 10,
  },

  flatlistText: {
    marginLeft: 20,
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
    color: Colors.textColor,
  },


  // username
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

});
