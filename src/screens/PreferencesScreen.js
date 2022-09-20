import React, { useEffect } from "react";
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
  RoundedButton,
} from "../components/button";
import { preferencesListArray } from "../strings/preferenceslist";
import { listSeparator } from "../components/listseparator";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useState } from "react";
import axios from "../components/axios";
import { CustomAlert } from "../components/alert";
import debitCardListArray from "../strings/debitcardslist";

import axiosFiat from "../components/axios-fait";
import { ProcessingModal } from "../components/modal";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeAction";
import { lightTheme, darkTheme } from "../constants/theme";
import { getData, storeData } from "../services/storage";
import { theme } from "native-base";

const Stack = createNativeStackNavigator();

export default function PreferencesScreen({ navigation, route }) {

  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

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
      <Stack.Screen
        name={"update-card"}
        initialParams={route}
        component={UpdateCard}
      />
    </Stack.Navigator>
  );
}

const Preferences = ({ navigation, route }) => {

  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const preferencesList = ({ item }) => (
    <View style={[styles.rowContainer]}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: theme.flatlist}]}
        onPress={() => navigation.push(item.name)}
      >
        <VectorButton
          name={item.icon}
          size={24}
          color={Colors.primary}
          style={styles.preferencesimage}
        />
        <Text style={[styles.preferencestext, {color: theme.text}]}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={[styles.preferencesHeader]}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={theme.primary}
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
        <Text style={[styles.preferencesHeaderText, {color: theme.text}]}>{Strings.preferences}</Text>
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
  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

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
            handlePress: () => { },
          });
        }
      })
      .catch((err) => {
        CustomAlert({
          title: "Error",
          subtitle: "Error updating mode, please try again...",
          handlePress: () => { },
        });
        console.log({ err });
      });
  };
  // React.useEffect(()=>{
  //   console.log(route)
  // }, [])

  useEffect(() => {
    if (mode == "Dark") {
      dispatch(switchTheme(darkTheme));
    //  alert("Mode is dark");
    }

    if (mode == "Light") {
      dispatch(switchTheme(lightTheme));
      //alert("Mode is light");
    }
  }, [mode]);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.preferencesHeader}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={theme.primary}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.preferences)}
        />
        <Text style={[styles.preferencesHeaderText, {color: theme.text}]}>
          {Strings.changeappearance}
        </Text>
      </View>

      <TouchableOpacity style={[styles.optionsContainer, {backgroundColor: theme.flatlist}]}>
        <VectorButton
          name="moon"
          size={24}
          color={Colors.primary}
          style={styles.preferencesimage}
        />
        <Text style={[styles.preferencestext, {color: theme.text}]}>{mode} Mode</Text>

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
  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

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
            handlePress: () => { },
          });
        }
      })
      .catch((err) => {
        CustomAlert({
          title: "Error",
          subtitle: "Error updating mode, please try again...",
          handlePress: () => { },
        });
        console.log({ err });
      });
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.preferencesHeader}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={theme.primary}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.preferences)}
        />
        <Text style={[styles.preferencesHeaderText, {color: theme.text}]}>{Strings.hidebalance}</Text>
      </View>

      <TouchableOpacity style={[styles.optionsContainer, {backgroundColor: theme.flatlist}]}>
        <VectorButton
          name="eye-off"
          size={24}
          color={Colors.primary}
          style={styles.preferencesimage}
        />
        <Text style={[styles.preferencestext, {color: theme.text}]}>{Strings.hidebalance}</Text>

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

  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const [cards, setCards] = useState([])
  const paymentMethods = ({ item, route }) => {
    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.flatlist}]}
          onPress={() => navigation.navigate("update-card", {
            card: item
          })}
        >
          <VectorButton
            name={item.cardIcon}
            size={24}
            color={Colors.primary}
            style={styles.preferencesimage}
          />
          <View style={{ flexDirection: "column" }}>
          <Text style={styles.preferencestext}>{item.card_name}</Text>
            {/* <Text style={styles.preferencestext}>{item.card_type}</Text> */}
            <Text style={styles.preferencestext}>{item.card_number}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    axiosFiat.post('/fiat-gateway/get-cards', { user_id: route.params.params.id })
      .then(data => {
        if (data.data.message === "success") {
          setCards(data.data.cards)
        }
        else {
          CustomAlert({ title: "Failed", subtitle: "Failed to get cards...", handlePress: () => { } })
        }
      })
      .catch(err => {
        console.log(err)
        CustomAlert({ title: "Error", subtitle: "Error fetching cards...", handlePress: () => { } })
      })
  }, [])

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.preferencesHeader}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={theme.primary}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.preferences, {
            id: route.params.params.id,
            firstName: route.params.params.firstName,
            lastName: route.params.params.lastName,
            preferences: route.params.params.preferences,
            user: route.params.params.user,
          })}
        />
        <Text style={[styles.preferencesHeaderText, {color: theme.text}]}>
          {Strings.paymentmethod}
        </Text>
      </View>

      <FlatList
        contentContainerStyle={styles.flatlist}
        //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
        data={cards}
        renderItem={paymentMethods}
      />
      <Text
        style={styles.addNewCard}
        onPress={() => navigation.navigate(Strings.addNewCard)}
      >
        Add New Card
      </Text>
    </SafeAreaView>
  );
}

