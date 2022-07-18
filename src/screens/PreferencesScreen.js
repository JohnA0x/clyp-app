import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Strings from "../strings/strings";
import { styles } from "../styles/clyphub";
import * as Colors from "../constants/colors";
import * as Values from "../constants/values";

export default function PreferencesScreen() {
  return (
    <SafeAreaView>
      <Text>
        {Strings.preferences}
      </Text>
    </SafeAreaView>
  );
}
