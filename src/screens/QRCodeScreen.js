import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import { styles } from "../styles/qrcode";
import * as Colors from "../constants/colors";
import * as Values from "../constants/values";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FileImageButton,
  ImageButton,
  RoundedButton,
  VectorButton,
} from "../components/button";
import * as Strings from "../strings/strings";

const QRCodeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.qrcodeHeader}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={Colors.textColor}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.home)}
        />
        <Text style={styles.qrcodeHeaderText}>{Strings.scanqrcode}</Text>
      </View>

      <View style={styles.qrcode}>
        <QRCode
          value="ClypPay"
          color={Colors.qrcode}
          backgroundColor={Colors.backgroundColor}
          size={Dimensions.get("window").width / 2.5}
          //logo={require('../../../embed_logo_file_path')} // or logo={{uri: base64logo}}
          // logoMargin={2}
          // logoSize={20}
          //logoBorderRadius={10}
          //logoBackgroundColor={'transparent'}
        />
      </View>

      {/* <TouchableOpacity style = {styles.options}>
        <VectorButton name={'scan-circle'} size={40} 
        color = {Colors.primary}/>
        <Text style = {styles.scantext}>Scan</Text>
      </TouchableOpacity> */}

      <RoundedButton style={styles.button} text = 'Scan'
      textStyle={styles.scantext}/>
    </SafeAreaView>
  );
};

export default QRCodeScreen;
