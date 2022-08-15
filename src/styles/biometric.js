import { StyleSheet } from "react-native";
import * as Colors from "../constants/colors"


export const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 2,
        backgroundColor: Colors.backgroundColor,
    },

    authenticateText:{
        color: Colors.textColor,
        fontFamily: 'Poppins_700Bold',
        fontSize: 28,
        textAlign: 'center',
        marginTop: '50%'
    },

    close:{
        position: 'absolute',
        top: 40,
        left: 20,
       
    },

    fingerprint:{
        alignSelf: 'center',
        marginTop: '50%',
    }
})