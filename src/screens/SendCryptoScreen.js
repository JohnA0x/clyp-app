import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import filter from 'lodash.filter';
import { VectorButton } from '../components/button';
import {styles} from '../styles/sendcrypto'
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";


export default function SendCryptoScreen({navigation}){
  return (
    <SafeAreaView>
       <View style={styles.preferencesHeader}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.home)}
        />
        <Text style={styles.preferencesHeaderText}>{Strings.sendCrypto}</Text>
        </View>
    </SafeAreaView>
  )
}
