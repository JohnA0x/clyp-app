import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/support";
import * as Strings from '../strings/strings'
import * as Colors from '../constants/colors'
import { ImageButton, RoundedButton, VectorButton } from "../components/button";

export default function SupportScreen({navigation, route}) {
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
          <Text style={styles.headerText}>{Strings.help}</Text>
        </View>

    </SafeAreaView>
  );
}
