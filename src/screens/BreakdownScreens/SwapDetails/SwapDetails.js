import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { VectorButton, RoundedButton } from "../../../components/button";
import * as Colors from "../../../constants/colors";
import * as Strings from "../../../strings/strings";
import SUCCESSSVG from "../../../drawables/vector/breakdown/transactionsuccess.svg";
import {Ionicons} from '@expo/vector-icons'

export default function SwapDetails({navigation, source, destination, txid, fee, swapCoin1, swapCoin2, handlePress }) {
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
        <SUCCESSSVG width={200} height={200} style={styles.svg} />

        <Text style={styles.successText}>Transaction Successful</Text>
       <View style={styles.rowContainer}>
        <Image style={styles.swapImageContainer} source={{swapCoin1}}/>
        <Ionicons name='swap-horizontal' size={30} style={styles.swapIcon}/>
        <Image style={styles.swapImageContainer2} source={{swapCoin2}}/> 
       </View>

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
            <Text style={styles.breakdownTitle}>TxId</Text>
            <Text style={styles.breakdownDescription} numberOfLines={1}>
            {txid}
            </Text>
          </View>

          <View style={styles.breakDownSubview}>
            <Text style={styles.breakdownTitle}>Fee</Text>
            <Text style={styles.breakdownDescription} numberOfLines={1}>
            {fee}
            </Text>
          </View>

        <RoundedButton
          text="Continue"
          textStyle={styles.roundedTextButton}
          style={styles.roundedButton}
          handlePress={handlePress}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}