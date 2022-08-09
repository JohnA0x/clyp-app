import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/news";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
//import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import newsArrayList from "../strings/newslist";
import { listSeparator } from "../components/listseparator";
import {
  FileImageButton,
  ImageButton,
  VectorButton,
} from "../components/button";

const Stack = createNativeStackNavigator();

export default function NewsScreen({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='news' component={NewsList} />
      <Stack.Screen name='newscontainer' component={NewsContainer} />
    </Stack.Navigator>
  );

  function NewsList() {
    const newsList = ({ item }) => (
      <TouchableOpacity style={styles.rowContainer}
      onPress = {() => navigation.navigate('newscontainer')}>
        <Image style={styles.newsImage} source={{ uri: item.image }} />
        <Text style={styles.newsText} numberOfLines={1}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );

    return (
      <SafeAreaView style = {styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.clyphub)}
          />
          <Text style={styles.headerText}>{Strings.News}</Text>
        </View>

        <View style={styles.flatlist}>
          <FlatList
            //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
            data={newsArrayList}
            renderItem={newsList}
            ItemSeparatorComponent={listSeparator}
          />
        </View>
      </SafeAreaView>
    );
  }

  function NewsContainer() {
    return (
      <SafeAreaView style = {styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate('news')}
          />
          <Text style={styles.headerText}>{Strings.News}</Text>

          <Image/>
          <Text></Text>
        </View>
      </SafeAreaView>
    );
  }
}
