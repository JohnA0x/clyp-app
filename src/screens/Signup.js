import React from "react";
import * as Strings from '../strings/strings'
import {styles} from '../styles/signup'

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { Provider as PaperProvider } from 'react-native-paper';

import { useFonts, Poppins_900Black, Poppins_700Bold, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Colors from '../constants/colors'
import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import * as Input from '../components/textinput'

export default function Signup() {
    let [fontsLoaded, error] = useFonts({ 
      Poppins_700Bold, 
      Poppins_900Black,
      Poppins_600SemiBold,
      })

      const [text, setText] = React.useState("");

    return(
        <PaperProvider>
              <SafeAreaView style = {styles.container}>
            <Text style = {styles.texts}>{Strings.createAccount}</Text>

            <TextInput
            value={text}
            onChangeText={text => setText(text)}
             style ={styles.emailinput} 
             label = {<Text style = {{color: Colors.inputLabel}}>Email</Text>} 
             selectionColor = {Colors.primaryLight} left ={<TextInput.Icon name="email-outline"/>} 
             activeUnderlineColor = {Colors.backgroundColor}
             underlineColor = {Colors.backgroundColor}/>

             <TextInput
             style ={styles.passwordinput} 
             secureTextEntry = {true}
             label = {<Text style = {{color: Colors.inputLabel}}>Password</Text>} 
             selectionColor = {Colors.primaryLight} left ={<TextInput.Icon name="lock-outline"/>} 
             activeUnderlineColor = {Colors.backgroundColor}
             underlineColor = {Colors.backgroundColor}/>

            <TouchableOpacity style = {styles.button}>
            <Text style = {styles.textButton}> {Strings.signup}</Text>
            </TouchableOpacity>

            <Text style = {styles.forgotPassword}>{Strings.forgotPassword}</Text>

            <View style = {{flexDirection: 'row'}}>
            <Text>{Strings.alreadyHaveAccount}</Text>
            <Text>{Strings.login}</Text>
            </View>
            
            
        </SafeAreaView>
        </PaperProvider>
      
    );
}