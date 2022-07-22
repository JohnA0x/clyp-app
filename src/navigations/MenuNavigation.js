import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from 'react-native-vector-icons/AntDesign'
//import {Ionicons, AntDesign} from 'react-native-vector-icons/Ionicons'

import HomeScreen from "../screens/HomeScreen";
import InfoScreen from "../screens/InfoScreen";
import ClypHub from "../screens/ClypHub";
import ProfileScreen from "../screens/ProfileScreen";

import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import PreferencesScreen from "../screens/PreferencesScreen";
import NotificationScreen from "../screens/NotificationsScreen";
import QRCodeScreen from "../screens/QRCodeScreen";
import ShareScreen from "../screens/ShareScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const InfoStack = createNativeStackNavigator();
const HubStack = createNativeStackNavigator();

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name={Strings.home} component={HomeScreen} />
      <HomeStack.Screen name={Strings.Profile} component={ProfileScreen} />
      <HomeStack.Screen name={Strings.preferences} component={PreferencesScreen} />
      <HomeStack.Screen name={Strings.notifications} component={NotificationScreen} />
      <HomeStack.Screen name={Strings.qrcode} component={QRCodeScreen} />
      <HomeStack.Screen name={Strings.share} component={ShareScreen} />
    </HomeStack.Navigator>
  );
};

function InfoStackScreen() {
  return (
    <InfoStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <InfoStack.Screen name={Strings.info} component={InfoScreen} />
    </InfoStack.Navigator>
  );
}

function ClypHubStackScreen() {
  return (
    <HubStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HubStack.Screen name={Strings.clyphub} component={ClypHub} />
    </HubStack.Navigator>
  );
}

export default function MenuNavigation() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let iconOtherName
        let rn = route.name;

        if (rn === Strings.home) {
          iconName = focused ? "home-sharp" : "home-outline";
        } else if (rn === Strings.info) {
          iconName = focused ? "stats-chart" : "stats-chart-outline";
        } else if (rn === Strings.clyphub) {
          iconName = focused ? "apps" : "apps-outline";
        } 
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color}/>;
      },
      headerShown: false,
      tabBarActiveTintColor: Colors.primary,
      tabBarStyle: { height: 60, elevation: 0, borderTopWidth: 0, backgroundColor: Colors.backgroundColor },
      tabBarShowLabel: false,
    })}
  >
    <Tab.Screen name={Strings.home} component={HomeStackScreen} />
    <Tab.Screen name={Strings.info} component={InfoStackScreen} />
    <Tab.Screen name={Strings.clyphub} component={ClypHubStackScreen} />
  </Tab.Navigator>
  );
}
