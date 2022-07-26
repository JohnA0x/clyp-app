import React from "react";
import * as Strings from "../strings/strings";
import { styles, nameStyles } from "../styles/signup";

import * as Font from "expo-font";
import { AppLoading } from "expo";

import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  useFonts,
  Poppins_900Black,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { Button, TextInput } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Colors from "../constants/colors";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoginScreen from "./LoginScreen";
import MenuNavigation from "../navigations/MenuNavigation";

import { RoundedButton } from "../components/button";

import * as Input from "../components/textinput";
import ForgotPassword from "./ForgotPassword";
import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import { ResponseType } from "expo-auth-session";

const Stack = createNativeStackNavigator();

WebBrowser.maybeCompleteAuthSession();

export default function Signup() {
  let [fontsLoaded, error] = useFonts({
    Poppins_700Bold,
    Poppins_900Black,
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  const [text, setText] = React.useState("");

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Signup" component={InputNameScreen} />
        <Stack.Screen
          name="CompleteEmailSignup"
          component={EmailSignupScreen}
        />
        <Stack.Screen
          name="CompletePhoneSignup"
          component={PhoneSignupScreen}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MenuNavigation" component={MenuNavigation} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function InputNameScreen() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const navigation = useNavigation();

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.texts}>{Strings.createAccount}</Text>
        <TextInput
          value={firstName}
          onChangeText={(firstName) => setText(firstName)}
          style={nameStyles.firstNameInput}
          label={<Text style={{ color: Colors.inputLabel }}>First Name</Text>}
          selectionColor={Colors.primary}
          activeUnderlineColor={Colors.backgroundColor}
          underlineColor={Colors.backgroundColor}
        />

        <TextInput
          value={lastName}
          onChangeText={(lastName) => setText(lastName)}
          style={nameStyles.lastNameInput}
          secureTextEntry={true}
          label={<Text style={{ color: Colors.inputLabel }}>Last Name</Text>}
          selectionColor={Colors.primary}
          activeUnderlineColor={Colors.backgroundColor}
          underlineColor={Colors.backgroundColor}
        />

        <TouchableOpacity
          style={nameStyles.button}
          onPress={() => navigation.navigate("CompleteEmailSignup")}
        >
          <Text
            style={nameStyles.textButton}
            onPress={() => navigation.navigate("CompleteEmailSignup")}
          >
            {" "}
            {Strings.next}
          </Text>
        </TouchableOpacity>
        <Text
          style={nameStyles.forgotPassword}
          onPress={() => navigation.replace("ForgotPassword")}
        >
          {Strings.forgotPassword}
        </Text>

        <View style={nameStyles.socialContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              promptAsync();
            }}
          >
            <Image
              source={{
                width: 25,
                height: 25,
                uri: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png",
              }}
            />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              googlePromptAsync();
            }}
          >
            <Image
              style={{ marginLeft: 50 }}
              source={{
                width: 24,
                height: 24,
                uri: "https://cdn-icons-png.flaticon.com/512/281/281764.png",
              }}
              onPress={() => {
                promptAsync();
              }}
            />
          </TouchableWithoutFeedback>
          {/* 
          <TouchableWithoutFeedback>
            <Image
              style={{ marginLeft: 50 }}
              source={{
                width: 25,
                height: 25,
                uri: "https://cdn-icons-png.flaticon.com/512/15/15476.png",
              }}
            />
          </TouchableWithoutFeedback> */}
        </View>

        <View style={nameStyles.rowContainer}>
          <Text style={nameStyles.alreadyHaveAccount}>
            {Strings.alreadyHaveAccount}
          </Text>
          <Text
            style={styles.login}
            onPress={() => navigation.navigate("Login")}
          >
            {Strings.login}
          </Text>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

