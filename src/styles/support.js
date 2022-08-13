import { StyleSheet } from "react-native";
import * as Strings from '../strings/strings'
import * as Colors from '../constants/colors'

export const styles = StyleSheet.create({
    container:{
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
        left: 0,
        zIndex: 1,
      },
})