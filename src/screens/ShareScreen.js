import React from 'react';
import { Share, View, Button } from 'react-native';

const ShareScreen = ({navigation}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          navigation.push('Profile')
        } else {
          // shared
          navigation.push('Profile')
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        navigation.push('Profile')
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
