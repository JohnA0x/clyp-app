import { View, Text, TextInput, ScrollView } from "react-native";
import { React, useState, useEffect } from "react";
import { styles } from "../styles/clyphub";
import { SafeAreaView } from "react-native-safe-area-context";
import { VectorButton, RoundedButton } from "../components/button";
import * as Colors from "../constants/colors";
import * as DropDownList from "../strings/hublist";
import * as Strings from "../strings/strings";
import Swiper from "react-native-swiper";

import DropDownPicker from "react-native-dropdown-picker";

export default function RechargeScreen({ navigation }) {
  const [networkValue, setNetworkValue] = useState(false);
  const [open, setOpen] = useState(null);
  const [networkList, setNetworkList] = useState(
    DropDownList.rechargeDropDownArray
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.clyphub)}
        />
        <Text style={styles.headerText}>{Strings.recharge}</Text>
      </View>

      <View style={styles.fiatBalanceContainer}>
        <Text style={styles.fiatBalanceText}>Fiat Balance</Text>
        <Text style={styles.fiatBalanceValueText}>N35,000</Text>
      </View>

      <ScrollView>
        <View>
          <DropDownPicker
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownContainerPicker}
            zIndex={600}
            dropDownDirection="AUTO"
            stickyHeader={true}
            open={open}
            value={networkValue}
            items={networkList}
            setOpen={setOpen}
            setValue={setNetworkValue}
            setItems={setNetworkList}
            placeholder="Network"
          />

          <TextInput
            style={styles.addressInput}
            placeholder="Enter Mobile Number"
            selectionColor={Colors.primary}
          />
          <TextInput
            style={styles.otherTextInputs}
            placeholder="Amount"
            selectionColor={Colors.primary}
          />
          <TextInput
            style={styles.otherTextInputs}
            placeholder="Pin"
            secureTextEntry={true}
            selectionColor={Colors.primary}
          />

          <RoundedButton
            text={Strings.confirm}
            textStyle={styles.roundedTextButton}
            style={styles.roundedButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
