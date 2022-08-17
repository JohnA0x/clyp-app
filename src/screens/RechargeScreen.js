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
import { ProcessingModal } from "../components/modal";
import { CustomAlert } from "../components/alert";

export default function RechargeScreen({ navigation, route }) {
  const [networkValue, setNetworkValue] = useState(false);
  const [open, setOpen] = useState(null);
  const [networkList, setNetworkList] = useState(
    DropDownList.rechargeDropDownArray
  );
  const [mobile, setMobile] = useState()
  const [amount, setAmount] = useState()
  const [pin, setPin] = useState()
  const [isVisible, setIsVisible] = useState(false)

  const recharge = () => {
    setIsVisible(true)
    if (pin !== route.params.user.prefrence[0].pin){
      setIsVisible(false)
      CustomAlert({title: "Invalid Pin", subtitle: "Please enter your correct transaction pin"})
    }
    let data = {
      phone: mobile,
      network: networkValue,
      amount,
      pin,
      user_id: route.params.user.id
    }
  }

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
            onChangeText={(text) => setMobile(text)}
          />
          <TextInput
            style={styles.otherTextInputs}
            placeholder="Amount"
            selectionColor={Colors.primary}
            onChangeText={(text) => setAmount(text)}
          />
          <TextInput
            style={styles.otherTextInputs}
            placeholder="Pin"
            secureTextEntry={true}
            selectionColor={Colors.primary}
            onChangeText={(text) => setPin(text)}
          />

          <RoundedButton
            text={Strings.confirm}
            textStyle={styles.roundedTextButton}
            style={styles.roundedButton}
          />
        </View>
        <ProcessingModal isVisible={isVisible} />
      </ScrollView>
    </SafeAreaView>
  );
}
