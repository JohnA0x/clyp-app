import * as Strings from "../strings/strings";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const activityListArray = [
  {
    country: "Country Name", // Which will display on bottom
    artists: [
      { artist_name: "artistOne_name" },
      { artist_name: "artistTwo_name" },
      { artist_name: "artistThree_name" },
      { artist_name: "artistFour_name" },
    ],
  },
];

export default activityListArray;
