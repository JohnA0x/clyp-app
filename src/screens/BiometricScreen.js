import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { VectorButton } from "../components/button";
import { styles } from "../styles/biometric";
import * as Colors from "../constants/colors";
import { 
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync 
} from 'expo-local-authentication';

export default function BiometricScreen({navigation}) {
  const biometricsAuth = async (message) => {
    const compatible = await hasHardwareAsync()
    if (!compatible) alert("This device is not compatible for biometric authentication") 
    message = 'This device is not compatible for biometric authentication' 

    const enrolled = await isEnrolledAsync()
    if (!enrolled) alert("This device doesn't have biometric authentication enabled")
    message = "This device doesn't have biometric authentication enabled"
    
    const result = await authenticateAsync()
    if(result.success) navigation.navigate("MenuNavigation")
    if (!result.success) throw `${result.error} - Authentication unsuccessful`
    return
}

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.authenticateText}>
        {"Authenticate your \n Biometrics"}
      </Text>
      <VectorButton
        name={"finger-print"}
        size={64}
        color={Colors.primary}
        style={styles.fingerprint}
        handlePress={biometricsAuth}
      />

      <VectorButton
        name={"close-sharp"}
        size={28}
        color={Colors.listHolder}
        style={styles.close}
        handlePress={() => navigation.navigate("MenuNavigation")}
      />
    </SafeAreaView>
  );
}
