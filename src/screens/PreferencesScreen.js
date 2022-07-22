import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Strings from "../strings/strings";
import { styles } from "../styles/preferences";
import * as Colors from "../constants/colors";
import * as Values from "../constants/values";
import {
  FileImageButton,
  ImageButton,
  VectorButton,
} from "../components/button";
import { preferencesListArray } from "../strings/preferenceslist";
import { listSeparator } from "../components/listseparator";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function PreferencesScreen({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Strings.preferences} component={Preferences} />
      <Stack.Screen
        name={Strings.changeappearance}
        component={ChangeAppearance}
      />
      <Stack.Screen name={Strings.hidebalance} component={HideBalance} />
    </Stack.Navigator>
  );
}

const Preferences = ({ navigation }) => {
  const preferencesList = ({ item }) => (
    <View style={styles.rowContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.push(item.name)}
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
      <View style={styles.preferencesHeader}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.Profile)}
        />
        <Text style={styles.preferencesHeaderText}>{Strings.preferences}</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.flatlist}
        //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
        data={preferencesListArray}
        renderItem={preferencesList}
      />
    </SafeAreaView>
  );
};

export const ChangeAppearance = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.preferencesHeader}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.preferences)}
        />
        <Text style={styles.preferencesHeaderText}>
          {Strings.changeappearance}
        </Text>
      </View>

      <TouchableOpacity style={styles.optionsContainer}>
        <VectorButton
          name="moon"
          size={24}
          color={Colors.primary}
          style={styles.preferencesimage}
        />
        <Text style={styles.preferencestext}>Dark Mode</Text>

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
    </SafeAreaView>
  );
};

export const HideBalance = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.preferencesHeader}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.preferences)}
        />
        <Text style={styles.preferencesHeaderText}>{Strings.hidebalance}</Text>
      </View>

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
    </SafeAreaView>
  );
};
