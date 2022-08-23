import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Values from "../constants/values";
import * as Colors from "../constants/colors";

//const [themeState, setThemeState] = useState('')
// const backgroundColor = themeState === 'dark' ? Colors.primaryDark : Colors.primary
export const primary = "";
 async function SetLayoutColor() {
  const setLayoutColor = async () => {
    const [primaryColor, setPrimaryColor] = useState("");
    try {
      const value = await AsyncStorage.getItem(Values.theme);
      if (value === "dark") {
        // value previously stored
        alert("Value is dark");
        setPrimaryColor(Colors.primaryDark);
        primary = primaryColor;
      } else {
        alert("Value is light");
        setPrimaryColor(Colors.primary);
        primary = primaryColor;
      }
    } catch (e) {
      // error reading value
    }
   
  };
}
