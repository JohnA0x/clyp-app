import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import PropTypes from "prop-types";
import { styles } from "../styles/signup";
import { Ionicons } from "@expo/vector-icons";
import ReactNativeModal from "react-native-modal";
import { Button } from "react-native";

export const CustomModal = ({ isVisible, handlePress, style, textStyle }) => {
  return (
    <ReactNativeModal isVisible={isVisible}>
      <View style={style}>
        <Text>I am the modal content!</Text>
        <Button title=""/>
      </View>
    </ReactNativeModal>
  );
};
