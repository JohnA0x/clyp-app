import { View, Text, Image } from "react-native";
import React, { useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { styles } from "../styles/nft";
import LottieView from "lottie-react-native";
import * as Strings from "../strings/strings";

import {
    FileImageButton,
    ImageButton,
    VectorButton,
  } from "../components/button";

export default function NFTScreen({ navigation}) {
  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const animation = useRef(null);

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
          handlePress={() => navigation.navigate(Strings.clyphub)}
        />
        <Text style={[styles.headerText, { color: theme.text }]}>
          {Strings.nft}
        </Text>
      </View>

      <LottieView
        autoPlay
        loop
        ref={animation}
        style={styles.comingSoonImage}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../lottie/launch.json")}
      />

      <Text style={[styles.comingSoonText, { color: theme.text }]}>
        {Strings.comingSoon}
      </Text>
      <Text style={[styles.comingSoonSubtitle, { color: theme.text }]}>
        This feature will be released soon
      </Text>
    </SafeAreaView>
  );
}
