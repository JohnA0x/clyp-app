import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Values from '../constants/values'

export const storeData = async (item, value) => {
  try {
    await AsyncStorage.setItem(item, value);
  } catch (e) {
    // saving error
  }
};

export const storeObjectData = async (item, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(item, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async (item) => {
  try {
    const value = await AsyncStorage.getItem(item);
    if (value !== null) {
      // value previously stored
     // alert('Value not null')
     return value;
    }
  } catch (e) {
    // error reading value
  }
};

export const getObjectData = async (item) => {
  try {
    const jsonValue = await AsyncStorage.getItem(item);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const getThemeData = async (darkmodeTodo, lightmodeTodo) => {
    try {
      const value = await AsyncStorage.getItem(Values.theme);
      if (value === 'dark') {
        // value previously stored
       //alert('Value is dark')
       darkmodeTodo

      }
      else{
        //alert('Value is light')
        lightmodeTodo
      }
    } catch (e) {
      // error reading value
    }
  };
