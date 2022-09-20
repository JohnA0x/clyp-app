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
import axios from "../components/axios";
import { CustomAlert } from "../components/alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProcessingModal } from "../components/modal";
import { getData } from "../services/storage";
import * as Values from "../constants/values";

import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

WebBrowser.maybeCompleteAuthSession();

export default function Signup() {
  let [fontsLoaded, error] = useFonts({
    Poppins_700Bold,
    Poppins_900Black,
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  const value = AsyncStorage.getItem(Values.theme);
  // const [text, setText] = React.useState("");
  getData(Values.theme);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Signup" component={NameSignupScreen} />

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

//Name Signup
function NameSignupScreen({ route }) {
  const navigation = useNavigation();

  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientSecret: "9a6c3e717df46a3fe104d4aec0ecac7d",
    clientId: "390391096288445",
    responseType: ResponseType.Code,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log(response);

      const fetchData = async () => {
        setIsVisible(true);
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
            setIsVisible(false);
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
          })
          .catch((err) => {
            setIsVisible(false);
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
    iosClientId:
      "322534561816-mg5aevkegg6lp3o98h5nc91ejgr4bj57.apps.googleusercontent.com",
    androidClientId:
      "322534561816-4u37l993k91k84mdfu0afg17eajhufjg.apps.googleusercontent.com",
    webClientId:
      "322534561816-lfr6keodqdfv9ro5ume47pv9ieh952g7.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (gresponse?.type === "success") {
      const { authentication } = gresponse;
      console.log(gresponse);
      setIsVisible(true);
      axios
        .post("/user-gateway/google", { token: gresponse.params.id_token })
        .then(async (data) => {
          setIsVisible(false);
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
        })
        .catch((err) => {
          setIsVisible(false);
          CustomAlert({
            title: "Signup Error",
            subtitle: err,
            handlePress: () => {},
          });
        });
      // navigation.navigate("MenuNavigation")
    }
  }, [gresponse]);

  return (
    <PaperProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.texts, { color: theme.text }]}>
          {Strings.createAccount}
        </Text>
        <TextInput
          value={first_name}
          onChangeText={(text) => setFirstName(text)}
          style={[styles.emailinput, { backgroundColor: theme.textinput }]}
          label={<Text style={{ color: Colors.inputLabel }}>First Name</Text>}
          selectionColor={Colors.primary}
          left={<TextInput.Icon name="alpha-f" color={theme.primary} />}
          activeUnderlineColor={theme.background}
          underlineColor={theme.background}
          theme={{ colors: { text: theme.text} }}
        />

        <TextInput
          value={last_name}
          onChangeText={(text) => setLastName(text)}
          style={[styles.passwordinput, { backgroundColor: theme.textinput }]}
          secureTextEntry={false}
          label={<Text style={{ color: Colors.inputLabel }}>Last Name</Text>}
          selectionColor={Colors.primary}
          left={<TextInput.Icon name="alpha-l" color={theme.primary} />}
          activeUnderlineColor={theme.background}
          underlineColor={theme.background}
          theme={{ colors: { text: theme.text} }}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("CompleteEmailSignup", {
              first_name,
              last_name,
            })
          }
        >
          <Text
            style={styles.textButton}
            onPress={() =>
              navigation.navigate("CompleteEmailSignup", {
                first_name,
                last_name,
              })
            }
          >
            {" "}
            {Strings.next}
          </Text>
        </TouchableOpacity>

        {/* <Text
          style={styles.usemobileNumber}
          onPress={() => navigation.replace("CompletePhoneSignup")}
        >
          {Strings.mobileNumber}
        </Text> */}

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
          <Text
            style={styles.alreadyHaveAccount}
            onPress={() => navigation.navigate("MenuNavigation")}
          >
            {Strings.alreadyHaveAccount}
          </Text>
          <Text
            style={styles.login}
            onPress={() => navigation.navigate("Login")}
          >
            {Strings.login}
          </Text>
        </View>
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    </PaperProvider>
  );
}

