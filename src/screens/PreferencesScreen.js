import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
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
import axios from "../components/axios";
import { CustomAlert } from "../components/alert";
import debitCardListArray from "../strings/debitcardslist";

const Stack = createNativeStackNavigator();

export default function PreferencesScreen({ navigation, route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={Strings.preferences}
        initialParams={route}
        component={Preferences}
      />

      <Stack.Screen
        name={Strings.changeappearance}
        component={ChangeAppearance}
        initialParams={route}
      />

      <Stack.Screen
        name={Strings.hidebalance}
        initialParams={route}
        component={HideBalance}
      />
      <Stack.Screen
        name={Strings.paymentmethod}
        initialParams={route}
        component={PaymentMethod}
      />
       <Stack.Screen
        name={Strings.addNewCard}
        initialParams={route}
        component={AddCard}
      />
    </Stack.Navigator>
  );
}

const Preferences = ({ navigation, route }) => {
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
          handlePress={() =>
            navigation.navigate(Strings.Profile, {
              id: route.params.params.id,
              firstName: route.params.params.firstName,
              lastName: route.params.params.lastName,
              preferences: route.params.params.preferences,
              user: route.params.params.user,
            })
          }
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

export const ChangeAppearance = ({ navigation, route }) => {
  const [isEnabled, setIsEnabled] = useState(
    route.params.params.preferences.mode.indexOf("ight") != -1 ? true : false
  );
  const [mode, setMode] = useState(route.params.params.preferences.mode);

  const toggleSwitch = () => {
    let data = {
      user_id: route.params.params.id,
      mode: isEnabled ? "Dark" : "Light",
    };

    axios
      .post("/user-gateway/update-prefrences", data)
      .then((res) => {
        if (res.data.message == "success") {
          setIsEnabled((previousState) => !previousState);
          setMode(isEnabled ? "Dark" : "Light");
          route.params.params.preferences.mode = isEnabled ? "Dark" : "Light";
          route.params.params.user.prefrence[0].mode = isEnabled
            ? "Dark"
            : "Light";
        } else {
          CustomAlert({
            title: "Error",
            subtitle: "Error updating mode, please try again...",
            handlePress: () => {},
          });
        }
      })
      .catch((err) => {
        CustomAlert({
          title: "Error",
          subtitle: "Error updating mode, please try again...",
          handlePress: () => {},
        });
        console.log({ err });
      });
  };
  // React.useEffect(()=>{
  //   console.log(route)
  // }, [])

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
        <Text style={styles.preferencestext}>{mode} Mode</Text>

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

export const HideBalance = ({ navigation, route }) => {
  const [isEnabled, setIsEnabled] = useState(
    route.params.params.preferences.private_mode
  );
  const [mode, setMode] = useState(
    route.params.params.preferences.private_mode
  );

  const toggleSwitch = () => {
    let data = {
      user_id: route.params.params.id,
      private_mode: isEnabled ? false : true,
    };

    axios
      .post("/user-gateway/update-prefrences", data)
      .then((res) => {
        if (res.data.message == "success") {
          setIsEnabled((previousState) => !previousState);
          setMode(isEnabled ? "Dark" : "Light");
          route.params.params.preferences.private_mode = isEnabled
            ? false
            : true;
          route.params.params.user.prefrence[0].private_mode = isEnabled
            ? false
            : true;
        } else {
          CustomAlert({
            title: "Error",
            subtitle: "Error updating private mode, please try again...",
            handlePress: () => {},
          });
        }
      })
      .catch((err) => {
        CustomAlert({
          title: "Error",
          subtitle: "Error updating mode, please try again...",
          handlePress: () => {},
        });
        console.log({ err });
      });
  };

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

export function PaymentMethod({ navigation, route }) {
  const paymentMethods = ({ navigation, item, route }) => {
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push(item.name)}
        >
          <VectorButton
            name={item.cardIcon}
            size={24}
            color={Colors.primary}
            style={styles.preferencesimage}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.preferencestext}>{item.cardType}</Text>
            <Text style={styles.preferencestext}>{item.cardNumber}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
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
          {Strings.paymentmethod}
        </Text>
      </View>

      <FlatList
        contentContainerStyle={styles.flatlist}
        //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
        data={debitCardListArray}
        renderItem={paymentMethods}
      />
      <Text style = {styles.addNewCard}
      onPress={() => navigation.navigate(Strings.addNewCard)}>
        Add New Card
      </Text>
    </SafeAreaView>
  );
}

export function AddCard(){
  return(
    <SafeAreaView>
       <View style={styles.preferencesHeader}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.preferences)}
        />
        <Text style={styles.preferencesHeaderText}>
          {Strings.addNewCard}
        </Text>
      </View>

    </SafeAreaView>
  )
}
