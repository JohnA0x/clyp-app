import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Strings from '../strings/strings'
import {ImageButton} from '../components/button'

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Ionico, MaterialIcons} from '@expo/vector-icons'


const Stack = createNativeStackNavigator();

export default function Profile(){
    return(
        <NavigationContainer independent = {true}>
          <Stack.Navigator
           screenOptions={{
            headerShown: false,
           }}>
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='MenuNavigation' component={MenuNavigation} />
          </Stack.Navigator>
        </NavigationContainer>
      )
}

function ProfileScreen(){
    return(
        <SafeAreaView>
            <View>
                <ImageButton image={'https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg'}
                />
            </View>
        </SafeAreaView>
    )
}