import * as Strings from "./strings";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const editprofileListArray = [
    {
      id: 1,
      name: Strings.username,
      icon: "person-circle-outline",
    },
    {
      id: 2,
      name: Strings.useraddress,
      icon: "location-outline",
    },
    {
      id: 3,
      name: Strings.contact,
      icon: "mail-outline",
    },
    {
      id: 4,
      name: Strings.iddocument,
      icon: "documents-outline",
    },
   
  ];
  
  export default editprofileListArray