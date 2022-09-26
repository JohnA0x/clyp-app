import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
  } from "react-native";

  import * as Strings from "../strings/strings";

export const cryptoDropDownArray = [
    {
        label: Strings.ngnt,
        value: 0,
        icon: () => (
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/5922/5922004.png",
            }}
            style={styles.iconStyle}
          />
        ),
      },
      {
        label: Strings.btc,
        value: 1,
        icon: () => (
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/5968/5968260.png",
            }}
            style={styles.iconStyle}
          />
        ),
      },
      {
        label: Strings.eth,
        value: 2,
        icon: () => (
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/4125/4125334.png",
            }}
            style={styles.iconStyle}
          />
        ),
      },
      {
        label: Strings.bnb,
        value: 3,
        icon: () => (
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/6675/6675721.png",
            }}
            style={styles.iconStyle}
          />
        ),
      },
      {
        label: Strings.ltc,
        value: 4,
        icon: () => (
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/825/825463.png",
            }}
            style={styles.iconStyle}
          />
        ),
      },
      {
        label: Strings.usdt,
        value: 5,
        icon: () => (
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/825/825508.png",
            }}
            style={styles.iconStyle}
          />
        ),
      },
]

export default cryptoDropDownArray


const styles = StyleSheet.create({
    iconStyle:{
        width: 20,
        height:20,
      },
})