export function AddCard({ navigation, route }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cvvNumber, setCVVNumber] = useState("");
  const [expiryNumber, setExpiryNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true)

    let data = {
      card_number: cardNumber,
      cvv: cvvNumber,
      card_expiry: expiryNumber,
      card_type: cardType,
      card_name: cardName,
      card_pin: cardPin,
      user_id: route.params.params.id
    }
    
    if(data.card_number === "" || data.cvv === "" || data.card_expiry === ""){
      setLoading(false)
      return false
    }
    axiosFiat.post('/fiat-gateway/save-card', data)
      .then(data => {
        if (data.data.message === "success") {
          setLoading(false)
          navigation.navigate(Strings.paymentmethod, {
            id: route.params.params.id,
            firstName: route.params.params.firstName,
            lastName: route.params.params.lastName,
            preferences: route.params.params.preferences,
            user: route.params.params.user,
          })
        } else {
          setLoading(false)
          CustomAlert({
            title: "Failed",
            subtitle: "Problem adding card.",
            handlePress: () => { },
          });
        }
      })
      .catch(err => {
        setLoading(false)
        CustomAlert({
          title: "Failed",
          subtitle: "Problem adding card.",
          handlePress: () => { },
        });
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.preferencesHeader}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.goBack({
            id: route.params.params.id,
            firstName: route.params.params.firstName,
            lastName: route.params.params.lastName,
            preferences: route.params.params.preferences,
            user: route.params.params.user,
          })}
        />
        <Text style={styles.preferencesHeaderText}>{Strings.addNewCard}</Text>
      </View>

      <TextInput
        style={styles.inputText}
        placeholder="Card Name"
        selectionColor={Colors.primary}
        value={cardName}
        onChangeText={(value) => setCardName(value)}
      />

      <TextInput
        style={styles.otherTextInputs}
        placeholder="Card Number"
        selectionColor={Colors.primary}
        maxLength={16}
        value={cardNumber}
        onChangeText={(value) => setCardNumber(value)}
      />

      <View style={styles.rowCardContainer}>
        <TextInput
          style={styles.rowTextInputs}
          placeholder="Expiry Date"
          selectionColor={Colors.primary}
          maxLength={5}
          value={expiryNumber}
          onChangeText={(value) => setExpiryNumber(value)}
        />

        <TextInput
          style={styles.rowTextInputs}
          placeholder="CVV"
          selectionColor={Colors.primary}
          maxLength={3}
          value={cvvNumber}
          onChangeText={(value) => setCVVNumber(value)}
        />
      </View>

      {/* <TextInput
        style={styles.inputText}
        placeholder="Card Name"
        selectionColor={Colors.primary}
        maxLength={16}
        value={cardName}
        onChangeText={(value) => setCardName(value)}
      />

      <View style={styles.rowCardContainer}>
        <TextInput
          style={styles.otherTextInputs}
          placeholder="Expiry Date"
          selectionColor={Colors.primary}
          maxLength={5}
          value={cardPin}
          onChangeText={(value) => setCardPin(value)}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="CVV"
          selectionColor={Colors.primary}
          maxLength={3}
          value={cvvNumber}
          onChangeText={(value) => setCVVNumber(value)}
        />
      </View> */}

      <RoundedButton
        text="Add Card"
        textStyle={styles.roundedTextButton}
        style={styles.roundedButton}
        handlePress={() => submit()}
      />

      <ProcessingModal isVisible={loading} />
    </SafeAreaView>
  );
}