function EmailSignupScreen({ route }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientSecret: "9a6c3e717df46a3fe104d4aec0ecac7d",
    clientId: "390391096288445",
    responseType: ResponseType.Code,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log(response);

      const fetchData = async () => {
        setIsVisible(true);
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
            setIsVisible(false);
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
          })
          .catch((err) => {
            setIsVisible(false);
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
    iosClientId:
      "322534561816-mg5aevkegg6lp3o98h5nc91ejgr4bj57.apps.googleusercontent.com",
    androidClientId:
      "322534561816-4u37l993k91k84mdfu0afg17eajhufjg.apps.googleusercontent.com",
    webClientId:
      "322534561816-lfr6keodqdfv9ro5ume47pv9ieh952g7.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (gresponse?.type === "success") {
      const { authentication } = gresponse;
      console.log(gresponse);
      setIsVisible(true);
      axios
        .post("/user-gateway/google", { token: gresponse.params.id_token })
        .then(async (data) => {
          setIsVisible(false);
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
        })
        .catch((err) => {
          setIsVisible(false);
          CustomAlert({
            title: "Signup Error",
            subtitle: err,
            handlePress: () => {},
          });
        });
      // navigation.navigate("MenuNavigation")
    }
  }, [gresponse]);

  const navigation = useNavigation();

  const register = () => {
    setIsVisible(true);
    let data = {
      first_name: route.params.first_name,
      last_name: route.params.last_name,
      email: email,
      password: password,
    };
    console.log(data);

    if (
      data.first_name === "" ||
      data.last_name === "" ||
      data.email === "" ||
      data.password == ""
    ) {
      setIsVisible(false);
      CustomAlert({
        title: "Sign up error",
        subtitle: "Please provide your sign up details completely",
        handlePress: () => {},
      });
      return false;
    }
    if (data.password.length < 8) {
      setIsVisible(false);
      CustomAlert({
        title: "Sign up error",
        subtitle: "Password is too short (Minmum of 8 characters)",
        handlePress: () => {},
      });
      return false;
    }
    if (data.password !== confirmPassword) {
      setIsVisible(false);
      CustomAlert({
        title: "Sign up error",
        subtitle: "Passwords does not match",
        handlePress: () => {},
      });
      return false;
    }

    axios
      .post("/user-gateway/register", data)
      .then(async (data) => {
        setIsVisible(false);
        if (data.data.message == "success") {
          await AsyncStorage.setItem("token", data.data.token, async (err) => {
            await AsyncStorage.setItem(
              "user_id",
              data.data.user_data.id,
              async (err) => {
                await AsyncStorage.setItem(
                  "email",
                  data.data.user_data.email,
                  async (err) => {
                    navigation.navigate("MenuNavigation");
                  }
                );
              }
            );
          });
        } else {
          CustomAlert({
            title: "Sign up Error",
            subtitle: data.data.details,
            handlePress: () => {},
          });
          return false;
        }
      })
      .catch((err) => {
        setIsVisible(false);
        CustomAlert({
          title: "Sign up Error",
          subtitle: "Error making request, please try again...",
          handlePress: () => {},
        });
        console.log({ err });
      });
  };

  return (
    <PaperProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.texts, { color: theme.text }]}>
          {Strings.createAccount}
        </Text>

        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          style={[styles.emailinput, { backgroundColor: theme.textinput }]}
          label={<Text style={{ color: Colors.inputLabel }}>Email</Text>}
          selectionColor={Colors.primary}
          left={<TextInput.Icon name="email-outline" color={theme.primary} />}
          activeUnderlineColor={theme.background}
          underlineColor={theme.background}
          theme={{ colors: { text: theme.text} }}
        />

        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          style={[styles.emailinput, { backgroundColor: theme.textinput }]}
          label={
            <Text style={{ color: Colors.inputLabel }}>
              {Strings.passwordHint}
            </Text>
          }
          left={<TextInput.Icon name="lock-outline" color={theme.primary} />}
          selectionColor={Colors.primary}
          activeUnderlineColor={theme.background}
          underlineColor={theme.background}
          theme={{ colors: { text: theme.text} }}
        />

        <TextInput
          value={confirmPassword}
          onChangeText={(password) => setConfirmPassword(password)}
          style={[styles.emailinput, { backgroundColor: theme.textinput }]}
          label={
            <Text style={{ color: Colors.inputLabel }}>Confirm Password</Text>
          }
          left={<TextInput.Icon name="lock-outline" color={theme.primary} />}
          selectionColor={Colors.primary}
          activeUnderlineColor={theme.background}
          underlineColor={theme.background}
          theme={{ colors: { text: theme.text} }}
        />

        <TouchableOpacity style={styles.button} onPress={() => register()}>
          <Text style={nameStyles.textButton} onPress={() => register()}>
            {" "}
            {Strings.signup}
          </Text>
        </TouchableOpacity>

        <Text
          style={styles.usemobileNumber}
          onPress={() => navigation.navigate("CompletePhoneSignup")}
        >
          {Strings.mobileNumber}
        </Text>

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
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    </PaperProvider>
  );
}

