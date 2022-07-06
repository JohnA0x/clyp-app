import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/screens/SignupScreen';
import Onboarding from './src/screens/OnboardingScreen';
import { useFonts, Poppins_900Black, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from "@expo-google-fonts/poppins";

import AppLoading from 'expo-app-loading';

export default function App() {

  let [fontsLoaded, error] = useFonts({ 
    Poppins_700Bold, 
    Poppins_900Black,
    Poppins_600SemiBold,
    Poppins_400Regular,
    })

    if (!fontsLoaded) {
      return <AppLoading />;
    }

  return <Onboarding/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
