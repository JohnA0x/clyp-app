import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import filter from "lodash.filter";
import { ImageButton, RoundedButton, VectorButton } from "../components/button";
import { styles } from "../styles/buycrypto";
import * as Colors from "../constants/colors";
import * as Strings from "../strings/strings";
import { cryptoListArray } from "../strings/cryptolist";
import { buyOptionsListArray } from "../strings/buyoptionslist";
import { debitCardListArray } from "../strings/debitcardslist";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import axiosFiat from "../components/axios-fait";
import { Ionicons } from "@expo/vector-icons";
import { ProcessingModal } from "../components/modal";


const Stack = createNativeStackNavigator();

export default function BuyCryptoScreen({ navigation, route }) {
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoIcon, setCryptoIcon] = useState("");
  const [walletOptions, setWalletOptions] = useState([
    { address: "hh", abb: "hh" },
  ]);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="buylist" component={BuyCryptoList} />
      <Stack.Screen name="buyoptions" component={BuyOptions} />
      <Stack.Screen
        name={Strings.buywithwalletTitle}
        component={BuyWithWallet}
      />
      <Stack.Screen
        name={Strings.buywithdebitcardTitle}
        component={BuyWithCard}
      />
    </Stack.Navigator>
  );

  function BuyCryptoList() {
    const navigation = useNavigation();

    const buyCryptoList = ({ item }) => (
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.list}
          onPress={() => {
            navigation.navigate("buyoptions");
            setCryptoName(item.name);
            setCryptoIcon(item.icon);
            setWalletOptions({ abb: item.abb });
          }}
        >
          <Image source={{ uri: item.icon }} style={styles.image} />
          <Text style={styles.valueText}>{item.value}</Text>
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );

    // This renders some components and the flatlist together
    return (
      <SafeAreaView>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate(Strings.home)}
          />
          <Text style={styles.headerText}>{Strings.buy}</Text>
        </View>

        <View style={styles.flatlist}>
          <FlatList
            data={cryptoListArray}
            //ListHeaderComponent={renderHeader}
            renderItem={buyCryptoList}
          />
        </View>
      </SafeAreaView>
    );
  }

  function BuyOptions() {
    const buyOptionsList = ({ item }) => {
      return (
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(item.title)}
          >
            <VectorButton
              name={item.icon}
              size={24}
              color={Colors.primary}
              style={styles.preferencesimage}
            />
            <Text style={styles.preferencestext}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("buylist")}
          />
          <Text style={styles.headerText}>{Strings.buy}</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.buyOptionsFlatlist}
          //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
          data={buyOptionsListArray}
          renderItem={buyOptionsList}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }

  function BuyWithWallet() {

    const [amount, setAmount] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    const buy = () => {
      setIsVisible(true)

      let data = {
        amount,
        user_id: route.params.user.id
      }
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("buyoptions")}
          />
          <Text style={styles.headerText}>{Strings.buy}</Text>
        </View>

        <View style={styles.walletBalanceContainer}>
          <Text style={styles.walletBalanceText}>Wallet Balance</Text>
          <Text style={styles.walletBalanceValueText}>N {route.params.wallet.available_balance.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
        </View>

        <View style={styles.transactionCryptoContainer}>
          <Image style={styles.cryptoImage} source={{ uri: cryptoIcon }} />
          <Text style={styles.cryptoText}>{cryptoName}</Text>
        </View>

        <View style={styles.transactionAmountContainer}>
          <Text style={styles.amountText}>Amount:</Text>
          <TextInput
            style={styles.amountValueText}
            keyboardType="numeric"
            numberOfLines={1}
            maxLength={12}
            placeholder="Amount"
            selectionColor={Colors.primary}
            onChangeText={(text) => setAmount(text)}
          ></TextInput>
          <Text style={styles.amountMaxValue}>Max</Text>
        </View>

        <View style={styles.lineCrosser} />
        <Text style={styles.receiveAmount}>
          You will receive N20,000 in Naira
        </Text>
        <Text style={styles.conversionAmount}>1 BTC = $23,000</Text>
        <RoundedButton
          style={styles.depositButton}
          text={Strings.deposit}
          textStyle={styles.depositText}
        />
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function BuyWithCard() {

    const [amount, setAmount] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [cards, setCards] = useState([])
    const [checkmarkColor, setCheckmarkColor] = useState();
    const [card, setCard] = useState();
    const [pin, setPin] = useState();
    const [flw, setFLW] = useState();
    const [otp, setOTP] = useState();

    const start_charge = () => {
      setIsVisible(true)

      let card_data = {

        card_number: card.card_number,
        cvv: card.cvv,
        card_expiry: card.card_expiry,
        card_name: card.card_name,
        amount,
        email: route.params.user.email,
        phone: route.params.user.phone,
        user_id: route.params.user.id

      }

      axiosFiat.post('/fiat-gateway/charge-card', card_data)
        .then(resp => {
          setIsVisible(false)
          if (resp.data.auth_mode === 'pin') {

          } else if (resp.data.auth_mode === 'redirect') {

          } else if (resp.data.transaction) {

          }

        })
        .catch(err => {
          setIsVisible(false)
        })
    }

    const charge_pin = () => {
      setIsVisible(true)

      let card_data = {

        card_number: card.card_number,
        cvv: card.cvv,
        card_expiry: card.card_expiry,
        card_name: card.card_name,
        amount,
        email: route.params.user.email,
        phone: route.params.user.phone,
        user_id: route.params.user.id,
        pin: pin
      }

      axiosFiat.post('/fiat-gateway/card-pin', card_data)
        .then(data => {

          setIsVisible(false)
          if (data.data.message === "otp required") {
            setFLW(data.data.flw_ref)
          }

        })
        .catch(err => {
          setIsVisible(false)
        })

    }

    const charge_otp = () => {

      setIsVisible(true)
      let otp_data = {
        otp,
        flw_ref: flw
      }

      axiosFiat.post('/fiat-gateway/card-otp', otp_data)
        .then(fianl => {
          setIsVisible(false)
          if (fianl.data.message === "success") {

          }
        })
        .catch(err => {
          setIsVisible(false)
        })
    }

    useEffect(() => {

      axiosFiat.post('/fiat-gateway/get-cards', { user_id: route.params.user.id })
        .then(data => {
          if (data.data.message === "success") {
            setCards(data.data.cards)
            setCheckmarkColor(data.data.cards[0].id)
            console.log(data.data.cards[0].id)
          }
          else {
            // CustomAlert({ title: "Failed", subtitle: data.data.error, handlePress: () => { } })
          }
        })
        .catch(err => {
          // CustomAlert({ title: "Error", subtitle: err.error, handlePress: () => { } })
        })
    }, [])

    const cardList = ({ item }) => {
      return (
        <View style={styles.cardViewContainer}>
          <TouchableOpacity
            style={[
              styles.cardsContainer,
              { backgroundColor: Colors.black },
            ]}
            onPress={() => {
              setCheckmarkColor(item.id);
              setCard(item)
            }}
          >
            <VectorButton
              name={item.icon}
              size={24}
              color={Colors.primary}
              style={styles.preferencesimage}
            />
            <Text style={styles.cardNameText}>{item.card_name}</Text>
            <Image style={styles.cardIcon} />
            <Text style={styles.cardNumberText}>{item.card_number}</Text>
            <Text style={styles.cardValidThruText}>VALID THRU</Text>
            <Text style={styles.cardValidityText}>{item.card_expiry}</Text>
            <Text style={styles.cardCVVText}>CVV</Text>
            <Text style={styles.cardCVV}>{item.cvv}</Text>
            <Ionicons
              name={"checkmark-circle"}
              size={24}
              style={styles.selectedIcon}
              color={checkmarkColor === item.id ? Colors.addGoal : Colors.grey}
            />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <VectorButton
            name="chevron-back"
            size={24}
            color={Colors.textColor}
            style={styles.backButton}
            handlePress={() => navigation.navigate("buyoptions")}
          />
          <Text style={styles.headerText}>{Strings.buy}</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.cardListContainer}
          //ListEmptyComponent = { <Text>This List is a very Flat list</Text> }
          data={cards}
          renderItem={cardList}
          horizontal={true}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.cardCryptoContainer}>
          <Image style={styles.cryptoImage} source={{ uri: cryptoIcon }} />
          <Text style={styles.cryptoText}>{cryptoName}</Text>
        </View>

        <View style={styles.cardAmountContainer}>
          <Text style={styles.amountText}>Amount:</Text>
          <TextInput
            style={styles.amountValueText}
            keyboardType="numeric"
            numberOfLines={1}
            maxLength={12}
            placeholder="Amount"
            selectionColor={Colors.primary}
            onChangeText={(text) => setAmount(text)}
          ></TextInput>
          <Text style={styles.amountMaxValue}>Max</Text>
        </View>

        <View style={styles.lineCrosser} />
        <Text style={styles.receiveAmount}>
          You will receive N20,000 in Naira
        </Text>
        <Text style={styles.conversionAmount}>1 BTC = $23,000</Text>
        <RoundedButton
          style={styles.cardDepositButton}
          text={Strings.deposit}
          textStyle={styles.depositText}
        />
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }
}
