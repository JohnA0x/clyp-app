import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../styles/logout';
import * as Colors from '../constants/colors'
import * as Strings from '../strings/strings'
import { RoundedButton } from '../components/button';
import AsyncStorage from "@react-native-async-storage/async-storage";


const LogOutScreen = ({navigation, route}) => {
  // ref
  const bottomSheetRef = useRef()

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

   // renders
   return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text style = {styles.logOutText}>Are you sure you want to logout?</Text>

          <View style={styles.rowContainer}>
          <RoundedButton text={'Yes'} textStyle={styles.yesText}
            handlePress={() => {
              AsyncStorage.clear()
              navigation.replace("Login")
            }} 
          />
          <RoundedButton text={'No'} textStyle={styles.noText}
          handlePress={() => navigation.navigate(Strings.Profile, {
            id: route.params.id, 
            firstName: route.params.firstName, 
            lastName: route.params.lastName, 
            preferences: route.params.preferences,
            user: route.params.user
          })}/>
          </View>
      
        </View>
      </BottomSheet>
    </View>
  );
};




export default LogOutScreen;
