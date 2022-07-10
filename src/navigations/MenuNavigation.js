import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import {Ionicons, AntDesign} from 'react-native-vector-icons/Ionicons'

import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';
import ClypHub from '../screens/ClypHub';

import * as Colors from '../constants/colors'
import * as Strings from '../strings/strings'


const Tab = createBottomTabNavigator();

export default function MenuNavigation(){
   return(
      <NavigationContainer independent = {true}>
        <Tab.Navigator
             screenOptions={({ route }) => ({
               tabBarIcon: ({ focused, color, size }) => {
                 let iconName;
                 let rn = route.name;
     
                 if (rn === Strings.home) {
                   iconName = focused ? 'home-sharp' : 'home-outline';
     
                 } else if (rn === Strings.info) {
                   iconName = focused ? 'stats-chart' : 'stats-chart-outline';
     
                 } else if (rn === Strings.clyphub) {
                   iconName = focused ? 'apps' : 'apps-outline';
                 }
                 // You can return any component that you like here!
                 return <Ionicons name={iconName} size={size} color={color} />;
                 
               }, headerShown: false, tabBarActiveTintColor: Colors.primaryLight, 
               tabBarStyle:{height: 60, elevation:0, borderTopWidth:0}, tabBarShowLabel: false
             })}
             
             >
        <Tab.Screen name={Strings.home} component={HomeScreen} />
        <Tab.Screen name={Strings.info} component={InfoScreen} />
        <Tab.Screen name={Strings.clyphub} component={ClypHub} />

        </Tab.Navigator>
      </NavigationContainer>
   )
    
}