import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from "./src/screens/SignupScreen";
import Onboarding from "./src/screens/OnboardingScreen";
import {
  useFonts,
  Poppins_900Black,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

import AppLoading from "expo-app-loading";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import themeReducer from "./src/redux/themeReducer";
import {
  storeData,
  storeObjectData,
  getData,
  getObjectData,
} from "./src/services/storage";

import * as Values from "./src/constants/values";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { store, persistor } from "./src/redux/themeStore";
import { PersistGate } from "redux-persist/integration/react";
import HomeScreen from "./src/screens/HomeScreen";
import { useState } from "react";

export default function App() {
  const [firstTime, setFirstTime] = useState("");
  let [fontsLoaded, error] = useFonts({
    Poppins_700Bold,
    Poppins_900Black,
    Poppins_600SemiBold,
    Poppins_500Medium,
    Poppins_400Regular,
  });

  const isFirstTime = async () => {
    try {
      const value = await AsyncStorage.getItem(Values.IS_FIRST_TIME);
      if (value === "false") {
        setFirstTime("false");
        alert("yes");
      } else {
        setFirstTime("true");
        alert("yes");
      }
    } catch (e) {
      // error reading value
    }
  };

  const saveWidth = () => {
    storeData('tabWidth', "0")
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <View onLayout={saveWidth()} />
        <Onboarding />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
