import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Strings from '../strings/strings'
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function ClypHub(){
    return(
        <SafeAreaView>

            <View>
                <Text>{Strings.clyphub}</Text>
            </View>

            <View>
                <TouchableOpacity>
                    <Image >
                        <Text>

                        </Text>
                    </Image>

                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}