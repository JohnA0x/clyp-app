import React from 'react';
import { Share, View, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

function ShareScreen ({navigation, route}){

  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          navigation.navigate('Profile', {
            id: route.params.id, 
            firstName: route.params.firstName, 
            lastName: route.params.lastName, 
            preferences: route.params.preferences,
            user: route.params.user
          })
        } else {
          // shared
          navigation.navigate('Profile', {
            id: route.params.id, 
            firstName: route.params.firstName, 
            lastName: route.params.lastName, 
            preferences: route.params.preferences,
            user: route.params.user
          })
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        navigation.navigate('Profile', {
            id: route.params.id, 
            firstName: route.params.firstName, 
            lastName: route.params.lastName, 
            preferences: route.params.preferences,
            user: route.params.user
          })
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style ={{backgroundColor: theme.background}} onLayout={onShare}>
    
    </View>
  );
};

export default ShareScreen;
