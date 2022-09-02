import { StyleSheet } from "react-native";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";

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

  flatlistImage: {
    marginLeft: 10,
  },

  flatlistText: {
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

  addressInput: {
    height: 60,
    margin: "5%",
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: Colors.listHolder,
    padding: 20,
  },

  otherTextInputs: {
    height: 60,
    margin: "5%",
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: Colors.primary,
    backgroundColor: Colors.listHolder,
    padding: 20,
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
