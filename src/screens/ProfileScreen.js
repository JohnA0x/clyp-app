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
import axios from "../components/axios";
import { CustomAlert } from "../components/alert";

export default function ProfileScreen({ navigation, route }) {
  const [isEnabled, setIsEnabled] = useState(route.params.preferences.merchant_mode);
  const toggleSwitch = () => {
    let data = {
      user_id: route.params.id,
      merchant_mode: isEnabled ? false : true
    }

    axios.post('/user-gateway/update-prefrences', data)
    .then(res => {
      if(res.data.message == "success"){
        setIsEnabled((previousState) => !previousState);
        // setMode(isEnabled ? "Dark" : "Light")
        route.params.preferences.merchant_mode = isEnabled ? false : true
        route.params.user.prefrence[0].merchant_mode = isEnabled ? false : true
      } else {
        CustomAlert({ title: "Error", subtitle: "Error updating private mode, please try again...", handlePress: () => { } })
      }
    })
    .catch(err => {
      CustomAlert({ title: "Error", subtitle: "Error updating mode, please try again...", handlePress: () => { } })
      console.log({ err })
    })
    
  }

  const profileList = ({ item }) => (
    <View style={styles.rowContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(item.name, {
          id: route.params.id,
          preferences: route.params.preferences,
          firstName: route.params.firstName,
          lastName: route.params.lastName,
          user: route.params.user
        } )}
      >
        <VectorButton
          name={item.icon}
          size={24}
          color={Colors.primary}
          style={styles.preferencesimage}
        />
        <Text style={styles.preferencestext}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <ImageButton
          image={
            route.params.user.picture ? route.params.user.picture : "https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg"
          }
          style={styles.profileImage}
          imageStyle={styles.profileImage}
        />
        <Text
          style={styles.profileName}
          onPress={() => navigation.navigate("Home")}
        >
          {route.params.user.first_name} {route.params.user.last_name}
        </Text>
        <VectorButton
          name="pencil-sharp"
          size={24}
          color={Colors.primary}
          style={styles.editProfileButton}
          handlePress = {() => navigation.navigate(Strings.editprofile, {
            id: route.params.id,
            preferences: route.params.preferences,
            firstName: route.params.firstName,
            lastName: route.params.lastName,
            user: route.params.user
          } )}
        />
      </View>

      <View style={styles.merchantContainer}>
        <Text style={styles.merchantText}>{Strings.merchantmode}</Text>
        <Switch
          style={styles.merchantSwitch}
          trackColor={{ false: Colors.black, true: Colors.primary }}
          thumbColor={isEnabled ? Colors.secondary : Colors.grey}
          ios_backgroundColor={Colors.black}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <FlatList
        contentContainerStyle={styles.flatlist}
        data={profileListArray}
        renderItem={profileList}
      />
    </SafeAreaView>
  );
}
