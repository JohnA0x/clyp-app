import { View, Text, ScrollView } from "react-native";
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

import { useSelector, useDispatch } from "react-redux";

function AboutUs({ navigation, route }) {
  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() =>
              navigation.navigate(Strings.Profile, {
                id: route.params.id,
                firstName: route.params.firstName,
                lastName: route.params.lastName,
                preferences: route.params.preferences,
                user: route.params.user,
              })
            }
          />
          <Text style={[styles.headerText, { color: theme.text }]}>
            {Strings.about}
          </Text>
        </View>

        <ClypPayLogo width={200} height={200} style={styles.svgLogo} />

        <Text style={[styles.versionText, {color: theme.text}]}>{Strings.versionNumber}</Text>

        <View style={styles.aboutContainer}>
          <Text style={styles.aboutText}>{Strings.aboutContent}</Text>
        </View>

        <Text style={styles.readMoreText}>Read More</Text>

        <Text style={[styles.privacyText, { color: theme.text }]}>
          {Strings.showPrivacyPolicy}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AboutUs;
