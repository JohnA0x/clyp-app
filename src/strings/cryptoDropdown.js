import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
  } from "react-native";

export const cryptoDropDownArray = [
    {
        label: "BTC",
        value: 0,
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
        label: "ETH",
        value: 1,
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
        label: "ETH",
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
]

export default cryptoDropDownArray


const styles = StyleSheet.create({
    iconStyle:{
        width: 20,
        height:20,
      },
})