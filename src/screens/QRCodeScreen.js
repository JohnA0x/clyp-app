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
import axios from "../components/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cryptoListArray from "../strings/cryptolist";

import { ProcessingModal } from "../components/modal";
import { Snackbar } from "react-native-paper";

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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.qrcodeHeader}>
        <VectorButton
          name="chevron-back"
          size={24}
          color={theme.primary}
          style={styles.backButton}
          handlePress={() => navigation.navigate(Strings.home)}
        />
        <Text style={[styles.qrcodeHeaderText, { color: theme.text }]}>{Strings.scanqrcode}</Text>
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
        handlePress={() => navigation.navigate('Scan')}
      />
    </SafeAreaView>
  );
};

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [snackVisibility, setSnackVisibility] = React.useState(false);

  const [isVisible, setIsVisible] = React.useState(false);
  const [error, setError] = React.useState("");

  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setIsVisible(true);
    axios.post('/user-gateway/scan', { scan_data: data })
      .then(async (scan_result) => {
        setIsVisible(false);
        if (scan_result.data.message === "success") {

          if (scan_result.data.type === "user") {

            await AsyncStorage.setItem("token", data, async (err) => {
              console.log({ err });
              if (err) {
                console.log(err);
                return;
              }
              await AsyncStorage.setItem(
                "user_id",
                scan_result.data.user.id,
                async (err) => {
                  await AsyncStorage.setItem(
                    "email",
                    scan_result.data.user.email,
                    (err) => {
                      navigation.navigate(Strings.home);
                    }
                  );
                }
              );
            });

          }
          if(scan_result.data.type === "address") {
            navigation.navigate(Strings.dedicatedSend, {
              crypto_name: scan_result.data.coin,
              address: scan_result.data.address,
              crypto_icon: cryptoListArray.find(cr => cr.abb === scan_result.data.coin).icon
            })
          }

        } else {
          setSnackVisibility(true)
          setError(scan_result.data.details)
        }
      })
      .catch(err => {
        setIsVisible(false);
        console.log(err)
      })

    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    // navigation.goBack()
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

      <Snackbar
        visible={snackVisibility}
        duration={5000}
        onDismiss={() => setSnackVisibility(false)}
        action={{
          label: "OK",
          onPress: () => {
            // Do something
          },
          color: theme.primary,
        }}
        style={{ backgroundColor: Colors.failedColor }}
      >
        <View>
          <Text style={{ color: Colors.white }}>{error}</Text>
        </View>
      </Snackbar>

      <ProcessingModal isVisible={isVisible} />

    </SafeAreaView>
  );
};
