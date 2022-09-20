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
import { RoundedButton } from "./button";
import { useSelector, useDispatch } from "react-redux";

export const ProcessingModal = ({
  isVisible,
  handlePress,
  style,
  textStyle,
}) => {

  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);


  return (
    <ReactNativeModal isVisible={isVisible}>
      <View style={[styles.view, {backgroundColor: theme.background}]}>
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
        <Text style={[styles.subtitle, {color: theme.text}]}>Please hold on a moment...</Text>
      </View>
    </ReactNativeModal>
  );
};

export const SuccessModal = ({
  isVisible,
  handlePress,
  style,
  textStyle,
}) => {
  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const animation = useRef(null);
  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);


  return (
    <ReactNativeModal isVisible={isVisible}>
      <View style={[styles.view, {backgroundColor: theme.background}]}>
      <LottieView
        autoPlay loop
        ref={animation}
        style={{
          width: 80,
          height: 200,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../lottie/check.json')}
      />
        <Text style={styles.successTitle}>Success!</Text>
        <Text style={[styles.subtitle, {color: theme.text}]}>Successfully done</Text>
        <RoundedButton
          style={styles.okButton}
          text='Done'
          textStyle={styles.okText}
          handlePress={() => {
           handlePress
          }}
        />
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

  successTitle:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 20,
    color: Colors.addGoal,
    marginTop: -20,
  },

  subtitle:{
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: Colors.textColor,
  },

  okButton:{
    width: "90%",
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.addGoal,
    borderRadius: 50,
    marginTop: 10,
  },

  okText: {
    fontFamily: "Poppins_600SemiBold",
    color: Colors.white,
  },
});