function PhoneSignupScreen({ route }) {
  const navigation = useNavigation();

  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientSecret: "9a6c3e717df46a3fe104d4aec0ecac7d",
    clientId: "390391096288445",
    responseType: ResponseType.Code,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log(response);

      const fetchData = async () => {
        setIsVisible(true);
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
            setIsVisible(false);
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
          })
          .catch((err) => {
            setIsVisible(false);
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
    iosClientId:
      "322534561816-mg5aevkegg6lp3o98h5nc91ejgr4bj57.apps.googleusercontent.com",
    androidClientId:
      "322534561816-4u37l993k91k84mdfu0afg17eajhufjg.apps.googleusercontent.com",
    webClientId:
      "322534561816-lfr6keodqdfv9ro5ume47pv9ieh952g7.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (gresponse?.type === "success") {
      const { authentication } = gresponse;
      console.log(gresponse);
      setIsVisible(true);
      axios
        .post("/user-gateway/google", { token: gresponse.params.id_token })
        .then(async (data) => {
          setIsVisible(false);
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
        })
        .catch((err) => {
          setIsVisible(false);
          CustomAlert({
            title: "Signup Error",
            subtitle: err,
            handlePress: () => {},
          });
        });
      // navigation.navigate("MenuNavigation")
    }
  }, [gresponse]);

  const register = () => {
    setIsVisible(true);
    let data = {
      first_name: route.params.first_name,
      last_name: route.params.last_name,
      phone: phone,
      password: password,
    };

    if (
      data.first_name === "" ||
      data.last_name === "" ||
      data.phone === "" ||
      data.password == ""
    ) {
      setIsVisible(false);
      CustomAlert({
        title: "Sign up error",
        subtitle: "Please provide your sign up details completely",
        handlePress: () => {},
      });
      return false;
    }
    if (data.password.length < 8) {
      setIsVisible(false);
      CustomAlert({
        title: "Sign up error",
        subtitle: "Password is too short (Minimum of 8 characters)",
        handlePress: () => {},
      });
      return false;
    }
    if (data.password !== confirmPassword) {
      setIsVisible(false);
      CustomAlert({
        title: "Sign up error",
        subtitle: "Passwords does not match",
        handlePress: () => {},
      });
      return false;
    }

    axios
      .post("/user-gateway/register", data)
      .then(async (data) => {
        setIsVisible(false);
        if (data.data.message == "success") {
          await AsyncStorage.setItem("token", data.data.token, async (err) => {
            await AsyncStorage.setItem(
              "user_id",
              data.data.user_data.id,
              async (err) => {
                await AsyncStorage.setItem(
                  "email",
                  data.data.user_data.email,
                  async (err) => {
                    navigation.navigate("MenuNavigation");
                  }
                );
              }
            );
          });
        } else {
          CustomAlert({
            title: "Sign up Error",
            subtitle: data.data.details,
            handlePress: () => {},
          });
          return false;
        }
      })
      .catch((err) => {
        setIsVisible(false);
        CustomAlert({
          title: "Sign up Error",
          subtitle: "Error making request, please try again...",
          handlePress: () => {},
        });
        console.log({ err });
      });
  };

  return (
    <PaperProvider>
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.texts, { color: theme.text }]}>
          {Strings.createAccount}
        </Text>

        <TextInput
          value={phone}
          onChangeText={(phone) => setPhone(phone)}
          style={[styles.emailinput, { backgroundColor: theme.textinput, color: theme.text }]}
          secureTextEntry={false}
          label={<Text style={{ color: Colors.inputLabel }}>Phone</Text>}
          selectionColor={Colors.primary}
          left={<TextInput.Icon name="phone-outline" color={theme.primary}/>}
          activeUnderlineColor={theme.background}
          underlineColor={theme.background}
          theme={{ colors: { text: theme.text} }}
          keyboardType="number-pad"
        />

        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={[styles.emailinput, { backgroundColor: theme.textinput, color: theme.text }]}
          secureTextEntry={true}
          label={<Text style={{ color: Colors.inputLabel }}>Password</Text>}
          selectionColor={Colors.primary}
          left={<TextInput.Icon name="lock-outline" />}
          activeUnderlineColor={theme.background}
          underlineColor={theme.background}
          theme={{ colors: { text: theme.text} }}
        />

        <TextInput
          style={[styles.emailinput, { backgroundColor: theme.textinput, color: theme.text }]}
          onChangeText={(val) => setConfirmPassword(val)}
          secureTextEntry={true}
          label={
            <Text style={{ color: Colors.inputLabel }}>Confirm Password</Text>
          }
          selectionColor={Colors.primary}
          left={<TextInput.Icon name="lock-outline" />}
          activeUnderlineColor={theme.background}
          underlineColor={theme.background}
          theme={{ colors: { text: theme.text} }}
        />

        <TouchableOpacity style={styles.button} onPress={() => register()}>
          <Text style={styles.textButton} onPress={() => register()}>
            {" "}
            {Strings.signup}
          </Text>
        </TouchableOpacity>

        {/* <Text
          style={styles.usemobileNumber}
          onPress={() => navigation.replace("CompleteEmailSignup")}
        >
          {Strings.email}
        </Text> */}
        <Text
          style={styles.usemobileNumber}
          onPress={() => navigation.navigate("CompleteEmailSignup")}
        >
          {Strings.email}
        </Text>

        <Text
          style={nameStyles.forgotPassword}
          onPress={() => navigation.replace(Strings.home)}
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
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    </PaperProvider>
  );
}