export function UpdateCard({ navigation, route }) {
  const [cardNumber, setCardNumber] = useState();
  const [cvvNumber, setCVVNumber] = useState("");
  const [expiryNumber, setExpiryNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardPin, setCardPin] = useState("");

  useEffect(() => {
    setCardNumber(route.params.card.card_number)
    setExpiryNumber(route.params.card.card_expiry)
    setCVVNumber(route.params.card.cvv)
  }, {})

  const submit = () => {
    let data = {
      card_number: cardNumber,
      cvv: cvvNumber,
      card_expiry: expiryNumber,
      card_type: cardType,
      card_name: cardName,
      card_pin: cardPin,
      user_id: route.params.params.id
    }

    if(data.card_number === "" || data.cvv === "" || data.card_expiry === ""){
      setLoading(false)
      return false
    }
    axiosFiat.post('/fiat-gateway/update-card', data)
      .then(data => {
        if (data.data.message === "success") {
          setLoading(false)
          navigation.navigate(Strings.paymentmethod, {
            id: route.params.params.id,
            firstName: route.params.params.firstName,
            lastName: route.params.params.lastName,
            preferences: route.params.params.preferences,
            user: route.params.params.user,
          })
        } else {
          setLoading(false)
          CustomAlert({
            title: "Failed",
            subtitle: "Problem adding card.",
            handlePress: () => { },
          });
        }
      })
      .catch(err => {
        setLoading(false)
        CustomAlert({
          title: "Failed",
          subtitle: "Problem adding card.",
          handlePress: () => { },
        });
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.preferencesHeader}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.paymentmethod, {
            id: route.params.params.id,
            firstName: route.params.params.firstName,
            lastName: route.params.params.lastName,
            preferences: route.params.params.preferences,
            user: route.params.params.user,
          })}
        />
        <Text style={styles.preferencesHeaderText}>Update Card</Text>
      </View>

      <TextInput
        style={styles.inputText}
        placeholder="Card Name"
        selectionColor={Colors.primary}
        value={cardName}
        onChangeText={(value) => setCardName(value)}
      />

      <TextInput
        style={styles.inputText}
        placeholder="Card Number"
        selectionColor={Colors.primary}
        maxLength={16}
        value={cardNumber}
        onChangeText={(value) => setCardNumber(value)}
      />

      <View style={styles.rowCardContainer}>
        <TextInput
          style={styles.otherTextInputs}
          placeholder="Expiry Date"
          selectionColor={Colors.primary}
          maxLength={5}
          value={expiryNumber}
          onChangeText={(value) => setExpiryNumber(value)}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="CVV"
          selectionColor={Colors.primary}
          maxLength={3}
          value={cvvNumber}
          onChangeText={(value) => setCVVNumber(value)}
        />
      </View>

      {/* <TextInput
        style={styles.inputText}
        placeholder="Card Name"
        selectionColor={Colors.primary}
        maxLength={16}
        value={cardName}
        onChangeText={(value) => setCardName(value)}
      />

      <View style={styles.rowCardContainer}>
        <TextInput
          style={styles.otherTextInputs}
          placeholder="Expiry Date"
          selectionColor={Colors.primary}
          maxLength={5}
          value={cardPin}
          onChangeText={(value) => setCardPin(value)}
        />

        <TextInput
          style={styles.otherTextInputs}
          placeholder="CVV"
          selectionColor={Colors.primary}
          maxLength={3}
          value={cvvNumber}
          onChangeText={(value) => setCVVNumber(value)}
        />
      </View> */}

      <RoundedButton
        text="Update Card"
        textStyle={styles.roundedTextButton}
        style={styles.roundedButton}
        handlePress={() => submit()}
      />
    </SafeAreaView>
  );
}
