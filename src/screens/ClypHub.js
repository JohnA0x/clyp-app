import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Strings from '../strings/strings'
import {styles} from '../styles/clyphub'
import { FileImageButton } from '../components/button';

import NFTSVG from '../drawables/vector/clyphub/nfts.svg'
import BILLSVG from '../drawables/vector/clyphub/bills.svg'
import TRANSFERSVG from '../drawables/vector/clyphub/transfer.svg'
import RECHARGESVG from '../drawables/vector/clyphub/recharge.svg'
import SAVINGSSVG from '../drawables/vector/clyphub/savings.svg'
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ClypHub(){
    return(
        <SafeAreaView style = {styles.container}>

            <View>
                <Text style = {styles.headerText}>{Strings.clyphub}</Text>
            </View>

            <View style = {styles.optionsContainer}>

            <View style = {styles.rowContainer}>
            <TouchableOpacity>
                <NFTSVG width = {120} height = {120}/>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.button}>
                <BILLSVG width = {120} height = {120}/>
            </TouchableOpacity>
            </View>

            <View style = {styles.rowContainer}>
            <TouchableOpacity>
                <TRANSFERSVG width = {120} height = {120}/>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.button}>
                <RECHARGESVG width = {120} height = {120}/>
            </TouchableOpacity>
            </View>

            <View style = {styles.rowContainer}>
            <TouchableOpacity>
                <SAVINGSSVG width = {120} height = {120}/>
            </TouchableOpacity>
            </View>
           

            </View>
          
        </SafeAreaView>
    )
}