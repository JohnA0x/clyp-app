import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { VectorButton, RoundedButton } from "../../../components/button";
import * as Colors from "../../../constants/colors";
import * as Strings from "../../../strings/strings";
import CONSVG from '../../../drawables/vector/breakdown/confirmationicon.svg'
import {Ionicons} from '@expo/vector-icons'
import { NavigationContainer, useNavigation } from "@react-navigation/native";

export default function PaymentConfirmation ({amount, usdAmount, screenName, source, destination, date, txid, status, fee, swapCoin1, swapCoin2 }) {
  const navigation = useNavigation()
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

        <Text style={styles.headerText}>{Strings.swapDetails}</Text>
      </View>

      <ScrollView>
        <CONSVG width={90} height={90} style={styles.consvg} />

        <Text style={styles.confirmText}>Confirm {screenName} Details</Text>
        <Image style={styles.swapImage} source={{uri: swapCoin1}}/>
        <Text style={styles.valueText}>
          {amount}
        </Text>
        <Text style={styles.dollarText}>{usdAmount}</Text>

        <View style={styles.breakDownView}>
          <View style={styles.topBreakDownSubview}>
            <Text style={styles.breakdownTitle}>Source</Text>
            <Text style={styles.breakdownDescription} numberOfLines={1}>
            {source}
            </Text>
          </View>

          <View style={styles.breakDownSubview}>
            <Text style={styles.breakdownTitle}>Destination</Text>
            <Text style={styles.breakdownDescription} numberOfLines={1}>
              {destination}
            </Text>
          </View>

          <View style={styles.breakDownSubview}>
            <Text style={styles.breakdownTitle}>Date</Text>
            <Text style={styles.breakdownDescription} numberOfLines={1}>
            {date}
            </Text>
          </View>

          <View style={styles.breakDownSubview}>
            <Text style={styles.breakdownTitle}>TxId</Text>
            <Text style={styles.breakdownDescription} numberOfLines={1}>
            {txid}
            </Text>
          </View>

          <View style={styles.breakDownSubview}>
            <Text style={styles.breakdownTitle}>Status</Text>
            <Text style={styles.breakdownDescription} numberOfLines={1}>
            {status}
            </Text>
          </View>

          <View style={styles.breakDownSubview}>
            <Text style={styles.breakdownTitle}>Fee</Text>
            <Text style={styles.breakdownDescription} numberOfLines={1}>
            {fee}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}