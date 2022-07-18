import React from "react";
import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from "react-native";
import PropTypes from 'prop-types';
import { styles } from "../styles/signup";
import {Ionicons} from '@expo/vector-icons';

export const RoundedButton = ({text, handlePress, style, textStyle}) => {

  return(
  <TouchableOpacity style = {style} onPress = {handlePress}>
  <Text style = {textStyle}> {text}</Text>
  </TouchableOpacity>
  )
}

export const ImageButton = ({image, handlePress, style, imageStyle}) => {

  return(
  <TouchableOpacity style = {style} onPress = {handlePress}>
  <Image style = {imageStyle} source={{uri: image}}/>
  </TouchableOpacity>
  )
}

export const FileImageButton = ({fileImage, handlePress, style, imageStyle}) => {

  return(
  <TouchableOpacity style = {style} onPress = {handlePress}>
  <Image style = {imageStyle} source={fileImage}/>
  </TouchableOpacity>
  )
}


export const VectorButton = ({name, size, style, handlePress, color}) => {

  return(
  <TouchableOpacity style = {style} onPress = {handlePress}>
  <Ionicons name={name} size={size} color={color} />
  </TouchableOpacity>
  )
}

export const FileVectorButton = ({name, size, style, handlePress, color}) => {

  return(
  <TouchableOpacity style = {style} onPress = {handlePress}>
  
  </TouchableOpacity>
  )
}


export const FlatListButton = ({image, size, style, handlePress, imagestyle, 
  cryptonameStyle, fiatAmountStyle, cryptoAmountStyle,
  cryptoName, fiatAmount, cryptoAmount}) => {

  return(
  <TouchableOpacity style = {style} onPress = {handlePress}>
  <Image source={{image}} />
  <Text style = {cryptonameStyle}>{cryptoName}</Text>
  <Text style = {fiatAmountStyle}>{fiatAmount}</Text>
  <Text style = {cryptoAmountStyle}>{cryptoAmount}</Text>
  </TouchableOpacity>
  )
}