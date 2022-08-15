import {React, useRef, useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import ReactNativeModal from "react-native-modal";
import { Button } from "react-native";
import * as Colors from '../constants/colors'
import LottieView from 'lottie-react-native';

export const ProcessingModal = ({
  isVisible,
  handlePress,
  style,
  textStyle,
}) => {

  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);


  return (
    <ReactNativeModal isVisible={isVisible}>
      <View style={styles.view}>
      <LottieView
        autoPlay loop
        ref={animation}
        style={{
          width: 80,
          height: 150,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../lottie/kite.json')}
      />
        <Text style={styles.title}>Processing</Text>
        <Text style={styles.subtitle}>Please hold on a moment...</Text>
      </View>
    </ReactNativeModal>
  );
};

export const styles = StyleSheet.create({
  view: {
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor,
    borderRadius: 20,
    padding: 20,
  },

  title:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 20,
    color: Colors.primary,
  },

  subtitle:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: Colors.textColor,
  }
});
