import { View, Text, TouchableOpacity } from "react-native";
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

const Forgot = ({navigation}) => {
  const [text, setText] = React.useState("");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.forgotPasswordText}>{Strings.forgotPassword}</Text>
      <TextInput
        value={text.toLowerCase()}
        onChangeText={(text) => setText(text)}
        placeholder = 'Input email linked to account'
        placeholderTextColor={Colors.textColorGrey}
        style={styles.emailinput}
        label={<Text style={{ color: Colors.inputLabel }}>Email</Text>}
        selectionColor={Colors.primary}
        left={<TextInput.Icon name="email-outline" />}
        activeUnderlineColor={Colors.backgroundColor}
        underlineColor={Colors.backgroundColor}
      />

      <RoundedButton style={styles.button} 
      textStyle = {styles.textButton}
      text ={Strings.reset}
      handlePress = {() => navigation.replace('VerifyOTP')}/>
    </SafeAreaView>
  );
};

const VerifyOTP = ({navigation}) => {
  return(
    <SafeAreaView>
      <Text style = {styles.textotp}>
        Code has been sent to your email!
      </Text>
      <KeycodeInput
      tintColor={Colors.primary}
      textColor={Colors.textColor}
      style={styles.otp}
      onComplete={(value) => {
        alert(value)
      }}/>
      <Text
      onPress={() => alert('Success')}>
        {Strings.resend}
      </Text>
      <RoundedButton style={styles.button} 
      textStyle = {styles.textButton}
      text ={Strings.verify}
      handlePress = {() => navigation.replace('NewPassword')}/>
    </SafeAreaView>
  )
};

const CreateNewPassword = () => {
  <SafeAreaView>
    <Text>
      hhh
    </Text>
  </SafeAreaView>
};
