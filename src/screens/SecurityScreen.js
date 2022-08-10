import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import { styles } from "../styles/profile";

export default function SecurityScreen() {
  return (
    <SafeAreaView>
      <Text>SecurityScreen</Text>
    </SafeAreaView>
  );

  function SecurityList() {
    const securityList = () => {
      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.button}>
          <VectorButton
            name={item.icon}
            size={24}
            color={Colors.primary}
            style={styles.preferencesimage}
          />
          <Text style={styles.preferencestext}>{item.name}</Text>
        </TouchableOpacity>
      </View>;
    };

    return (
      <SafeAreaView>
        <Switch
          style={styles.merchantSwitch}
          trackColor={{ false: Colors.black, true: Colors.primary }}
          thumbColor={isEnabled ? Colors.secondary : Colors.grey}
          ios_backgroundColor={Colors.black}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={profileListArray}
          renderItem={profileList}
        />
      </SafeAreaView>
    );
  }
}
