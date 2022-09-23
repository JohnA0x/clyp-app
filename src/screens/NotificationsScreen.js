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

import { useSelector, useDispatch } from "react-redux";


export default function NotificationScreen({navigation}){
  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const notificationList = ({ item }) => (
    <TouchableOpacity style={styles.rowContainer}>
      <VectorButton
        name='notifications-outline'
        size={24}
        color={theme.primary}
        style={styles.notificationimage}
      />
      <Text style={[styles.notificationtext, {color: theme.text}]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style = {[styles.container, { backgroundColor: theme.background }]}>
       <View style={styles.notificationHeader}>
        <VectorButton
        name='chevron-back'
        size={24}
        color={theme.primary}
        style={styles.backButton}
        handlePress={() => navigation.navigate(Strings.home)}/>
        <Text style={[styles.notificationHeaderText, {color: theme.text}]}>{Strings.notifications}</Text>
      </View>
      <Text style ={styles.clerAll}>Clear All</Text>
      <FlatList
        //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
        data={notificationArrayList}
        renderItem={notificationList}
        ItemSeparatorComponent={listSeparator}
      />
    </SafeAreaView>
  )
}