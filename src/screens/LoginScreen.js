import React from "react";
import * as Strings from "../strings/strings";
import { styles } from "../styles/login";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider as PaperProvider } from "react-native-paper";

import {
  useFonts,
  Poppins_900Black,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { TextInput } from "react-native-paper";
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Colors from "../constants/colors";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import SignupScreen from "./SignupScreen";
import ForgotPassword from "./ForgotPassword";

import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import { ResponseType } from "expo-auth-session";

import axios from "../components/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuNavigation from "../navigations/MenuNavigation";
import { CustomAlert } from "../components/alert";
import BiometricScreen from "./BiometricScreen";
import {
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync,
} from "expo-local-authentication";

import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeAction";
import { lightTheme, darkTheme } from "../constants/theme";

const Stack = createNativeStackNavigator();

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  let [fontsLoaded, error] = useFonts({
    Poppins_700Bold,
    Poppins_900Black,
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="MenuNavigation" component={MenuNavigation} />
      <Stack.Screen name="BiometricScreen" component={BiometricScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

function LoginScreen({ navigation }) {
  //const navigation = useNavigation()

  const [text, setText] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    async function fetchStorage() {
      let email = await AsyncStorage.getItem("email").then((value) => value);
      setText(email ? email : "");
    }

    fetchStorage();
  }, []);

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "390391096288445",
    responseType: ResponseType.Code,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log(response);

      const fetchData = async () => {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        };

        console.log(request);
        const link = `https://graph.facebook.com/v12.0/oauth/access_token?client_id=390391096288445&redirect_uri=https%3A%2F%2Fauth.expo.io%2F%40gabrielclyp%2Fclyppay&client_secret=9a6c3e717df46a3fe104d4aec0ecac7d&code=${code}&code_verifier=${request?.codeVerifier}`;

        const response = await fetch(link, requestOptions);
        const body = await response.json();
        axios
          .post("/user-gateway/facebook", { access_token: body.access_token })
          .then(async (data) => {
            console.log({
              facebook_data: data.data,
            });

            if (data.data.message == "success") {
              await AsyncStorage.setItem(
                "token",
                data.data.token,
                async (err) => {
                  console.log({ err });
                  if (err) {
                    console.log(err);
                    return;
                  }
                  await AsyncStorage.setItem(
                    "user_id",
                    data.data.user_data.id,
                    async (err) => {
                      await AsyncStorage.setItem(
                        "email",
                        data.data.user_data.email,
                        (err) => {
                          navigation.navigate("BiometricScreen");
                        }
                      );
                    }
                  );
                }
              );
            } else {
              CustomAlert({
                title: "Signup Error",
                subtitle: data.data.details,
                handlePress: () => {},
              });
              return false;
            }
          })
          .catch((err) => {
            CustomAlert({
              title: "Signup Error",
              subtitle: err,
              handlePress: () => {},
            });
          });
        console.log("fetchData response: => ", body);
      };
      fetchData();
    }
  }, [response]);

  const [grequest, gresponse, googlePromptAsync] = Google.useAuthRequest({
    responseType: "id_token",
    expoClientId:
      "322534561816-ru2tu1fbhpcki4cooeh93l9ljrb0febt.apps.googleusercontent.com",
    //iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    //androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    // webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  });

  React.useEffect(() => {
    if (gresponse?.type === "success") {
      const { authentication } = gresponse;
      console.log(gresponse);
      axios
        .post("/user-gateway/google", { token: gresponse.params.id_token })
        .then(async (data) => {
          console.log({
            google_data: data.data,
          });

          if (data.data.message == "success") {
            await AsyncStorage.setItem(
              "token",
              data.data.token,
              async (err) => {
                console.log({ err });
                if (err) {
                  console.log(err);
                  return;
                }
                await AsyncStorage.setItem(
                  "user_id",
                  data.data.user_data.id,
                  async (err) => {
                    await AsyncStorage.setItem(
                      "email",
                      data.data.user_data.email,
                      (err) => {
                        navigation.navigate("MenuNavigation");
                      }
                    );
                  }
                );
              }
            );
          } else {
            CustomAlert({
              title: "Signup Error",
              subtitle: data.data.details,
              handlePress: () => {},
            });
            return false;
          }
        });
      // navigation.navigate("MenuNavigation")
    }
  }, [gresponse]);

  // Login API
  const login = () => {
    let data = {
      email: text,
      password: password,
    };

    if (data.email === "" || data.password === "") {
      CustomAlert({
        title: "All fields Required",
        subtitle: "Please provide your email and password",
        handlePress: () => {},
      });
      return false;
    }
    axios
      .post("/user-gateway/login", data)
      .then(async (data) => {
        if (data.data.message == "success") {
          await AsyncStorage.setItem("token", data.data.token, async (err) => {
            console.log({ err });
            if (err) {
              console.log(err);
              return;
            }
            await AsyncStorage.setItem(
              "user_id",
              data.data.user.id,
              async (err) => {
                await AsyncStorage.setItem(
                  "email",
                  data.data.user.email,
                  (err) => {
                    navigation.navigate("MenuNavigation");
                  }
                );
              }
            );
          });
        } else {
          CustomAlert({
            title: "Login Error",
            subtitle: data.data.details,
            handlePress: () => {},
          });
          return false;
        }
      })
      .catch((err) => {
        CustomAlert({
          title: "Login Error",
          subtitle: "Error making request, please try again...",
          handlePress: () => {},
        });
        console.log({ err });
      });
  };

  const biometricsAuth = async (message) => {
    const compatible = await hasHardwareAsync();
    if (!compatible)
      alert("This device is not compatible for biometric authentication");
    message = "This device is not compatible for biometric authentication";

    const enrolled = await isEnrolledAsync();
    if (!enrolled)
      alert("This device doesn't have biometric authentication enabled");
    message = "This device doesn't have biometric authentication enabled";

    const result = await authenticateAsync();
    if (result.success) navigation.navigate("MenuNavigation");
    if (!result.success) throw `${result.error} - Authentication unsuccessful`;
    return;
  };

  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        {theme.mode === "light" ? (
          <Button
            title="Switch Dark theme"
            style={styles.themeButton}
            onPress={() => dispatch(switchTheme(darkTheme))}
          />
        ) : (
          <Button
            title="Switch Light theme"
            style={styles.themeButton}
            onPress={() => dispatch(switchTheme(lightTheme))}
          />
        )}

        <Text style={styles.texts}>{Strings.loginAccount}</Text>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text.toLowerCase())}
          style={styles.emailinput}
          label={<Text style={{ color: Colors.inputLabel }}>Email</Text>}
          selectionColor={Colors.primary}
          left={<TextInput.Icon name="email-outline" />}
          activeUnderlineColor={Colors.backgroundColor}
          underlineColor={Colors.backgroundColor}
        />

        <TextInput
          style={styles.passwordinput}
          value={password}
          onChangeText={(val) => setPassword(val)}
          secureTextEntry={true}
          label={<Text style={{ color: Colors.inputLabel }}>Password</Text>}
          selectionColor={Colors.primary}
          left={<TextInput.Icon name="lock-outline" />}
          right={
            <TextInput.Icon
              name="fingerprint"
              color={Colors.primary}
              size={24}
              style={{ right: 10 }}
              onPress={biometricsAuth}
            />
          }
          activeUnderlineColor={Colors.backgroundColor}
          underlineColor={Colors.backgroundColor}
        ></TextInput>

        <TouchableOpacity style={styles.button} onPress={() => login()}>
          <Text style={styles.textButton}> {Strings.login}</Text>
        </TouchableOpacity>

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
            />
          </TouchableWithoutFeedback>

          {/*             <TouchableWithoutFeedback>
              <Image style = {{marginLeft: 50}}
              source={{width: 25, height: 25, uri: 'https://cdn-icons-png.flaticon.com/512/15/15476.png'}}/>
            </TouchableWithoutFeedback> */}
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.dontHaveAccount}>{Strings.dontHaveAccount}</Text>
          <Text
            style={styles.signup}
            onPress={() => navigation.navigate("Signup")}
          >
            {Strings.signup}
          </Text>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}
