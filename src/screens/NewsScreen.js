import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { React, useState, useEffect } from "react";
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
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

export default function NewsScreen({ navigation }) {
  const [image, setImage] = useState("");
  const [newsContent, steNewsContent] = useState("");
  const [news, setNews] = useState(null)

  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const fetchNews = async () => {

    const mediaStackNews = await axios.get(`https://newsdata.io/api/1/news?apikey=pub_72923f07282dc8e1ce33feacd6823d57cd8e&category=business,technology&language=en&q=crypto`)
// %20OR%20crypto
    setNews(mediaStackNews.data.results)
    console.log(mediaStackNews.data.results[0])
    

  }

  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="news" component={NewsList} />
      <Stack.Screen name="newscontainer" component={NewsContainer} />
    </Stack.Navigator>
  );

  function NewsList() {
    const newsList = ({ item }) => (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => {
          navigation.navigate("newscontainer");
          setImage(item.image_url ? item.image_url : 'https://cdn-icons-png.flaticon.com/512/2964/2964063.png');
          steNewsContent(item.content)
        }}
      >
        <Image style={styles.newsImage} source={{ uri: item.image_url ? item.image_url : 'https://cdn-icons-png.flaticon.com/512/2964/2964063.png' }} />
        <Text style={[styles.newsText, {color: theme.text}]} numberOfLines={1}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.clyphub)}
          />
          <Text style={[styles.headerText,{color: theme.text}]}>{Strings.News}</Text>
        </View>

        <View style={styles.flatlist}>
          <FlatList
            //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
            data={news}
            renderItem={newsList}
            ItemSeparatorComponent={listSeparator}
          />
        </View>
      </SafeAreaView>
    );
  }

  function NewsContainer() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={theme.primary}
            style={styles.backButton}
            handlePress={() => navigation.navigate("news")}
          />
          <Text style={[styles.headerText,{color: theme.text}]}>{Strings.News}</Text>

          <ScrollView>
            <Image
              style={styles.newsHeaderImage}
              source={{ uri: image }}
              resizeMode="cover"
            />
            <Text style={[styles.newsContent, {color: theme.text}]}>{newsContent}</Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
