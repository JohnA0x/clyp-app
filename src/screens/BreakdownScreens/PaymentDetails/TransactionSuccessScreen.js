import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { VectorButton, RoundedButton } from "../../../components/button";
import * as Colors from "../../../constants/colors";
import * as Strings from "../../../strings/strings";
import SUCCESSSVG from "../../../drawables/vector/breakdown/transactionsuccess.svg";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

export default function TransactionSuccessScreen({amount, usdAmount, source, destination, date, txid, status, fee }) {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.goBack()}
        />

        <Text style={styles.headerText}>{Strings.paymentDetails}</Text>
      </View>

      <ScrollView>
        <SUCCESSSVG width={200} height={200} style={styles.svg} />

        <Text style={styles.successText}>Transaction Successful</Text>
        <Text style={styles.valueText}>
          N {Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
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
  );
}
