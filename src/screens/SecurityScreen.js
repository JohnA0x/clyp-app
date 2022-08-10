import { View, Text, FlatList, TouchableOpacity, Switch } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import { styles } from "../styles/security";
import {
  FileImageButton,
  ImageButton,
  VectorButton,
} from "../components/button";
import { useState } from "react";
import axios from "../components/axios";
import { CustomAlert } from "../components/alert";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import securityListArray from "../strings/securitylist";
import { AuthenticationToken } from "react-native-fbsdk-next";

const Stack = createNativeStackNavigator();

export default function SecurityScreen({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="securitylist" component={SecurityList} />
    </Stack.Navigator>
  );

  function SecurityList() {
    const securityList = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.button}>
          <VectorButton
            name={item.icon}
            size={24}
            color={Colors.primary}
            style={styles.flatlistImage}
          />
          <Text style={styles.flatlistText}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.home)}
          />
          <Text style={styles.headerText}>{Strings.security}</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.flatlist}
          data={securityListArray}
          renderItem={securityList}
        />
      </SafeAreaView>
    );
  }

  function AuthenticationScreen() {
    <SafeAreaView>
      <TouchableOpacity style={styles.optionsContainer}>
        <VectorButton
          name="eye-off"
          size={24}
          color={Colors.primary}
          style={styles.preferencesimage}
        />
        <Text style={styles.preferencestext}>{Strings.hidebalance}</Text>

        <Switch
          style={styles.switch}
          trackColor={{ false: Colors.black, true: Colors.primary }}
          thumbColor={isEnabled ? Colors.secondary : Colors.grey}
          ios_backgroundColor={Colors.black}
          onValueChange={toggleSwitch}
          size={100}
          value={isEnabled}
        />
      </TouchableOpacity>
    </SafeAreaView>;
  }
}
