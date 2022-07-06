import React from 'react';
import {
  Image, StyleSheet, FlatList, View, Text, StatusBar, TouchableOpacity, Dimensions,
} from 'react-native';

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../styles/onboarding';
import * as Colors from '../constants/colors'
import * as Strings from '../strings/strings'

import { useFonts, Poppins_900Black, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";

import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from 'react-native-paper';

import { RoundedButton } from '../components/button';

import Signup from './SignupScreen';

const Stack = createNativeStackNavigator();

export default function Onboarding(){

  let [fontsLoaded, error] = useFonts({ 
    Poppins_700Bold, 
    Poppins_900Black,
    Poppins_600SemiBold,
    Poppins_400Regular,
    })

  return(
    <NavigationContainer>
      <Stack.Navigator
       screenOptions={{
        headerShown: false,
       }}>
        <Stack.Screen name={Strings.firstScreen} component={FirstScreen} />
        <Stack.Screen name={Strings.secondScreen} component={SecondScreen} />
        <Stack.Screen name={Strings.thirdScreen} component={ThirdScreen} />
        <Stack.Screen name={Strings.fourthScreen} component={FourthScreen} />
        <Stack.Screen name='Signup' component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

function FirstScreen (){

  const navigation = useNavigation()

  return(
    <SafeAreaView style = {styles.container}>
      <Image>
      </Image>
      <Text style = {styles.title}>{Strings.firstOnboardingTitle}</Text>
      <Text style = {styles.subtitle}>{Strings.firstOnboardingSubtitle}</Text>
      <RoundedButton style={styles.nextbutton} textStyle ={styles.textButton} text = {Strings.next}
      handlePress = {() => navigation.navigate('Second Screen')}></RoundedButton>
      <RoundedButton style={styles.skipbutton} textStyle ={styles.textButton} text = {Strings.skip} 
      handlePress = {() => navigation.push('Signup')} ></RoundedButton>
    </SafeAreaView>
    
  )
}

function SecondScreen (){

  const navigation = useNavigation();

  return(
    <SafeAreaView style = {styles.container}>
      <Image>
      </Image>
      <Text style = {styles.title}>{Strings.secondOnboardingTitle}</Text>
      <Text style = {styles.subtitle}>{Strings.secondOnboardingSubtitle}</Text>
      <RoundedButton style={styles.nextbutton} textStyle ={styles.textButton} text = {Strings.next}
      handlePress = {() => navigation.navigate('Third Screen')}></RoundedButton>
      <RoundedButton style={styles.skipbutton} textStyle ={styles.textButton} text = {Strings.back} 
      handlePress = {() => navigation.navigate('First Screen')} ></RoundedButton>
    </SafeAreaView>
    
  )
}

function ThirdScreen (){

  const navigation = useNavigation();

  return(
    <SafeAreaView style = {styles.container}>
      <Image>
      </Image>
      <Text style = {styles.title}>{Strings.thirdOnboardingTitle}</Text>
      <Text style = {styles.subtitle}>{Strings.thirdOnboardingSubtitle}</Text>
      <RoundedButton style={styles.nextbutton} textStyle ={styles.textButton} text = {Strings.next}
      handlePress = {() => navigation.navigate('Fourth Screen')}></RoundedButton>
      <RoundedButton style={styles.skipbutton} textStyle ={styles.textButton} text = {Strings.back} 
      handlePress = {() => navigation.navigate('Second Screen')} ></RoundedButton>
    </SafeAreaView>
    
  )
}

  function FourthScreen (){

    const navigation = useNavigation();
  
    return(
      <SafeAreaView style = {styles.container}>
        <Image>
        </Image>
        <Text style = {styles.title}>{Strings.fourthOnboardingTitle}</Text>
        <Text style = {styles.subtitle}>{Strings.fourthOnboardingSubtitle}</Text>
        <RoundedButton style={styles.donebutton} textStyle ={styles.textButton} text = {Strings.done}
        handlePress = {() => navigation.push('Signup')}></RoundedButton>
        <RoundedButton style={styles.skipbutton} textStyle ={styles.textButton} text = {Strings.back} 
        handlePress = {() => navigation.navigate('Third Screen')} ></RoundedButton>
      </SafeAreaView>
      
    )
  }