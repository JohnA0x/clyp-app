import { React, useState, useCallback, useMemo, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import {
  FileImageButton,
  ImageButton,
  VectorButton,
  RoundedButton,
} from "../components/button";

import * as Strings from "../strings/strings";
import { styles } from "../styles/activity";
import { Ionicons } from "@expo/vector-icons";

import * as Colors from "../constants/colors";

import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function ActivityScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: styles.tabBar,
        labelStyle: { fontSize: 12 },
        //   activeTintColor:Colors.primary,
        tabStyle: {backgroundColor: Colors.backgroundColor },
        indicatorStyle: { backgroundColor: Colors.primary },
      }}
    >
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Range" component={Range} />
    </Tab.Navigator>
  );

  function History() {
    return (
      <SafeAreaView>
        <FlatList/>
      </SafeAreaView>
    );
  }

  function Range() {
    return (
      <SafeAreaView>
        <Text style={styles.fromText}>FROM:</Text>
        <TextInput
          style={styles.fromInput}
          placeholder="Select Date"
          selectionColor={Colors.primary}
        />
        <Text style={styles.toText}>TO:</Text>
        <TextInput
          style={styles.fromInput}
          placeholder="Select Date"
          selectionColor={Colors.primary}
        />

        <RoundedButton
          style={styles.searchButton}
          text="Search"
          textStyle={styles.searchText}
        />
      </SafeAreaView>
    );
  }
}