// Email Signup
function EmailSignupScreen() {
  const navigation = useNavigation();

  const [text, setText] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "390391096288445",
    responseType: ResponseType.Code,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      navigation.navigate("MenuNavigation");
    }
  }, [response]);

  const [grequest, gresponse, googlePromptAsync] = Google.useAuthRequest({
    expoClientId:
      "322534561816-ru2tu1fbhpcki4cooeh93l9ljrb0febt.apps.googleusercontent.com",
    //iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    //androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (gresponse?.type === "success") {
      const { authentication } = gresponse;
      navigation.navigate("MenuNavigation");
    }
  }, [gresponse]);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.texts}>{Strings.createAccount}</Text>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          style={styles.emailinput}
          label={<Text style={{ color: Colors.inputLabel }}>Email</Text>}
          selectionColor={Colors.primary}
          left={<TextInput.Icon name="email-outline" />}
          activeUnderlineColor={Colors.backgroundColor}
          underlineColor={Colors.backgroundColor}
        />

        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={styles.passwordinput}
          secureTextEntry={true}
          label={<Text style={{ color: Colors.inputLabel }}>Password</Text>}
          selectionColor={Colors.primary}
          left={<TextInput.Icon name="lock-outline" />}
          activeUnderlineColor={Colors.backgroundColor}
          underlineColor={Colors.backgroundColor}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MenuNavigation")}
        >
          <Text
            style={styles.textButton}
            onPress={() => navigation.navigate("MenuNavigation")}
          >
            {" "}
            {Strings.signup}
          </Text>
        </TouchableOpacity>

        <Text
          style={styles.usemobileNumber}
          onPress={() => navigation.replace("CompletePhoneSignup")}
        >
          {Strings.mobileNumber}
        </Text>

        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.replace("ForgotPassword")}
        >
          {Strings.forgotPassword}
        </Text>

        <View style={styles.socialContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              promptAsync();
            }}
          >
            <Image
              source={{
                width: 25,
                height: 25,
                uri: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png",
              }}
            />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              googlePromptAsync();
            }}
          >
            <Image
              style={{ marginLeft: 50 }}
              source={{
                width: 24,
                height: 24,
                uri: "https://cdn-icons-png.flaticon.com/512/281/281764.png",
              }}
              onPress={() => {
                promptAsync();
              }}
            />
          </TouchableWithoutFeedback>
          {/* 
          <TouchableWithoutFeedback>
            <Image
              style={{ marginLeft: 50 }}
              source={{
                width: 25,
                height: 25,
                uri: "https://cdn-icons-png.flaticon.com/512/15/15476.png",
              }}
            />
          </TouchableWithoutFeedback> */}
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.alreadyHaveAccount}>
            {Strings.alreadyHaveAccount}
          </Text>
          <Text
            style={styles.login}
            onPress={() => navigation.navigate("Login")}
          >
            {Strings.login}
          </Text>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

function PhoneSignupScreen() {
  const navigation = useNavigation();

  const [text, setText] = React.useState("");

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "390391096288445",
    responseType: ResponseType.Code,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      navigation.navigate("MenuNavigation");
    }
  }, [response]);

  const [grequest, gresponse, googlePromptAsync] = Google.useAuthRequest({
    expoClientId:
      "322534561816-ru2tu1fbhpcki4cooeh93l9ljrb0febt.apps.googleusercontent.com",
    //iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    //androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (gresponse?.type === "success") {
      const { authentication } = gresponse;
      navigation.navigate("MenuNavigation");
    }
  }, [gresponse]);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.texts}>{Strings.createAccount}</Text>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          style={styles.emailinput}
          label={<Text style={{ color: Colors.inputLabel }}>Phone Number</Text>}
          selectionColor={Colors.primary}
          left={<TextInput.Icon name="email-outline" />}
          activeUnderlineColor={Colors.backgroundColor}
          underlineColor={Colors.backgroundColor}
        />

        <TextInput
          style={styles.passwordinput}
          secureTextEntry={true}
          label={<Text style={{ color: Colors.inputLabel }}>Password</Text>}
          selectionColor={Colors.primary}
          left={<TextInput.Icon name="lock-outline" />}
          activeUnderlineColor={Colors.backgroundColor}
          underlineColor={Colors.backgroundColor}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MenuNavigation")}
        >
          <Text
            style={styles.textButton}
            onPress={() => navigation.navigate("MenuNavigation")}
          >
            {" "}
            {Strings.signup}
          </Text>
        </TouchableOpacity>

        <Text
          style={styles.usemobileNumber}
          onPress={() => navigation.replace("CompleteEmailSignup")}
        >
          {Strings.email}
        </Text>

        <Text
          style={styles.forgotPassword}
          onPress={() => navigation.replace("ForgotPassword")}
        >
          {Strings.forgotPassword}
        </Text>

        <View style={styles.socialContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              promptAsync();
            }}
          >
            <Image
              source={{
                width: 25,
                height: 25,
                uri: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png",
              }}
            />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              googlePromptAsync();
            }}
          >
            <Image
              style={{ marginLeft: 50 }}
              source={{
                width: 24,
                height: 24,
                uri: "https://cdn-icons-png.flaticon.com/512/281/281764.png",
              }}
              onPress={() => {
                promptAsync();
              }}
            />
          </TouchableWithoutFeedback>
          {/* 
          <TouchableWithoutFeedback>
            <Image
              style={{ marginLeft: 50 }}
              source={{
                width: 25,
                height: 25,
                uri: "https://cdn-icons-png.flaticon.com/512/15/15476.png",
              }}
            />
          </TouchableWithoutFeedback> */}
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.alreadyHaveAccount}>
            {Strings.alreadyHaveAccount}
          </Text>
          <Text
            style={styles.login}
            onPress={() => navigation.navigate("Login")}
          >
            {Strings.login}
          </Text>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}
