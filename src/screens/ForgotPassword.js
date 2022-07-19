import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

export default function ForgotPassword(){
  return (
    <Stack.Navigator>
        <Stack.Screen name='Forgot' component={Forgot}/>
        <Stack.Screen name='VerifyOTP' component={VerifyOTP}/>
        <Stack.Screen name='NewPassword' component={CreateNewPassword}/>
    </Stack.Navigator>
  )
}

const Forgot = () =>{
    
}

const VerifyOTP = () =>{

}

const CreateNewPassword = () =>{

}