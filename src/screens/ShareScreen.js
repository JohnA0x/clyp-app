import React from 'react';
import { Share, View, Button } from 'react-native';

const ShareScreen = ({navigation, route}) => {
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
    <View onLayout={onShare}>
    
    </View>
  );
};

export default ShareScreen;
