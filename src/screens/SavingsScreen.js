import { View, Text, Dimensions } from "react-native";
import React from "react";
import Savings from "../drawables/vector/savings/Savings.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Strings from "../strings/strings";
import { styles } from "../styles/clyphub";
import * as Colors from "../constants/colors";
import * as Values from "../constants/values";
import { VectorButton, RoundedButton } from "../components/button";

export default function SavingsScreen() {
  return (
    <SafeAreaView style = {styles.container}>
      <View style={styles.header}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.home)}
        />
        <Text style={styles.headerText}>{Strings.savings}</Text>
      </View>

      <View style={styles.savingsImage}>
        <Savings
          width={Dimensions.get("screen").width / 1.8}
          height={Dimensions.get("screen").height / 2}
        />
      </View>

      <View style={styles.continueView}>
        <Text style={styles.continueTitle}>Create a goal</Text>
        <Text style={styles.continueDescription}>
          Put some cash away for your desired goals. You can save in fiat and
          cryptocurrency.
        </Text>
        <RoundedButton
          style={styles.roundedContinueButton}
          text='Continue'
          textStyle={styles.roundedTextButton}
        />
      </View>
    </SafeAreaView>
  );
}
