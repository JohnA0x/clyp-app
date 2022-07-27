import { View, Text } from "react-native";
import React from "react";
import * as Strings from "../strings/strings";
import { SafeAreaView } from "react-native-safe-area-context";
import ClypPayLogo from "../drawables/vector/clyppay_logo.svg";
import { styles } from "../styles/about";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  FileImageButton,
  ImageButton,
  VectorButton,
} from "../components/button";
import * as Colors from "../constants/colors";

const AboutUs = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.Profile)}
        />
        <Text style={styles.headerText}>{Strings.about}</Text>
      </View>

      <ClypPayLogo width={200} height={200} style={styles.svgLogo} />

      <Text style={styles.versionText}>{Strings.versionNumber}</Text>

      <View style = {styles.aboutContainer}>
        <Text style = {styles.aboutText}>{Strings.aboutContent}</Text>
      </View>

      <Text style={styles.privacyText}>{Strings.showPrivacyPolicy}</Text>

    </SafeAreaView>
  );
};

export default AboutUs;
