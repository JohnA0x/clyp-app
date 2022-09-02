import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";

export const rechargeDropDownArray = [
  {
    value: 0,
    label: "MTN",
  },
  {
    value: 1,
    label: "Airtel",
  },
  {
    value: 2,
    label: "Glo",
  },
  {
    value: 3,
    label: "9Mobile",
  },
];

export const internetServicesDropDownArray = [
  {
    value: 0,
    label: "Paystack",
  },
  {
    value: 1,
    label: "Flutterwave",
  },
];

const styles = StyleSheet.create({
  iconStyle: {
    width: 20,
    height: 20,
  },
});
