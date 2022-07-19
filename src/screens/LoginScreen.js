import React from "react";
import * as Strings from '../strings/strings'
import {styles} from '../styles/login'

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider as PaperProvider } from 'react-native-paper';

import { useFonts, Poppins_900Black, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import * as Colors from '../constants/colors'
import { TouchableOpacity } from "react-native";

import SignupScreen from "./SignupScreen";
import ForgotPassword from "./ForgotPassword";

const Stack = createNativeStackNavigator();



export default function Login() {
    let [fontsLoaded, error] = useFonts({ 
        Poppins_700Bold, 
        Poppins_900Black,
        Poppins_600SemiBold,
        Poppins_400Regular,
        })

        return(
            <NavigationContainer independent = {true}>
              <Stack.Navigator
               screenOptions={{
                headerShown: false,
               }}>
                <Stack.Screen name='Login' component={LoginScreen}/>
                <Stack.Screen name='Signup' component={SignupScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              </Stack.Navigator>
            </NavigationContainer>
          )
}

function LoginScreen({navigation}){

    //const navigation = useNavigation()
  
    const [text, setText] = React.useState("");
  
    return(
      <PaperProvider>
          <SafeAreaView style = {styles.container}>
          <Text style = {styles.texts}>{Strings.loginAccount}</Text>
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
          <Text style = {styles.textButton}> {Strings.login}</Text>
          </TouchableOpacity>
  
          <Text style = {styles.forgotPassword}
          onPress={() => navigation.replace("ForgotPassword")}
          >{Strings.forgotPassword}</Text>
  
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
          <Text style = {styles.dontHaveAccount}>{Strings.dontHaveAccount}</Text>
          <Text style = {styles.signup} onPress={()=>navigation.navigate('Signup')}>{Strings.signup}</Text>
          </View>
          
          
      </SafeAreaView>
      </PaperProvider>
    
  );
  }