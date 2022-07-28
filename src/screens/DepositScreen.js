import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/deposit";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import * as Values from "../constants/values";
import {
  FileImageButton,
  ImageButton,
  VectorButton,
} from "../components/button";
import { listSeparator } from "../components/listseparator";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useState } from "react";
import depositListArray from "../strings/depositlist";

export default function DepositScreen({ navigation }) {
  const preferencesList = ({ item }) => (
    <View style={styles.rowContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.push(item.name)}
      >
        <VectorButton
          name={item.icon}
          size={24}
          color={Colors.primary}
          style={styles.headerImage}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.home)}
        />
        <Text style={styles.headerText}>{Strings.fund}</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.flatlist}
        //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
        data={depositListArray}
        renderItem={preferencesList}
      />
    </SafeAreaView>
  );
}
