import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/home";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import {
  ImageButton,
  RoundedButton,
  VectorButton,
  FlatListButton,
} from "../components/button";
import Swiper from "react-native-swiper";
import ProfileScreen from "../screens/ProfileScreen";
import SignupScreen from "../screens/SignupScreen";
import favouriteListArray from "../strings/favouritelist";

//import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* export default function Home(){

    return(
        HomeScreen()
        
      )
} */

export default function HomeScreen({ navigation }) {
  const favouriteList = ({ item }) => (
    <View style={styles.favouriteContainer}>
      <TouchableOpacity
        style={styles.favouriteButton}
        onPress={() => navigation.push(item.name)}
      >
        <ImageButton image={item.icon} style={styles.cryptoimage} 
        imageStyle={styles.cryptoimage}/>
        <Text style={styles.textButton}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <ImageButton
          style={styles.profileImage}
          imageStyle={styles.profileImage}
          image="https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg"
          handlePress={() => {
            navigation.push("Profile");
            navigation.setOptions({ tabBarVisible: false });
          }}
        />
        <Text style={styles.nameText}>Welcome Ben</Text>
        <VectorButton
          style={styles.notificationButton}
          name="notifications-outline"
          size={24}
          color={Colors.primary}
          handlePress={() => navigation.push(Strings.notifications)}
        />
        <VectorButton
          style={styles.scanButton}
          name="scan"
          size={24}
          color={Colors.primary}
          handlePress={() => navigation.push(Strings.qrcode)}
        />
      </View>

      <Swiper activeDotColor={Colors.primary}>
        <View style={styles.cryptoContainer}>
          <Text style={styles.balanceText}>{Strings.cryptoBalance}</Text>
          <Text style={styles.cryptoBalanceText}>0.0001 BTC</Text>

          <View style={styles.transactionOptions}>
            <VectorButton
              name="arrow-up"
              size={20}
              color={Colors.white}
              style={styles.sendbutton}
              handlePress={() => navigation.push(Strings.sendCrypto)}
            />
            <VectorButton
              name="arrow-down"
              size={20}
              color={Colors.white}
              style={styles.receivebutton}
              handlePress={() => navigation.push(Strings.receiveCrypto)}
            />
            <VectorButton
              name="swap-horizontal"
              size={20}
              color={Colors.white}
              style={styles.swapbutton}
            />
          </View>
        </View>

        <View style={styles.fiatContainer}>
          <Text style={styles.balanceText}>{Strings.fiatBalance}</Text>
          <Text style={styles.cryptoBalanceText}>N 35,000</Text>

          <View style={styles.transactionOptions}>
            <VectorButton
              name="arrow-up"
              size={20}
              color={Colors.white}
              style={styles.sendbutton}
            />
            <VectorButton
              name="arrow-down"
              size={20}
              color={Colors.white}
              style={styles.receivebutton}
            />
          </View>
        </View>
      </Swiper>

      <View style={styles.coinContainer}>
        <Text style={styles.coinText}>{Strings.favourite}</Text>
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={favouriteListArray}
          renderItem={favouriteList}
          //numColumns={2}
          horizontal={true}
          keyExtractor={(item, id) => id}
        />
      </View>

      <View style={styles.coinContainer}>
        <Text style={styles.coinText}>{Strings.holdings}</Text>
        <FlatList
          data={favouriteListArray}
          renderItem={favouriteList}
          //numColumns={2}
          keyExtractor={(item, id) => id}
        />
      </View>
    </SafeAreaView>
  );
}

//export default HomeScreen
