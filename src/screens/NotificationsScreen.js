import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { notificationArrayList } from "../strings/notificationlist";
import * as Strings from "../strings/strings";
import { styles } from "../styles/notifications";
import * as Colors from "../constants/colors";
import * as Values from "../constants/values";
import {
  FileImageButton,
  ImageButton,
  VectorButton,
} from "../components/button";
import { listSeparator } from "../components/listseparator";


const notificationList = ({ item }) => (
  <TouchableOpacity style={styles.rowContainer}>
    <VectorButton
      name='notifications-outline'
      size={24}
      color={Colors.primary}
      style={styles.notificationimage}
    />
    <Text style={styles.notificationtext}>{item.name}</Text>
  </TouchableOpacity>
);

export default function NotificationScreen({navigation}){
  return (
    <SafeAreaView style = {styles.container}>
       <View style={styles.notificationHeader}>
        <VectorButton
        name='chevron-back'
        size={24}
        color={Colors.textColor}
        style={styles.backButton}
        handlePress={() => navigation.navigate(Strings.home)}/>
        <Text style={styles.notificationHeaderText}>{Strings.notifications}</Text>
      </View>
      <FlatList
        //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
        data={notificationArrayList}
        renderItem={notificationList}
        ItemSeparatorComponent={listSeparator}
      />
    </SafeAreaView>
  )
}