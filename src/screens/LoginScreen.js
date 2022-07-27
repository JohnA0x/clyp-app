import React from "react";
import * as Strings from '../strings/strings'
import { styles } from '../styles/login'

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

import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';

import axios from '../components/axios'
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuNavigation from "../navigations/MenuNavigation";
import { CustomAlert } from "../components/alert";

const Stack = createNativeStackNavigator();

WebBrowser.maybeCompleteAuthSession();


export default function Login() {
  let [fontsLoaded, error] = useFonts({
    Poppins_700Bold,
    Poppins_900Black,
    Poppins_600SemiBold,
    Poppins_400Regular,
  })

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Signup' component={SignupScreen} />
        <Stack.Screen name="MenuNavigation" component={MenuNavigation} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function LoginScreen({ navigation }) {

  //const navigation = useNavigation()

  const [text, setText] = React.useState("");
  const [password, setPassword] = React.useState("");


  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '390391096288445',
    responseType: ResponseType.Code,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
    }
  }, [response]);


  const [grequest, gresponse, googlePromptAsync] = Google.useAuthRequest({
    expoClientId: '322534561816-ru2tu1fbhpcki4cooeh93l9ljrb0febt.apps.googleusercontent.com',
    //iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    //androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (gresponse?.type === 'success') {
      const { authentication } = gresponse;
    }
  }, [gresponse]);

  // Login API
  const login = () => {

    let data = {
      email: text,
      password: password
    }
    
    if(data.email === "" || data.password === ""){
      CustomAlert({title: "All fields Required", subtitle: "Please provide your email and password", handlePress: () => {}})
      return false
    }
    axios.post('/user-gateway/login', data)
      .then(data => {
        
        if (data.data.message == "success") {
          console.log({token: data.data.token})
          console.log({id: data.data.user.id})
          AsyncStorage.setItem('token', data.data.token, (err) => {
            console.log({err})
            if(err) {
              console.log(err)
              return
            }
            AsyncStorage.setItem("user_id", data.data.user.id, (err) => {
              navigation.navigate("MenuNavigation")
            })
          })
          
        } else {
          CustomAlert({title: "Login Error", subtitle: data.data.details, handlePress: () => {}})
          return false
        }
      })
      .catch(err => {
        CustomAlert({title: "Login Error", subtitle: "Error making request, please try again...", handlePress: () => {}})
        console.log({err})
      })
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.texts}>{Strings.loginAccount}</Text>
        <TextInput
          value={text}
          onChangeText={text => setText(text)}
          style={styles.emailinput}
          label={<Text style={{ color: Colors.inputLabel }}>Email</Text>}
          selectionColor={Colors.primary} left={<TextInput.Icon name="email-outline" />}
          activeUnderlineColor={Colors.backgroundColor}
          underlineColor={Colors.backgroundColor} />

        <TextInput
          style={styles.passwordinput}
          value={password}
          onChangeText={(val) => setPassword(val)}
          secureTextEntry={true}
          label={<Text style={{ color: Colors.inputLabel }}>Password</Text>}
          selectionColor={Colors.primary} left={<TextInput.Icon name="lock-outline" />}
          activeUnderlineColor={Colors.backgroundColor}
          underlineColor={Colors.backgroundColor} />

        <TouchableOpacity style={styles.button} onPress={() => login()}>
          <Text style={styles.textButton}> {Strings.login}</Text>
        </TouchableOpacity>

        <Text style={styles.forgotPassword}
          onPress={() => navigation.replace("ForgotPassword")}
        >{Strings.forgotPassword}</Text>

        <View style={styles.socialContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              promptAsync();
            }}>
            <Image source={{ width: 25, height: 25, uri: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png' }} />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              googlePromptAsync();
            }}>
            <Image style={{ marginLeft: 50 }}
              source={{ width: 24, height: 24, uri: 'https://cdn-icons-png.flaticon.com/512/281/281764.png' }} />
          </TouchableWithoutFeedback>

          {/*             <TouchableWithoutFeedback>
              <Image style = {{marginLeft: 50}}
              source={{width: 25, height: 25, uri: 'https://cdn-icons-png.flaticon.com/512/15/15476.png'}}/>
            </TouchableWithoutFeedback> */}
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.dontHaveAccount}>{Strings.dontHaveAccount}</Text>
          <Text style={styles.signup} onPress={() => navigation.navigate('Signup')}>{Strings.signup}</Text>
        </View>


      </SafeAreaView>
    </PaperProvider>

  );
}