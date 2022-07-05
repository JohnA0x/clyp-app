import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import { styles } from "../styles/signup";

export const RoundedButton = ({text, handlePress, style, textStyle}) => {

  return(
  <TouchableOpacity style = {style} onPress = {handlePress}>
  <Text style = {textStyle}> {text}</Text>
  </TouchableOpacity>
  )
  
}