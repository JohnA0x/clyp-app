import React from "react";
import {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
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
import SendCryptoScreen from "../screens/SendCryptoScreen";
import ReceiveCryptoScreen from "../screens/ReceiveCryptoScreen";
import AboutUs from "../screens/AboutUs";
import DepositScreen from "../screens/DepositScreen";
import LogOutScreen from "../screens/LogOutScreen";
import WithdrawScreen from "../screens/WithdrawScreen";
import BuyCryptoScreen from "../screens/BuyCryptoScreen";
import SellCryptoScreen from "../screens/SellCryptoScreen";
import ActivityScreen from "../screens/ActivityScreen";
import SwapCryptoScreen from "../screens/SwapCryptoScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import NewsScreen from "../screens/NewsScreen";
import SecurityScreen from "../screens/SecurityScreen";
import RechargeScreen from "../screens/RechargeScreen";
import BillPayScreen from "../screens/BillPayScreen";
import SupportScreen from "../screens/SupportScreen";
import SavingsScreen from "../screens/SavingsScreen";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useSelector, useDispatch } from "react-redux";

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
      <HomeStack.Screen name={Strings.sendCrypto} component={SendCryptoScreen} />
      <HomeStack.Screen name={Strings.receiveCrypto} component={ReceiveCryptoScreen} />
      <HomeStack.Screen name={Strings.about} component={AboutUs} />
      <HomeStack.Screen name={Strings.deposit} component={DepositScreen} />
      <HomeStack.Screen name={Strings.withdraw} component={WithdrawScreen} />
      <HomeStack.Screen name={Strings.logout} component={LogOutScreen} />
      <HomeStack.Screen name={Strings.buy} component={BuyCryptoScreen} />
      <HomeStack.Screen name={Strings.sell} component={SellCryptoScreen} />
      <HomeStack.Screen name={Strings.swap} component={SwapCryptoScreen} />
      <HomeStack.Screen name={Strings.activity} component={ActivityScreen} />
      <HomeStack.Screen name={Strings.editprofile} component={EditProfileScreen} />
      <HomeStack.Screen name={Strings.News} component={NewsScreen} />
      <HomeStack.Screen name={Strings.security} component={SecurityScreen} />
      <HomeStack.Screen name={Strings.help} component={SupportScreen} />
      
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
      <HubStack.Screen name={Strings.recharge} component={RechargeScreen} />
      <HubStack.Screen name={Strings.bill} component={BillPayScreen} />
      <HubStack.Screen name={Strings.savings} component={SavingsScreen} />
    </HubStack.Navigator>
  );
}

export default function MenuNavigation() {
  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const [tabWidth, setTabWidth] = useState(60)

  useEffect(() =>{
    getWidth()
  
  }, [tabWidth])


const getWidth = async () => {
  try {
    const value = await AsyncStorage.getItem('tabWidth')
    if(value !== null) {
      // value previously stored
      setTabWidth(Number(value));
      return value
    }
  } catch(e) {
    // error reading value
  }
  
}

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
      tabBarStyle: { height: tabWidth, elevation: 0, borderTopWidth: 0, backgroundColor: theme.background },
      tabBarShowLabel: false,
    })}
  >
    <Tab.Screen name={Strings.home} component={HomeStackScreen} />
    <Tab.Screen name={Strings.info} component={InfoStackScreen} />
    <Tab.Screen name={Strings.clyphub} component={ClypHubStackScreen} />
  </Tab.Navigator>
  );
}
