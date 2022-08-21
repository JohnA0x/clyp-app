import { StyleSheet } from "react-native";
import * as Colors from "../../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.backgroundColor,
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
    left: 10,
    top: "7%",
    zIndex: 1,
  },

  svg:{
    alignSelf: 'center',
  },

  successText:{
    color: Colors.successColor,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    textAlign: 'center',
  },

  failedText:{
    color: Colors.failedColor,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    textAlign: 'center',
  },

  valueText:{
    color: Colors.textColor,
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },

  dollarText:{
    color: Colors.textColor,
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    textAlign: 'center',
  },

  breakDownView:{
    alignSelf: 'center',
    backgroundColor: Colors.listHolder,
    borderRadius: 20,
    marginTop: 20,
    padding: 20,
    width: '90%',
  },

  topBreakDownSubview:{
    flexDirection: 'row',
  },

  breakDownSubview:{
    flexDirection: 'row',
    marginTop: 25,
  },

  breakdownTitle:{
    fontFamily: 'Poppins_700Bold'
  },

  breakdownDescription:{
    fontFamily: 'Poppins_500Medium',
    position: 'absolute',
    right: 0,
    width: 90,
    textAlign: 'right',
  }
});
