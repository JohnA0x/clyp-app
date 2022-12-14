import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Switch,
  TextInput,
} from "react-native";
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

import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import securityListArray from "../strings/securitylist";
import { set } from "lodash";
import { ProcessingModal } from "../components/modal";
import {
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync,
} from "expo-local-authentication";

import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

export default function SecurityScreen({ navigation, route }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isBiometricsEnabled, setBiometricsEnabled] = useState(false);

  const [mode, setMode] = useState();

  const [isBiometrics, setBiometrics] = useState(false);

  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const toggleBiometricsSwitch = () =>
    setIsEnabled((previousState) => !previousState);

  const toggleSwitch = () => {
    let data = {
      //user_id: route.params.params.id,
      mode: isEnabled ? "Dark" : "Light",
    };
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("biometrics", value);
    } catch (e) {
      // saving error
    }
  };

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
      <Stack.Screen name={Strings.forgotPin} component={ForgotPin} />
      <Stack.Screen name={Strings.resetPassword} component={ResetPassword} />
      <Stack.Screen name="inputotp" component={InputOTP} />
    </Stack.Navigator>
  );

  function SecurityList() {
    const securityList = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.flatlist }]}
          onPress={() => navigation.navigate(item.name)}
        >
          <VectorButton
            name={item.icon}
            size={24}
            color={Colors.primary}
            style={styles.flatlistImage}
          />
          <Text style={[styles.flatlistText, { color: theme.text }]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() =>
              navigation.navigate(Strings.Profile, {
                id: route.params.id,
                preferences: route.params.preferences,
                firstName: route.params.firstName,
                lastName: route.params.lastName,
                user: route.params.user,
              })
            }
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.security}
          </Text>
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
    function biometrics() {
      toggleBiometricsSwitch;
      storeData(isBiometrics);
      alert(isBiometrics);
    }

    const [isSMSEnabled, setIsSMSEnabled] = useState(
      route.params.user.extra_authorization.filter(
        (ex) => ex.permission_name === "can_authenticate_sms"
      )[0]
        ? route.params.user.extra_authorization.filter(
            (ex) => ex.permission_name === "can_authenticate_sms"
          )[0].status === "active"
          ? true
          : false
        : false
    );

    const [isMailEnabled, setIsMailEnabled] = useState(
      route.params.user.extra_authorization.filter(
        (ex) => ex.permission_name === "can_authenticate_mail"
      )[0]
        ? route.params.user.extra_authorization.filter(
            (ex) => ex.permission_name === "can_authenticate_mail"
          )[0].status === "active"
          ? true
          : false
        : false
    );

    const toggleSMSSwitch = () => {
      if (
        route.params.user.extra_authorization.filter(
          (ex) => ex.permission_name === "can_authenticate_sms"
        )[0]
      ) {
        axios
          .post("/user-gateway/update-extra-permission", {
            user_id: route.params.user.id,
            id: route.params.user.extra_authorization.filter(
              (ex) => ex.permission_name === "can_authenticate_sms"
            )[0].id,
            status: isSMSEnabled ? "inactive" : "active",
          })
          .then((data) => {
            if (data.data.message === "success") {
              route.params.user.extra_authorization.filter(
                (ex) => ex.permission_name === "can_authenticate_sms"
              )[0].status = isSMSEnabled ? "inactive" : "active";

              setIsSMSEnabled((previousState) => !previousState);
            } else {
              CustomAlert({
                title: "Failed",
                subtitle: "Failed to enable SMS authentication",
              });
            }
          })
          .catch((error) => {
            CustomAlert({ title: "Error", subtitle: error });
          });
      } else {
        axios
          .post("/user-gateway/add-extra-permission", {
            user_id: route.params.id,
            permission_name: "can_authenticate_sms",
            permission_type: "public",
            status: "active",
          })
          .then((data) => {
            if (data.data.message === "success") {
              route.params.user.extra_authorization.filter(
                (ex) => ex.permission_name === "can_authenticate_sms"
              )[0].status = "active";

              setIsSMSEnabled((previousState) => !previousState);
            } else {
              CustomAlert({
                title: "Failed",
                subtitle: "Failed to enable SMS authentication",
              });
            }
          })
          .catch((error) => {
            CustomAlert({ title: "Error", subtitle: error });
          });
      }
    };

    const toggleMailSwitch = () => {
      if (
        route.params.user.extra_authorization.filter(
          (ex) => ex.permission_name === "can_authenticate_mail"
        )[0]
      ) {
        axios
          .post("/user-gateway/update-extra-permission", {
            user_id: route.params.user.id,
            id: route.params.user.extra_authorization.filter(
              (ex) => ex.permission_name === "can_authenticate_mail"
            )[0].id,
            status: isMailEnabled ? "inactive" : "active",
          })
          .then((data) => {
            if (data.data.message === "success") {
              route.params.user.extra_authorization.filter(
                (ex) => ex.permission_name === "can_authenticate_mail"
              )[0].status = isMailEnabled ? "inactive" : "active";

              setIsMailEnabled((previousState) => !previousState);
            } else {
              CustomAlert({
                title: "Failed",
                subtitle: "Failed to enable SMS authentication",
              });
            }
          })
          .catch((error) => {
            CustomAlert({ title: "Error", subtitle: error });
          });
      } else {
        axios
          .post("/user-gateway/add-extra-permission", {
            user_id: route.params.id,
            permission_name: "can_authenticate_mail",
            permission_type: "public",
            status: "active",
          })
          .then((data) => {
            if (data.data.message === "success") {
              route.params.user.extra_authorization.filter(
                (ex) => ex.permission_name === "can_authenticate_mail"
              )[0].status = "active";

              setIsMailEnabled((previousState) => !previousState);
            } else {
              CustomAlert({
                title: "Failed",
                subtitle: "Failed to enable SMS authentication",
              });
            }
          })
          .catch((error) => {
            CustomAlert({ title: "Error", subtitle: error });
          });
      }
    };

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("securitylist")}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.authentication}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.optionsContainer, { backgroundColor: theme.flatlist }]}
        >
          <VectorButton
            name="chatbox-ellipses"
            size={24}
            color={Colors.primary}
            style={styles.flatlistImage}
          />
          <Text style={[styles.flatlistText, { color: theme.text }]}>
            {Strings.smsAuthentication}
          </Text>

          <Switch
            style={styles.switch}
            trackColor={{ false: Colors.black, true: Colors.primary }}
            thumbColor={isSMSEnabled ? Colors.secondary : Colors.grey}
            ios_backgroundColor={Colors.black}
            onValueChange={toggleSMSSwitch}
            size={100}
            value={isSMSEnabled}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionsContainer, { backgroundColor: theme.flatlist }]}
        >
          <VectorButton
            name="mail"
            size={24}
            color={Colors.primary}
            style={styles.flatlistImage}
          />
          <Text style={[styles.flatlistText, { color: theme.text }]}>
            {Strings.emailAuthentication}
          </Text>

          <Switch
            style={styles.switch}
            trackColor={{ false: Colors.black, true: Colors.primary }}
            thumbColor={isMailEnabled ? Colors.secondary : Colors.grey}
            ios_backgroundColor={Colors.black}
            onValueChange={toggleMailSwitch}
            size={100}
            value={isMailEnabled}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionsContainer, { backgroundColor: theme.flatlist }]}
        >
          <VectorButton
            name="finger-print"
            size={24}
            color={Colors.primary}
            style={styles.flatlistImage}
          />
          <Text style={[styles.flatlistText, { color: theme.text }]}>
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
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("securitylist")}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.transactionPin}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.optionsContainer, { backgroundColor: theme.flatlist }]}
          onPress={() => navigation.navigate(Strings.changePin)}
        >
          <VectorButton
            name="key"
            size={24}
            color={Colors.primary}
            style={styles.flatlistImage}
          />
          <Text style={[styles.flatlistText, { color: theme.text }]}>
            {Strings.changePin}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionsContainer, { backgroundColor: theme.flatlist }]}
          onPress={() => navigation.navigate(Strings.forgotPin)}
        >
          <VectorButton
            name="shield"
            size={24}
            color={Colors.primary}
            style={styles.flatlistImage}
          />
          <Text style={[styles.flatlistText, { color: theme.text }]}>
            {Strings.forgotPin}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  function ChangePin() {
    const [formerPin, setFormerPin] = useState("");
    const [newPin, setNewPin] = useState("");
    const [reenterPin, setReenterPin] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const submitPin = () => {
      setIsVisible(true);
      if (newPin !== reenterPin) {
        setIsVisible(false);
        CustomAlert({
          title: "Invalid Pin",
          subtitle: "Please make sure your pin input matches.",
        });
        return false;
      } else if (formerPin !== route.params.user.prefrence[0].pin) {
        setIsVisible(false);
        CustomAlert({
          title: "Invalid Pin",
          subtitle: "Please make sure your former pin is correct.",
        });
        return false;
      } else {
        axios
          .post("/user-gateway/update-prefrences", {
            pin: newPin,
            user_id: route.params.user.id,
          })
          .then((data) => {
            setIsVisible(false);
            if (data.data.message === "success") {
              route.params.user.prefrence[0].pin = newPin;
              navigation.navigate("securitylist");
            } else {
              CustomAlert({
                title: "Failed",
                subtitle:
                  "Failed to change your transaction pin, please try again",
              });
            }
          })
          .catch((error) => {
            setIsVisible(false);
            CustomAlert({ title: "Error", subtitle: error });
          });
      }
    };

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("securitylist")}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>{Strings.changePin}</Text>
        </View>

        <TextInput
            style={[
              styles.addressInput,
              { backgroundColor: theme.textinput, color: theme.text },
            ]}
          placeholder={Strings.enterFormerPin}
          placeholderTextColor={theme.text}
          secureTextEntry={true}
          value={formerPin}
          maxLength={4}
          onChangeText={(text) => setFormerPin(text)}
          selectionColor={Colors.primary}
        />

        <TextInput
           style={[
            styles.otherTextInputs,
            { backgroundColor: theme.textinput, color: theme.text },
          ]}
          secureTextEntry={true}
          onChangeText={(text) => setNewPin(text)}
          value={newPin}
          maxLength={4}
          placeholder={Strings.enterNewPin}
          placeholderTextColor={theme.text}
          selectionColor={Colors.primary}
        />

        <TextInput
           style={[
            styles.otherTextInputs,
            { backgroundColor: theme.textinput, color: theme.text },
          ]}
          value={reenterPin}
          maxLength={4}
          onChangeText={(text) => setReenterPin(text)}
          placeholder={Strings.reenterNewPin}
          placeholderTextColor={theme.text}
          secureTextEntry={true}
          selectionColor={Colors.primary}
        />
        {/* <Ionicons />
        </TextInput> */}

        <RoundedButton
          text={Strings.confirm}
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          handlePress={() => submitPin()}
        />

        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  // Forget Pin
  function ForgotPin() {
    const [formerPin, setFormerPin] = useState("");
    const [newPin, setNewPin] = useState("");
    const [reenterPin, setReenterPin] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const submitPin = () => {
      setIsVisible(true);
      if (newPin !== reenterPin) {
        setIsVisible(false);
        CustomAlert({
          title: "Invalid Pin",
          subtitle: "Please make sure your pin input matches.",
        });
        return false;
      } else if (formerPin !== route.params.user.prefrence[0].pin) {
        setIsVisible(false);
        CustomAlert({
          title: "Invalid Pin",
          subtitle: "Please make sure your former pin is correct.",
        });
        return false;
      } else {
        axios
          .post("/user-gateway/update-prefrences", {
            pin: newPin,
            user_id: route.params.user.id,
          })
          .then((data) => {
            setIsVisible(false);
            if (data.data.message === "success") {
              route.params.user.prefrence[0].pin = newPin;
              navigation.navigate("securitylist");
            } else {
              CustomAlert({
                title: "Failed",
                subtitle:
                  "Failed to change your transaction pin, please try again",
              });
            }
          })
          .catch((error) => {
            setIsVisible(false);
            CustomAlert({ title: "Error", subtitle: error });
          });
      }
    };

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("securitylist")}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.forgotPin}
          </Text>
        </View>

        <TextInput
          style={[
            styles.addressInput,
            { backgroundColor: theme.textinput, color: theme.text },
          ]}
          placeholder={Strings.enterFormerPin}
          placeholderTextColor={theme.text}
          secureTextEntry={true}
          value={formerPin}
          maxLength={4}
          onChangeText={(text) => setFormerPin(text)}
          selectionColor={Colors.primary}
        />

        <TextInput
          style={[
            styles.otherTextInputs,
            { backgroundColor: theme.textinput, color: theme.text },
          ]}
          secureTextEntry={true}
          onChangeText={(text) => setNewPin(text)}
          value={newPin}
          maxLength={4}
          placeholder={Strings.enterNewPin}
          placeholderTextColor={theme.text}
          selectionColor={Colors.primary}
        />

        <TextInput
          style={[
            styles.otherTextInputs,
            { backgroundColor: theme.textinput, color: theme.text },
          ]}
          value={reenterPin}
          maxLength={4}
          onChangeText={(text) => setReenterPin(text)}
          placeholder={Strings.reenterNewPin}
          placeholderTextColor={theme.text}
          secureTextEntry={true}
          selectionColor={Colors.primary}
        />
        {/* <Ionicons />
        </TextInput> */}

        <RoundedButton
          text={Strings.confirm}
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          handlePress={() => navigation.navigate("inputotp")}
        />

        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function InputOTP() {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("buyoptions")}
          />
          <Text style={styles.headerText}>Input OTP</Text>
        </View>

        <Text style={styles.enterPinText}>
          An OTP has been sent to {otpPhonenumber}
        </Text>
        <KeycodeInput
          tintColor={Colors.primary}
          textColor={Colors.textColor}
          style={styles.pin}
          numeric={true}
          alphaNumeric={false}
          onComplete={(value) => {
            setCode(value);
          }}
        />

        <RoundedButton
          style={styles.nextButton}
          text={Strings.next}
          textStyle={styles.depositText}
          handlePress={() => {
            setSuccess(true);
          }}
        />

        <SuccessModal isVisible={success} />
      </SafeAreaView>
    );
  }

  function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("securitylist")}
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.resetPassword}
          </Text>
        </View>

        <TextInput
          style={[
            styles.addressInput,
            { backgroundColor: theme.textinput, color: theme.text },
          ]}
          secureTextEntry={true}
          onChangeText={(text) => setNewPassword(text)}
          value={newPassword}
          maxLength={4}
          placeholder={Strings.enterNewPassword}
          placeholderTextColor={theme.text}
          selectionColor={Colors.primary}
        />

        <TextInput
          style={[
            styles.otherTextInputs,
            { backgroundColor: theme.textinput, color: theme.text },
          ]}
          value={confirmPassword}
          maxLength={4}
          onChangeText={(text) => setConfirmPassword(text)}
          placeholder={Strings.confirmPassword}
          placeholderTextColor={theme.text}
          secureTextEntry={true}
          selectionColor={Colors.primary}
        />
        {/* <Ionicons />
        </TextInput> */}

        <RoundedButton
          text={Strings.confirm}
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          handlePress={() => navigation.navigate("inputotp")}
        />

        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }
}
