import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/support";
import * as Strings from '../strings/strings'
import * as Colors from '../constants/colors'
import { ImageButton, RoundedButton, VectorButton } from "../components/button";
import { useSelector, useDispatch } from "react-redux";

export default function SupportScreen({navigation}) {
  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
       <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.goBack()}
          />
          <Text style={[styles.headerText, {color: theme.text}]}>{Strings.help}</Text>
        </View>

    </SafeAreaView>
  );
}
