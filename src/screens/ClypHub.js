import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Strings from '../strings/strings'
import {styles} from '../styles/clyphub'
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ClypHub(){
    return(
        <SafeAreaView style = {styles.container}>

            <View style={styles.container}>
                <Text style = {styles.headerText}>{Strings.clyphub}</Text>
            </View>
        </SafeAreaView>
    )
}