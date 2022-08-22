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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import activityListArray from "../strings/activitylist";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function ActivityScreen({navigation}) {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          backgroundColor: Colors.backgroundColor,
        }}
      >
        <Stack.Screen name="Tabs" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  function TabNavigator() {
    return (
    
      <SafeAreaView style = {styles.container}>
         <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.Profile)}
          />
          <Text style={styles.headerText}>{Strings.activity}</Text>
        </View>

        <Tab.Navigator
        tabBarOptions={{
          style: styles.tabBar,
          labelStyle: { fontSize: 12 },
          //   activeTintColor:Colors.primary,
          // tabStyle: {backgroundColor: Colors.backgroundColor },
          indicatorStyle: { backgroundColor: Colors.primary },
        }}
      >
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Range" component={Range} />
      </Tab.Navigator>
      </SafeAreaView>
    );
  }

  function History() {
    const historyList = ({ item }) => {
      return (
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.list}>
            <VectorButton
              name={item.icon}
              size={15}
              style={styles.statusIcon}
              color={Colors.white}
            />
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.title}>{item.title.toUpperCase()}</Text>
            <Text style={styles.description} numberOfLines={1}>
              {item.description}
            </Text>
            <Text style={styles.date} numberOfLines={1}>
              {item.date}
            </Text>
            <Text style={styles.status} numberOfLines={1}>
              {item.status}
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={activityListArray}
          //ListHeaderComponent={renderHeader}
          renderItem={historyList}
        />
      </SafeAreaView>
    );
  }

  function Range() {
    return (
      <SafeAreaView style={styles.container}>
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
