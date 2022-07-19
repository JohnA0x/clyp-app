import * as Colors from "../constants/colors";
import * as Values from "../constants/values";
import { StyleSheet, View } from "react-native";


export const listSeparator = () => {
    return <View style={ styles.separator } />
  } 

  const styles = StyleSheet.create({
    separator: {
        height: 1,
        width: '95%',
        alignSelf: 'center',
        backgroundColor: Colors.lineSeparatora,
      },
  })