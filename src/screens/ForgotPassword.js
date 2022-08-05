import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import * as Strings from "../strings/strings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { styles } from "../styles/forgotpassword";
import * as Colors from "../constants/colors";
import { RoundedButton } from "../components/button";
import { KeycodeInput } from "react-native-keycode";
import { CustomAlert } from "../components/alert";
import axios from "../components/axios";
import { RotateInUpLeft } from "react-native-reanimated";

const Stack = createNativeStackNavigator();

export default function ForgotPassword() {
  return (
    <PaperProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
        <Stack.Screen name="NewPassword" component={CreateNewPassword} />
      </Stack.Navigator>
    </PaperProvider>
  );
}

const Forgot = ({ navigation }) => {
  const [text, setText] = React.useState("");

  const alertOTPSent = () =>{
    axios.post('/user-gateway/retrive-password-email', { email: text })
    .then(data => {
      data.data.message === "success" ? (Alert.alert(
        "OTP Sent",
        "Check your email for OTP",
        [
          { text: "OK", onPress: () => navigation.navigate('VerifyOTP', {email: text})}
        ]
      )) : (Alert.alert(
        "Failed to send OTP",
        data.data.details
      ))
    })
    .catch(err => {
      Alert.alert(
        "Error",
        err
      );
    })
    
   /*  <CustomAlert title='Success' subtitle='Password Changed Successfully'
    handlePress={() => navigation.replace('Login')}/> */
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.forgotPasswordText}>{Strings.forgotPassword}</Text>
      <TextInput
        value={text.toLowerCase()}
        onChangeText={(text) => setText(text)}
        placeholder="Input email linked to account"
        placeholderTextColor={Colors.textColorGrey}
        style={styles.emailinput}
        label={<Text style={{ color: Colors.inputLabel }}>Email</Text>}
        selectionColor={Colors.primary}
        left={<TextInput.Icon name="email-outline" />}
        activeUnderlineColor={Colors.backgroundColor}
        underlineColor={Colors.backgroundColor}
      />

      <RoundedButton
        style={styles.button}
        textStyle={styles.textButton}
        text={Strings.reset}
        handlePress={alertOTPSent}
      />
    </SafeAreaView>
  );
};

const VerifyOTP = ({ navigation, route }) => {
  const [code, setCode] = React.useState("")

  const verifyCode = () => {

    axios.post('/user-gateway/confirm-pin', { pin: code, email: route.params.email })
    .then(data => {
      data.data.message === "success" ? (Alert.alert(
        "Code Confirmed",
        data.data.details,
        [
          { text: "Proceed", onPress: () => navigation.replace("NewPassword", {email: route.params.email})}
        ]
      )) : (Alert.alert(
        "Confirmation failed",
        data.data.details
      ))
    })
    .catch(err => {
      Alert.alert(
        "Error",
        err
      )
    })

  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textotp}>Code has been sent to your email!</Text>
      <KeycodeInput
        tintColor={Colors.primary}
        textColor={Colors.textColor}
        style={styles.otp}
        onComplete={(value) => {
          setCode(value);
        }}
      />
      <Text style={styles.resendotp} onPress={() => alert("OTP sent")}>
        {Strings.resend}
      </Text>
      <RoundedButton
        style={styles.button}
        textStyle={styles.textButton}
        text={Strings.verify}
        handlePress={() => verifyCode()}
      />
    </SafeAreaView>
  );
};

const CreateNewPassword = ({navigation, route}) => {

  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const changePassword = () => {

    if (newPassword.length < 8) {
      CustomAlert({
        title: "Sign up error",
        subtitle: "Password is too short (Minmum of 8 characters)",
        handlePress: () => { },
      });
      return false;
    }

    if (newPassword !== confirmPassword) {
      CustomAlert({
        title: "Sign up error",
        subtitle: "Passwords does not match",
        handlePress: () => { },
      });
      return false;
    }

    axios.post('/user-gateway/reset-password', {email: route.params.email, password: newPassword})
    .then(data => {

      const store = async () => {
        await AsyncStorage.setItem("email", route.params.email, (err) => {
          navigation.replace('Login')
        })
      }

      data.data.message === "success" ? (Alert.alert(
        "Success",
        "Password Changed Sucessfully",
        [
          { text: "OK", onPress: () => store()}
        ]
      )) : (Alert.alert(
        "Failed",
        "Please re-submit passwords"
      ))
    })
    .catch(err => {
      Alert.alert(
        "Error",
        err
      );
    })
    
   /*  <CustomAlert title='Success' subtitle='Password Changed Successfully'
    handlePress={() => navigation.replace('Login')}/> */
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.forgotPasswordText}>{Strings.createPassword}</Text>
      <TextInput
        value={newPassword.toLowerCase()}
        onChangeText={(text) => setNewPassword(text)}
        style={styles.passwordinput}
        label={<Text style={{ color: Colors.inputLabel }}>New Password</Text>}
        selectionColor={Colors.primary}
        left={<TextInput.Icon name="lock-outline" />}
        activeUnderlineColor={Colors.backgroundColor}
        underlineColor={Colors.backgroundColor}
      />
      <TextInput
        value={confirmPassword.toLowerCase()}
        onChangeText={(text) => setConfirmPassword(text)}
        style={styles.confirmpasswordinput}
        label={
          <Text style={{ color: Colors.inputLabel }}>Confirm Password</Text>
        }
        selectionColor={Colors.primary}
        left={<TextInput.Icon name="lock-outline" />}
        activeUnderlineColor={Colors.backgroundColor}
        underlineColor={Colors.backgroundColor}
      />

      <RoundedButton
        style={styles.button}
        textStyle={styles.textButton}
        text={Strings.confirmPassword}
        handlePress={() => changePassword()}
      />
    </SafeAreaView>
  );
};


