import React from 'react';
import { Text } from 'react-native';
import { Button, TextInput } from "react-native-paper";

import * as Strings from '../strings/strings'
import {styles} from '../styles/signup'

export default function Input(){
    const [text, setText] = React.useState("");
    return(
        <TextInput
            value={text}
            onChangeText={text => setText(text)}
             style ={styles.emailinput} 
             label = {<Text style = {{color: Colors.inputLabel}}>Email</Text>} 
             selectionColor = {Colors.primaryLight} left ={<TextInput.Icon name="email-outline"/>} 
             activeUnderlineColor = {Colors.backgroundColor}
             underlineColor = {Colors.backgroundColor}/>
    );
   
}

