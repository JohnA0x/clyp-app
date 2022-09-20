import { View, Text, Dimensions, TouchableOpacity, StyleSheet, Button } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";
import { useState, useEffect } from "react";
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

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BarCodeScanner } from "expo-barcode-scanner";

import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

export default function QRCodeScreen({ route }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Code" initialParams={route.params} component={Code} />
      <Stack.Screen name="Scan" component={Scan} />
    </Stack.Navigator>
  );
}

const Code = ({ navigation, route }) => {
  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();
  // React.useEffect(()=> {
  //   console.log(route)
  // },[])
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.qrcodeHeader}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={theme.primary}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.home)}
        />
        <Text style={[styles.qrcodeHeaderText, {color: theme.text}]}>{Strings.scanqrcode}</Text>
      </View>

      <View style={styles.qrcode}>
        <QRCode
          value={route.params.token}
          color={theme.qrcode}
          backgroundColor={theme.background}
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

      <RoundedButton
        style={styles.button}
        text="Scan"
        textStyle={styles.scantext}
        handlePress ={() => navigation.navigate('Scan')}
      />
    </SafeAreaView>
  );
};

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    navigation.goBack()
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </SafeAreaView>
  );
};
