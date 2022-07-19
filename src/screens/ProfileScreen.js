import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Strings from "../strings/strings";
import { ImageButton, VectorButton } from "../components/button";
import { styles } from "../styles/profile";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import * as Colors from "../constants/colors";
import HomeScreen from "../screens/HomeScreen";
import { profileListArray } from "../strings/profilelist";
import { listSeparator } from "../components/listseparator";

import { useState } from "react";
  


export default function ProfileScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const profileList = ({ item }) => (
    <TouchableOpacity style={ styles.rowContainer } 
    onPress = {() => navigation.push(item.name)} >
       <VectorButton
            name={item.icon}
            size={24}
            color={Colors.primary}
            style={styles.preferencesimage}
          />
          <Text style={styles.preferencestext}>{item.name}</Text>
    </TouchableOpacity>    
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <ImageButton
          image={
            "https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg"
          }
          style={styles.profileImage}
          imageStyle={styles.profileImage}
        />
        <Text
          style={styles.profileName}
          onPress={() => navigation.push("Home")}
        >
          Ben Sterling
        </Text>
        <VectorButton
          name="pencil-sharp"
          size={24}
          color={Colors.primary}
          style={styles.editProfileButton}
        />
      </View>

      <View style={styles.merchantContainer}>
        <Text style={styles.merchantText}>{Strings.merchantmode}</Text>
        <Switch
          style={styles.merchantSwitch}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <FlatList
      data = { profileListArray }
      renderItem={profileList}        
      ItemSeparatorComponent={ listSeparator }/>
    </SafeAreaView>
  );
}
