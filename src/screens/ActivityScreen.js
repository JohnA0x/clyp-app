import {
  React,
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import {
  FileImageButton,
  ImageButton,
  VectorButton,
  RoundedButton,
} from "../components/button";

import * as Strings from "../strings/strings";
import { styles } from "../styles/activity";
import { Ionicons } from "@expo/vector-icons";

import * as Colors from "../constants/colors";

import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import activityListArray from "../strings/activitylist";

import RNDateTimePicker from "@react-native-community/datetimepicker";
import ReactNativeModal from "react-native-modal";
import RNDatePicker from "react-native-date-picker";
import axiosFiat from "../components/axios-fait";
import { CustomAlert } from "../components/alert";

import { useSelector, useDispatch } from "react-redux";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function ActivityScreen({ navigation, route }) {
  const [open, setOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const theme = useSelector((state) => state.persistedReducer.theme);
  const dispatch = useDispatch();

  const [mydate, setDate] = useState(new Date());
  const changeSelectedDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setDate(currentDate);
 };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          backgroundColor: theme.background,
        }}
      >
        <Stack.Screen
          name="Tabs"
          initialParams={route}
          component={TabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

  function TabNavigator({ route }) {
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.primary}
            style={styles.backButton}
            handlePress={() =>
              navigation.navigate(Strings.Profile, {
                id: route.params.params.id,
                firstName: route.params.params.firstName,
                lastName: route.params.params.lastName,
                preferences: route.params.params.preferences,
                user: route.params.params.user,
              })
            }
          />
          <Text style={[styles.headerText, {color: theme.text}]}>{Strings.activity}</Text>
        </View>

        <Tab.Navigator
          tabBarOptions={{
            style: [styles.tabBar, {backgroundColor: theme.background }],
            labelStyle: { fontSize: 12, color: theme.text },
            //   activeTintColor:Colors.primary,
            // tabStyle: {backgroundColor: Colors.backgroundColor },
            indicatorStyle: { backgroundColor: Colors.primary },
          }}
        >
          <Tab.Screen name="History" component={History} />
          <Tab.Screen name="Range" component={Range} />
        </Tab.Navigator>
      </SafeAreaView>
    );

    function History() {
      const [transactions, setTransactions] = useState([]);

      useEffect(() => {
        axiosFiat
          .post("/fiat-gateway/get-wallet-transactions", {
            user_id: route.params.params.user.id,
          })
          .then((data) => {
            if (data.data.message === "success") {
              setTransactions(data.data.transactions.reverse());
            } else {
              CustomAlert({
                title: "failed",
                subtitle: "failed to fetch transactions",
                handlePress: () => {},
              });
            }
          })
          .catch((err) => {
            CustomAlert({
              title: "failed",
              subtitle: "failed to fetch transactions",
              handlePress: () => {},
            });
            console.log(err);
          });
      }, []);
      const historyList = ({ item }) => {
        return (
          <View style={[styles.rowContainer]}>
            <TouchableOpacity style={styles.list}>
              <VectorButton
                name={item.icon}
                size={15}
                style={styles.statusIcon}
                color={Colors.white}
              />
              <Text style={styles.time}>{item.createdAt}</Text>
              <Text style={styles.title}>
                {item.transaction_type.toUpperCase()}
              </Text>
              <Text style={styles.description} numberOfLines={1}>
                {item.transaction_type} {item.amount}
              </Text>
              <Text style={styles.date} numberOfLines={1}>
                {item.createdAt}
              </Text>
              <Text style={styles.status} numberOfLines={1}>
                {item.status}
              </Text>
            </TouchableOpacity>
          </View>
        );
      };

      return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
          <FlatList
            data={transactions}
            //ListHeaderComponent={renderHeader}
            renderItem={historyList}
          />
        </SafeAreaView>
      );
    }

  

    function Range() {
      
      return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme.background}]}>
          <Text style={[styles.fromText, {color: theme.text}]}
          onPress={() => setModalVisible(true)}>FROM:</Text>
          <TextInput
            style={[styles.fromInput, {backgroundColor: theme.textinput, color: theme.text}]}
            placeholder="Select Date"
            placeholderTextColor={theme.text}
            selectionColor={Colors.primary}
            editable={false}
            text={mydate}
            onPressIn={() => setOpen(true)}
          />
          <Text style={[styles.toText, {color: theme.text}]}>TO:</Text>
          <TextInput
            style={[styles.fromInput, {backgroundColor: theme.textinput, color: theme.text}]}
            placeholder="Select Date"
            placeholderTextColor={theme.text}
            selectionColor={Colors.primary}
          />

          <ReactNativeModal isVisible={isModalVisible}>
            <View>
            <RNDateTimePicker display="calendar" value={mydate}
            onChange={(changeSelectedDate)} />
            </View>
       
          </ReactNativeModal>

          

          <RoundedButton
            style={styles.searchButton}
            text="Search"
            textStyle={styles.searchText}
          />
        </SafeAreaView>
      );
    }
  }
}
