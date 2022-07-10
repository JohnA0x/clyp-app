import React from "react";
import * as Strings from '../strings/strings'
import {styles} from '../styles/signup'

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useFonts, Poppins_900Black, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Colors from '../constants/colors'
import { TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import LoginScreen from "./LoginScreen";
import MenuNavigation from "../navigations/MenuNavigation";

import { RoundedButton } from "../components/button";

import * as Input from '../components/textinput'

const Stack = createNativeStackNavigator();

export default function Signup() {
    let [fontsLoaded, error] = useFonts({ 
      Poppins_700Bold, 
      Poppins_900Black,
      Poppins_600SemiBold,
      Poppins_400Regular,
      })

      const [text, setText] = React.useState("");

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

function SignupScreen(){

  const navigation = useNavigation()

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
        <Text style = {styles.textButton} onPress = {() => navigation.navigate('MenuNavigation')}> {Strings.signup}</Text>
        </TouchableOpacity>

        <Text style = {styles.forgotPassword}>{Strings.forgotPassword}</Text>

        <View style = {styles.socialContainer}>
          <TouchableWithoutFeedback>
            <Image source={{width: 25, height: 25, uri: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png'}}/>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback>
            <Image style = {{marginLeft: 50}}
            source={{width: 24, height: 24, uri: 'https://cdn-icons-png.flaticon.com/512/281/281764.png'}}/>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback>
            <Image style = {{marginLeft: 50}}
            source={{width: 25, height: 25, uri: 'https://cdn-icons-png.flaticon.com/512/15/15476.png'}}/>
          </TouchableWithoutFeedback>
        </View>

        <View style = {styles.rowContainer}>
        <Text style = {styles.alreadyHaveAccount}>{Strings.alreadyHaveAccount}</Text>
        <Text style = {styles.login} onPress={()=> navigation.navigate('Login')}>{Strings.login}</Text>
        </View>
        
        
    </SafeAreaView>
    </PaperProvider>
  
);
}