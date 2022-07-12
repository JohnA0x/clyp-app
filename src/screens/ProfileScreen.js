import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Switch, Image, ScrollView} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Strings from '../strings/strings'
import {ImageButton, VectorButton} from '../components/button'
import {styles} from '../styles/profile'

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MaterialIcons from '@expo/vector-icons/MaterialIcons'

import * as Colors from '../constants/colors'
import HomeScreen from '../screens/HomeScreen'

import { useState } from "react";


const Stack = createNativeStackNavigator();


export default function Profile(){
    return(
        <NavigationContainer independent = {true}>
          <Stack.Navigator
           screenOptions={{
            headerShown: false,
           }}>
            <Stack.Screen name='Profile' component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )
}

function ProfileScreen(){

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return(
        <SafeAreaView style = {styles.container}>

            <View style = {styles.profileContainer}>
                <ImageButton image={'https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg'}
                style = {styles.profileImage}
                imageStyle = {styles.profileImage} />
                <Text style = {styles.profileName}>Ben Sterling</Text>
                <VectorButton name = 'pencil-sharp' size = {24} color = {Colors.primaryLight} style = {styles.editProfileButton}/>
                
            </View>
         


            <View style = {styles.merchantContainer}>
                <Text style = {styles.merchantText}>{Strings.merchantmode}</Text>
                <Switch
                style = {styles.merchantSwitch}
                 trackColor={{ false: "#767577", true: "#81b0ff" }}
                 thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                 ios_backgroundColor="#3e3e3e"
                 onValueChange={toggleSwitch}
                 value={isEnabled}
               />
       
            </View>

            <TouchableOpacity style = {styles.rowContainer}>
                <VectorButton name='lock-closed-outline' size={24} color = {Colors.primaryLight} style = {styles.preferencesimage}/>
                <Text style = {styles.preferencestext}>{Strings.security}</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.rowContainer}>
                <VectorButton name='settings-outline' size={24} color = {Colors.primaryLight} style = {styles.preferencesimage}/>
                <Text style = {styles.preferencestext}>{Strings.preferences}</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.rowContainer}>
                <VectorButton name='timer-outline' size={24} color = {Colors.primaryLight} style = {styles.preferencesimage}/>
                <Text style = {styles.preferencestext}>{Strings.activity}</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.rowContainer}>
                <VectorButton name='share-social' size={24} color = {Colors.primaryLight} style = {styles.preferencesimage}/>
                <Text style = {styles.preferencestext}>{Strings.share}</Text>
            </TouchableOpacity>


            <TouchableOpacity style = {styles.rowContainer}>
                <VectorButton name='help-circle-outline' size={24} color = {Colors.primaryLight} style = {styles.preferencesimage}/>
                <Text style = {styles.preferencestext} >{Strings.help}</Text>
            </TouchableOpacity>


            <TouchableOpacity style = {styles.rowContainer}>
                <VectorButton name='information-circle-outline' size={24} color = {Colors.primaryLight} style = {styles.preferencesimage}/>
                <Text style = {styles.preferencestext}>{Strings.about}</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.rowContainer}>
                <VectorButton name='power' size={24} color = {Colors.logoutColor} style = {styles.preferencesimage}/>
                <Text style = {styles.preferencestext}>{Strings.logout}</Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}