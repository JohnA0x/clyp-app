import { View, Text, Dimensions } from "react-native";
import React from "react";
import Savings from "../drawables/vector/savings/Savings.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Strings from "../strings/strings";
import { styles } from "../styles/clyphub";
import * as Colors from "../constants/colors";
import * as Values from "../constants/values";
import { VectorButton, RoundedButton } from "../components/button";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function SavingsScreen({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="continue" component={Continue} />
      <Stack.Screen name="savings" component={Saving} />
    </Stack.Navigator>
  );

  function Continue() {
    return (
      <SafeAreaView style={styles.container}>
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
            text="Continue"
            textStyle={styles.roundedTextButton}
            handlePress={() => navigation.navigate("savings")}
          />
        </View>
      </SafeAreaView>
    );
  }

  function Saving() {
    return (
      <SafeAreaView style={styles.container}>
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

        <Swiper
          style={styles.swiperContainer}
          activeDotColor={Colors.fadedButton}
        >
          <View style={styles.walletBalanceContainer}>
            <Text style={styles.walletBalanceText}>Crypto Savings</Text>
            <Text style={styles.walletBalanceValueText}>N35,000</Text>
            <View style={styles.rowSavingsContainer}>
              <RoundedButton
                text={Strings.deposit}
                style={styles.depositButton}
                textStyle={styles.depositButtonText}
              />
              <RoundedButton
                text={Strings.withdraw}
                style={styles.withdrawButton}
                textStyle={styles.withdrawButtonText}
              />
            </View>
          </View>

          <View style={styles.walletBalanceContainer}>
            <Text style={styles.walletBalanceText}>Fiat Savings</Text>
            <Text style={styles.walletBalanceValueText}>N35,000</Text>
            <View style={styles.rowSavingsContainer}>
              <RoundedButton
                text={Strings.deposit}
                style={styles.depositButton}
                textStyle={styles.depositButtonText}
              />
              <RoundedButton
                text={Strings.withdraw}
                style={styles.withdrawButton}
                textStyle={styles.withdrawButtonText}
              />
            </View>
          </View>
        </Swiper>

        <View style={styles.newGoalView}>
          <Text style={styles.yourGoalText}>Your goals</Text>

          <Ionicons
            name={"add-circle"}
            color={Colors.addGoal}
            style={styles.addGoal}
            size={28}
          />

          <Text style={styles.newGoalText}>New Goal</Text>
        </View>
      </SafeAreaView>
    );
  }
}
