import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";

export const CustomAlert = ({ title, subtitle, handlePress }) => {
  return Alert.alert(title, subtitle, [{ text: "OK", onPress: handlePress }]);
}
