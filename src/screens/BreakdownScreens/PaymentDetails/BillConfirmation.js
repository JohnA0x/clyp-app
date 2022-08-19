import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { VectorButton, RoundedButton } from "../../../components/button";
import * as Colors from "../../../constants/colors";
import * as Strings from "../../../strings/strings";
import CONSVG from "../../../drawables/vector/breakdown/confirmationicon.svg";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

export const RechargeConfirmation = ({
  amount,
  source,
  payee,
  reference,
  description,
  handlePress,
}) => {
  const navigation = useNavigation();
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

        <Text style={styles.headerText}>{Strings.confirmation}</Text>
      </View>
      <Text style={styles.valueBillText}>100</Text>
      <View style={styles.breakDownView}>
        <View style={styles.topBreakDownSubview}>
          <Text style={styles.breakdownTitle}>Source</Text>
          <Text style={styles.breakdownDescription} numberOfLines={1}>
            {source}
          </Text>
        </View>

        <View style={styles.breakDownSubview}>
          <Text style={styles.breakdownTitle}>Payee</Text>
          <Text style={styles.breakdownDescription} numberOfLines={1}>
            {payee}
          </Text>
        </View>

        <View style={styles.breakDownSubview}>
          <Text style={styles.breakdownTitle}>Amount</Text>
          <Text style={styles.breakdownDescription} numberOfLines={1}>
            {amount}
          </Text>
        </View>

        <View style={styles.breakDownSubview}>
          <Text style={styles.breakdownTitle}>Reference</Text>
          <Text style={styles.breakdownDescription} numberOfLines={1}>
            {reference}
          </Text>
        </View>

        <View style={styles.breakDownSubview}>
          <Text style={styles.breakdownTitle}>Description</Text>
          <Text style={styles.breakdownDescription} numberOfLines={1}>
            {description}
          </Text>
        </View>
      </View>
      <RoundedButton
        text="Continue"
        textStyle={styles.roundedTextButton}
        style={styles.roundedConfirmButton}
        handlePress={handlePress}
      />
    </SafeAreaView>
  );
};

export const InternetConfirmation = ({
  amount,
  source,
  payee,
  mobileNumber,
  description,
  handlePress,
}) => {
  const navigation = useNavigation();
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

        <Text style={styles.headerText}>{Strings.confirmation}</Text>
      </View>
      <Text style={styles.valueBillText}>100</Text>
      <View style={styles.breakDownView}>
        <View style={styles.topBreakDownSubview}>
          <Text style={styles.breakdownTitle}>Source</Text>
          <Text style={styles.breakdownDescription} numberOfLines={1}>
            {source}
          </Text>
        </View>

        <View style={styles.breakDownSubview}>
          <Text style={styles.breakdownTitle}>Payee</Text>
          <Text style={styles.breakdownDescription} numberOfLines={1}>
            {payee}
          </Text>
        </View>

        <View style={styles.breakDownSubview}>
          <Text style={styles.breakdownTitle}>Amount</Text>
          <Text style={styles.breakdownDescription} numberOfLines={1}>
            {amount}
          </Text>
        </View>

        <View style={styles.breakDownSubview}>
          <Text style={styles.breakdownTitle}>Mobile Number</Text>
          <Text style={styles.breakdownDescription} numberOfLines={1}>
            {mobileNumber}
          </Text>
        </View>

        <View style={styles.breakDownSubview}>
          <Text style={styles.breakdownTitle}>Description</Text>
          <Text style={styles.breakdownDescription} numberOfLines={1}>
            {description}
          </Text>
        </View>
      </View>
      <RoundedButton
        text="Continue"
        textStyle={styles.roundedTextButton}
        style={styles.roundedConfirmButton}
        handlePress={handlePress}
      />
    </SafeAreaView>
  );
};
