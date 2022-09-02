import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
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

import { KeycodeInput } from "react-native-keycode";

import { SuccessModal } from "../components/modal"
import { CustomAlert } from "../components/alert";

const Stack = createNativeStackNavigator();

export default function BuyCryptoScreen({ navigation, route }) {
  const [cryptoName, setCryptoName] = useState("");
  const [cryptoIcon, setCryptoIcon] = useState("");
  const [otpPhonenumber, setOTPPhoneNumber] = useState("");
  
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
      <Stack.Screen name="cardpin" component={CardPin} />
      <Stack.Screen name="inputotp" component={InputOTP} />
      <Stack.Screen name="address" component={Address} />
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
    const [amount, setAmount] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const buy = () => {
      setIsVisible(true);

      let data = {
        amount,
        user_id: route.params.user.id,
      };
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

        <View style={styles.walletBalanceContainer}>
          <Text style={styles.walletBalanceText}>Wallet Balance</Text>
          <Text style={styles.walletBalanceValueText}>
            N{" "}
            {route.params.wallet.available_balance
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </Text>
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
    const [amount, setAmount] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [cards, setCards] = useState([]);
    const [checkmarkColor, setCheckmarkColor] = useState();
    const [card, setCard] = useState();
    const [pin, setPin] = useState();
    const [flw, setFLW] = useState();
    const [otp, setOTP] = useState();

    const start_charge = () => {
      setIsVisible(true);

      let card_data = {
        card_number: card.card_number,
        cvv: card.cvv,
        card_expiry_month: card.card_expiry.slice(0, card.card_expiry.indexOf('/')),
        card_expiry_year: card.card_expiry.slice(card.card_expiry.indexOf('/') + 1),
        card_name: card.card_name,
        amount,
        email: route.params.user.email,
        phone: route.params.user.phone,
        user_id: route.params.user.id,
      };

      axiosFiat
        .post("/fiat-gateway/charge-card", card_data)
        .then((resp) => {
          setIsVisible(false);
          if (resp.data.auth_mode === "pin") {
            navigation.navigate("cardpin", { card: card, amount: amount, user: route.params.user })
          } else if (resp.data.auth_mode === "redirect") {

          } else if (resp.data.auth_mode === "avs_noauth") {
            navigation.navigate("address", { card: card, amount: amount, user: route.params.user })
          } else if (resp.data.transaction) {

          }
        })
        .catch((err) => {
          setIsVisible(false);
        });
    };

    useEffect(() => {
      axiosFiat
        .post("/fiat-gateway/get-cards", { user_id: route.params.user.id })
        .then((data) => {
          if (data.data.message === "success") {
            setCards(data.data.cards);
            setCheckmarkColor(data.data.cards[0].id);
            console.log(data.data.cards[0].id);
          } else {
            // CustomAlert({ title: "Failed", subtitle: data.data.error, handlePress: () => { } })
          }
        })
        .catch((err) => {
          // CustomAlert({ title: "Error", subtitle: err.error, handlePress: () => { } })
        });
    }, []);

    const cardList = ({ item }) => {
      return (
        <View style={styles.cardViewContainer}>
          <TouchableOpacity
            style={[styles.cardsContainer, { backgroundColor: Colors.black }]}
            onPress={() => {
              setCheckmarkColor(item.id);
              setCard(item);
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
          ListEmptyComponent={<Text>No debit cards added yet</Text>}
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
          // value={Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
          ></TextInput>
          <Text style={styles.amountMaxValue}>Max</Text>
        </View>

        <View style={styles.lineCrosser} />
        <Text style={styles.receiveAmount}>
          You will receive N{Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} in Naira
        </Text>
        <Text style={styles.conversionAmount}>1 BTC = $23,000</Text>
        <RoundedButton
          style={styles.cardDepositButton}
          text={Strings.deposit}
          textStyle={styles.depositText}
          handlePress={() => start_charge()}
        />
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function CardPin({ route }) {
    const [pin, setPin] = useState("")
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      console.log({
        route_params: route
      })
    }, [])

    const charge_pin = () => {
      setIsVisible(true);

      let card_data = {
        card_number: route.params.card.card_number,
        cvv: route.params.card.cvv,
        card_expiry_month: route.params.card.card_expiry.slice(0, route.params.card.card_expiry.indexOf('/')),
        card_expiry_year: route.params.card.card_expiry.slice(route.params.card.card_expiry.indexOf('/') + 1),
        card_name: route.params.card.card_name,
        amount: route.params.amount,
        email: route.params.user.email,
        phone: route.params.user.phone,
        user_id: route.params.user.id,
        pin: pin,
      };

      axiosFiat
        .post("/fiat-gateway/card-pin", card_data)
        .then((data) => {
          setIsVisible(false);
          if (data.data.message === "otp required") {
            // setFLW(data.data.flw_ref);
            navigation.navigate("inputotp", { flw: data.data.flw_ref, user: route.params.user })
          }
        })
        .catch((err) => {
          setIsVisible(false);
        });
    };

    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.header}>
            <VectorButton
              name="chevron-back"
              size={24}
              color={Colors.textColor}
              style={styles.backButton}
              handlePress={() => navigation.navigate(Strings.buywithdebitcardTitle)}
            />
            <Text style={styles.headerText}>Card Pin</Text>
          </View>

          <Text style={styles.enterPinText}>Enter Your Card Pin</Text>
          <KeycodeInput
            tintColor={Colors.primary}
            textColor={Colors.textColor}
            style={styles.pin}
            numeric={true}
            alphaNumeric={false}
            onComplete={(value) => {
              setPin(value);
            }}
          />

          <RoundedButton
            style={styles.nextButton}
            text={Strings.next}
            textStyle={styles.depositText}
            handlePress={() => charge_pin()}
          />
        </ScrollView>
        <ProcessingModal isVisible={isVisible} />
      </SafeAreaView>
    );
  }

  function InputOTP({ route }) {
    const [code, setCode] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [success, setSuccess] = useState(false);

    const charge_otp = () => {
      setIsVisible(true);
      let otp_data = {
        otp: code,
        flw_ref: route.params.flw,
        user_id: route.params.user.id,
      };

      axiosFiat
        .post("/fiat-gateway/card-otp", otp_data)
        .then((fianl) => {
          setIsVisible(false);
          if (fianl.data.message === "success") {
            setSuccess(true);
          }
          else {
            CustomAlert({title: "Failed", subtitle: "Failed to charge card, please check details provided", handlePress: () => {}})
          }
        })
        .catch((err) => {
          setIsVisible(false);
        });
    };


    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.header}>
            <VectorButton
              name="chevron-back"
              size={24}
              color={Colors.textColor}
              style={styles.backButton}
              handlePress={() => navigation.navigate("cardpin")}
            />
            <Text style={styles.headerText}>Input OTP</Text>
          </View>

          <Text style={styles.enterPinText}>An OTP has been sent to card phone number and email</Text>

          <TextInput

            style={styles.otherTextInputs}
            numeric={true}
            alphaNumeric={false}
            onChangeText={(value) => {
              setCode(value);
            }}
          />

          <RoundedButton
            style={styles.nextButton}
            text={Strings.next}
            textStyle={styles.depositText}
            handlePress={() => charge_otp()}
          />

          <SuccessModal isVisible={success} />
          <ProcessingModal isVisible={isVisible} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  function Address({ navigation, route }) {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [state, setCardState] = useState("");
    const [zip, setZip] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [success, setSuccess] = useState(false);

    const charge_card = () => {
      setIsVisible(true);

      let card_data = {
        card_number: route.params.card.card_number,
        cvv: route.params.card.cvv,
        card_expiry_month: route.params.card.card_expiry.slice(0, route.params.card.card_expiry.indexOf('/')),
        card_expiry_year: route.params.card.card_expiry.slice(route.params.card.card_expiry.indexOf('/') + 1),
        card_name: route.params.card.card_name,
        amount: route.params.amount,
        email: route.params.user.email,
        phone: route.params.user.phone,
        user_id: route.params.user.id,
        address,
        city,
        country,
        state,
        zipcode: zip
      };

      axiosFiat
        .post("/fiat-gateway/card-no-auth", card_data)
        .then((data) => {
          setIsVisible(false);
          console.log(card_data)
          console.log(data.data)
          if (data.data.message === "otp required") {
            // setFLW(data.data.flw_ref);
            navigation.navigate("inputotp", { flw: data.data.flw_ref, user: route.params.user })
          } else if (data.data.message === "success") {
            setSuccess(true);
          }
        })
        .catch((err) => {
          setIsVisible(false);
        });
    };

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.preferencesHeader}>
            <VectorButton
              name="chevron-back"
              size={24}
              color={Colors.textColor}
              style={styles.backButton}
              handlePress={() => navigation.goBack()}
            />
            <Text style={styles.headerText}>Card Address</Text>
          </View>

          <TextInput
            style={styles.inputText2}
            placeholder="Address"
            selectionColor={Colors.primary}

            onChangeText={(value) => setAddress(value)}
          />

          <TextInput
            style={styles.otherTextInputs2}
            placeholder="City"
            selectionColor={Colors.primary}
            maxLength={16}

            onChangeText={(value) => setCity(value)}
          />

          <TextInput
            style={styles.otherTextInputs2}
            placeholder="Country"
            selectionColor={Colors.primary}
            maxLength={16}

            onChangeText={(value) => setCountry(value)}
          />

          <View style={styles.rowCardContainer}>
            <TextInput
              style={styles.rowTextInputs}
              placeholder="State"
              selectionColor={Colors.primary}
              maxLength={5}

              onChangeText={(value) => setCardState(value)}
            />

            <TextInput
              style={styles.rowTextInputs}
              placeholder="Zip code"
              selectionColor={Colors.primary}


              onChangeText={(value) => setZip(value)}
            />
          </View>



          <RoundedButton
            text="Submit"
            textStyle={styles.roundedTextButton}
            style={styles.roundedButton}
            handlePress={() => charge_card()}
          />

          <ProcessingModal isVisible={isVisible} />
          <SuccessModal isVisible={success} handlePress={() => {
            setSuccess(false)
            navigation.navigate(Strings.home)
          }} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
