import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
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
} from "../components/button";
import { preferencesListArray } from "../strings/preferenceslist";
import { listSeparator } from "../components/listseparator";

const preferencesList = ({ item }) => (
  <TouchableOpacity style={styles.rowContainer}>
    <VectorButton
      name={item.icon}
      size={24}
      color={Colors.primary}
      style={styles.preferencesimage}
    />
    <Text style={styles.preferencestext}>{item.name}</Text>
  </TouchableOpacity>
);

export default function PreferencesScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.preferencesHeader}>
        <VectorButton
        name='chevron-back'
        size={24}
        color={Colors.textColor}
        style={styles.backButton}
        handlePress={() => navigation.navigate(Strings.Profile)}/>
        <Text style={styles.preferencesHeaderText}>{Strings.preferences}</Text>
      </View>

      <FlatList
        //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
        data={preferencesListArray}
        renderItem={preferencesList}
        ItemSeparatorComponent={listSeparator}
      />
    </SafeAreaView>
  );
}
