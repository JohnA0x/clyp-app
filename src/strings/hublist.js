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
    label: "MTN",
    value: 0,
  },
  {
    label: "Airtel",
    value: 1,
  },
  {
    label: "Glo",
    value: 1,
  },
  {
    label: "9Mobile",
    value: 1,
  },
];

export const internetServicesDropDownArray = [
  {
    label: "Paystack",
    value: 0,
  },
  {
    label: "Flutterwave",
    value: 1,
  },
];

const styles = StyleSheet.create({
  iconStyle: {
    width: 20,
    height: 20,
  },
});
