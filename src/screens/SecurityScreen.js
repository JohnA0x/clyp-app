import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Switch,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import { styles } from "../styles/security";
import {
  FileImageButton,
  ImageButton,
  RoundedButton,
  VectorButton,
} from "../components/button";
import { useState } from "react";
import axios from "../components/axios";
import { CustomAlert } from "../components/alert";

import {Ionicons} from '@expo/vector-icons'

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import securityListArray from "../strings/securitylist";
import { set } from "lodash";

const Stack = createNativeStackNavigator();

export default function SecurityScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isBiometricsEnabled, setBiometricsEnabled] = useState(false);


  const [mode, setMode] = useState();
  const [formerPin, setFormerPin] = useState('');
  const [newPin, setNewPin] = useState("");
  const [reenterPin, setReenterPin] = useState('');
  const [isBiometrics, setBiometrics] = useState(false)
  const toggleBiometricsSwitch = () => setIsEnabled(previousState => !previousState);


  const toggleSwitch = () => {
    let data = {
      //user_id: route.params.params.id,
      mode: isEnabled ? "Dark" : "Light",
    };
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('biometrics', value)
    } catch (e) {
      // saving error
    }
  }


  React.useEffect(() => {
    toggleBiometricsSwitch();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="securitylist" component={SecurityList} />
      <Stack.Screen
        name={Strings.authentication}
        component={AuthenticationScreen}
      />
      <Stack.Screen name={Strings.transactionPin} component={TransactionPin} />
      <Stack.Screen name={Strings.changePin} component={ChangePin} />
    </Stack.Navigator>
  );

  function SecurityList() {
    const securityList = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(item.name)}
        >
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
    function biometrics(){
      toggleBiometricsSwitch
      storeData(isBiometrics)
      alert(isBiometrics)
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("securitylist")}
          />
          <Text style={styles.headerText}>{Strings.authentication}</Text>
        </View>

        <TouchableOpacity style={styles.optionsContainer}>
          <VectorButton
            name="chatbox-ellipses"
            size={24}
            color={Colors.primary}
            style={styles.flatlistImage}
          />
          <Text style={styles.flatlistText}>{Strings.smsAuthentication}</Text>

          <Switch
            style={styles.switch}
            trackColor={{ false: Colors.black, true: Colors.primary }}
            thumbColor={isEnabled ? Colors.secondary : Colors.grey}
            ios_backgroundColor={Colors.black}
            onValueChange={isBiometricsEnabled}
            size={100}
            value={isEnabled}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionsContainer}>
          <VectorButton
            name="mail"
            size={24}
            color={Colors.primary}
            style={styles.flatlistImage}
          />
          <Text style={styles.flatlistText}>{Strings.emailAuthentication}</Text>

          <Switch
            style={styles.switch}
            trackColor={{ false: Colors.black, true: Colors.primary }}
            thumbColor={isEnabled ? Colors.secondary : Colors.grey}
            ios_backgroundColor={Colors.black}
            onValueChange={toggleBiometricsSwitch}
            size={100}
            value={isEnabled}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionsContainer}>
          <VectorButton
            name="finger-print"
            size={24}
            color={Colors.primary}
            style={styles.flatlistImage}
          />
          <Text style={styles.flatlistText}>
            {Strings.biometricAuthentication}
          </Text>

          <Switch
            style={styles.switch}
            trackColor={{ false: Colors.black, true: Colors.primary }}
            thumbColor={isBiometricsEnabled ? Colors.secondary : Colors.grey}
            ios_backgroundColor={Colors.black}
            onValueChange={toggleBiometricsSwitch}
            size={100}
            value={isEnabled}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  function TransactionPin() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("securitylist")}
          />
          <Text style={styles.headerText}>{Strings.transactionPin}</Text>
        </View>

        <TouchableOpacity
          style={styles.optionsContainer}
          onPress={() => navigation.navigate(Strings.changePin)}
        >
          <VectorButton
            name="key"
            size={24}
            color={Colors.primary}
            style={styles.flatlistImage}
          />
          <Text style={styles.flatlistText}>{Strings.changePin}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionsContainer}>
          <VectorButton
            name="shield"
            size={24}
            color={Colors.primary}
            style={styles.flatlistImage}
          />
          <Text style={styles.flatlistText}>{Strings.forgotPin}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  function ChangePin() {
    return (
      <SafeAreaView style = {styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("securitylist")}
          />
          <Text style={styles.headerText}>{Strings.changePin}</Text>
        </View>
        <TextInput
          style={styles.addressInput}
          placeholder={Strings.enterFormerPassword}
          secureTextEntry={true}
          value={formerPin}
          onChangeText={text => setFormerPin(text)}
          selectionColor={Colors.primary}
        />

        <TextInput
          style={styles.otherTextInputs}
          secureTextEntry={true}
          onChangeText={text => setNewPin(text)}
          value={newPin}
          placeholder={Strings.enterNewPassword}
          selectionColor={Colors.primary}
        />

        <TextInput
          style={styles.otherTextInputs}
          value={reenterPin}
          onChangeText={text => setReenterPin(text)}
          placeholder={Strings.reenterNewPassword}
          secureTextEntry={true}
          selectionColor={Colors.primary}
        >
          <Ionicons/>
        </TextInput>

        <RoundedButton
          text={Strings.confirm}
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
        />
      </SafeAreaView>
    );
  }
}
